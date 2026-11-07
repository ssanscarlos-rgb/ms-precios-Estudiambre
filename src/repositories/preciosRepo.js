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

const ORDEN = [['precio', 1], ['reportes', -1]]; // más barato primero; a igual precio, más reportes
let indexado;
const asegurarIndice = () => (indexado ||= store.ensureIndex({ producto: 1, precio: 1, reportes: -1 }));

// Paginación en la base (skip/limit): solo viaja la página pedida.
async function listarPrecios({ producto, page, size }) {
  await asegurarIndice();
  const filtro = producto ? { producto: normalizar(producto) } : {};
  const { items, total } = await store.page(filtro, { sort: ORDEN, skip: page * size, limit: size });
  return {
    content: items.map((d) => ({
      id: d.id,
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
  await store.set(id, { producto: normalizar(producto), ...data });
}

module.exports = { listarPrecios, guardarPrecio, normalizar };
