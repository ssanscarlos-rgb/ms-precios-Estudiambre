# ms-precios

Microservicio de **Precios** de EstudiAmbre (Fase II). Node 20+ / Express, datos en **MongoDB Atlas** (base `estudiambre_precios`, colección `precios`). Forma parte de la separación de Perfil y Precios pedida por el profe: los dos servicios tienen la misma estructura y comparten el cluster de Atlas, pero cada uno tiene su propia base.

## Endpoints (bajo `/v1`, requieren `Authorization: Bearer <Google JWT>`)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/v1/precios?producto=&page=&size=` | Tiendas ordenadas por precio. `{content, page, size, totalElements, totalPages}` (página base 0, `size` máx. 50). La búsqueda acepta el nombre completo o palabras sueltas (`arroz`, `pelon arroz`): cada fila trae su `producto` |
| GET | `/health` | Sin autenticación |
| GET | `/swagger` | Swagger UI (spec en `/openapi.json`) |

Errores: `{ "status": 400, "message": "...", "correlationId": "..." }`.

## Arranque local

```bash
npm install
cp .env.example .env
npm run dev        # http://localhost:8080/swagger
npm test
```

Sin `MONGO_URI` usa un almacén **en memoria** (solo local). Para cargar los precios de ejemplo: pon la cadena de Atlas en `.env` y corre `npm run seed` una vez. El certificado se desactiva si `CLIENT_CERT_THUMBPRINT` está vacío y `NODE_ENV` no es `production`.

Las pruebas usan memoria por defecto; con `TEST_MONGO=1 MONGO_URI=... npm test` corren contra una base Mongo real.

Para probar a mano necesitas un JWT con claim `sub` (no se verifica la firma; eso lo hace APIM):

```bash
TOKEN="x.$(echo -n '{"sub":"user-1"}' | base64 | tr -d '=').y"
curl -H "Authorization: Bearer $TOKEN" "http://localhost:8080/v1/Precios"
```

## Variables

| Nombre | Tipo (GitHub) | Descripción |
|---|---|---|
| `MONGO_URI` | Secret | Cadena de conexión del cluster de MongoDB Atlas |
| `MONGO_DB` | Variable | Base de este servicio (`estudiambre_precios`) |
| `COLLECTION_PRECIOS` | Variable | Colección (`precios`) |
| `CLIENT_CERT_THUMBPRINT` | Secret | SHA-1 del certificado de APIM, sin `:` |
| `PORT` | App setting | Lo define App Service |
| `AZURE_WEBAPP_NAME` / `AZURE_WEBAPP_PUBLISH_PROFILE` | Variable / Secret (Environment `test`) | Para el workflow |

Todas (menos las dos últimas) también como *App settings* del App Service. Poner `NODE_ENV=production` en Azure: sin thumbprint configurado, el servicio responde 403 en vez de dejar pasar.

## Decisiones

- **MongoDB (NoSQL documental)**: los precios son documentos independientes que se consultan por producto, se ordenan y se paginan en la base (`skip`/`limit`, índice `{producto, precio, reportes}`).
- **Precios**: un documento por precio, con `producto` normalizado (minúsculas, sin tildes). Datos de ejemplo con los nombres del catálogo del frontend.
- **Datos de ejemplo** (`npm run seed`): 77 productos y 370 precios. Los productos esenciales (arroz, frijoles, leche, huevos, pan, aceite, azúcar, pollo) tienen 7 tipos cada uno y los específicos (café, pasta, atún, papel higiénico, jabón, detergente, agua) tienen 3. Las familias y precios base están en `scripts/seed-familias.js`; los precios por tienda se generan de forma determinista (ids estables), así que repetir el seed no duplica nada. Para agregar un tipo, sumalo a su familia y corré el seed otra vez. Deben coincidir con `src/catalog.js` del frontend para las sugerencias.
- **Búsqueda por palabras**: primero se busca el nombre exacto (lo que llega al elegir una sugerencia); si no hay resultados, se buscan los productos cuyo nombre normalizado contenga **todas** las palabras escritas. Cada documento guarda además `nombre` (para mostrar). Si ya habías cargado datos antes de este cambio, corre `npm run seed` otra vez: es idempotente (mismos `_id`) y solo agrega `nombre`; mientras tanto la API devuelve el nombre normalizado.
- Precios en colones, enteros.
- **Un servicio por contexto**: este servicio solo conoce su base; no lee los datos de su par (`ms-perfil`).
- **Identidad**: se lee `sub` del JWT sin revalidar la firma; APIM ya la validó y solo APIM llega al backend (certificado).
- **Certificado**: `X-ARR-ClientCert` (DER en base64) → SHA-1 → comparado con `CLIENT_CERT_THUMBPRINT`. `/health` y `/swagger` quedan fuera del filtro.
- **Logs** JSON por línea, con `correlationId` (`X-Correlation-Id` de APIM, o uno nuevo si falta).
- **Seguridad con Mongo**: valores y claves validados antes de llegar a la base (sin claves tipo operador como `$set`).

### Base de datos fuera de Azure (aprobada por el profesor)

El enunciado pide servicios de datos en Azure. Para Precios se usa **MongoDB Atlas**, que está fuera de Azure, y esta decisión fue **consultada y aprobada por el profesor Marcos Rodríguez**: Atlas es válido para este microservicio, y Perfil y Precios pueden compartir un mismo cluster con una base de datos separada por servicio (`estudiambre_perfil` y `estudiambre_precios`). Si en algún momento se exigiera que esté dentro de Azure, la alternativa es **Azure Cosmos DB for MongoDB**: el código no cambia, solo la variable `MONGO_URI`.


## Despliegue

Push a `test` → GitHub Actions corre las pruebas y despliega al App Service (`.github/workflows/deploy-test.yml`). Si el Deployment Center ya generó su propio workflow, usa ese y borra este.
