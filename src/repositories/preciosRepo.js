const { createStore } = require('./store');

const store = createStore(process.env.COLLECTION_PRECIOS || 'precios');

// Un documento por precio reportado: { _id, producto, tienda, zona, precio, reportes }.
// `producto` se guarda normalizado (minúsculas, sin tildes) para buscar sin distinguir ni una ni otra.
const normalizar = (s) =>
  (s || '')
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

// Por producto (si la búsqueda abarca varios), y dentro de cada uno el más barato primero; a igual precio, más reportes.
const ORDEN = [['producto', 1], ['precio', 1], ['reportes', -1]];
let indexado;
const asegurarIndice = () => (indexado ||= store.ensureIndex({ producto: 1, precio: 1, reportes: -1 }));

// Búsqueda: primero el nombre exacto (lo que llega al elegir una sugerencia). Si no hay, se buscan los
// productos que contengan TODAS las palabras escritas, en cualquier orden ("arroz" o "pelon arroz").
async function buscar(producto, opciones) {
  const normal = normalizar(producto);
  const exacto = await store.page({ producto: normal }, opciones);
  if (exacto.total > 0) return exacto;
  const palabras = normal.split(/\s+/).filter(Boolean);
  return palabras.length ? store.page({ producto: { contiene: palabras } }, opciones) : exacto;
}

// Paginación en la base (skip/limit): solo viaja la página pedida.
async function listarPrecios({ producto, page, size }) {
  await asegurarIndice();
  const opciones = { sort: ORDEN, skip: page * size, limit: size };
  const { items, total } = producto && normalizar(producto) ? await buscar(producto, opciones) : await store.page({}, opciones);
  return {
    content: items.map((d) => ({
      id: d.id,
      producto: d.nombre || d.producto, // nombre para mostrar (los datos viejos solo traen el normalizado)
      tienda: d.tienda,
      zona: d.zona,
      precio: Number(d.precio),
      reportes: Number(d.reportes || 0),
    })),
    page,
    size,
    totalElements: total,
    totalPages: Math.ceil(total / size),
  };
}

async function guardarPrecio(producto, id, data) {
  await store.set(id, { producto: normalizar(producto), nombre: producto, ...data });
}

module.exports = { listarPrecios, guardarPrecio, normalizar };
