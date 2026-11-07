const { createApp } = require('./app');
const logger = require('./logger');
const { closeDb } = require('./repositories/store');

const port = process.env.PORT || 8080;

// Sin MongoDB (almacén en memoria) se cargan precios de ejemplo para poder probar el frontend.
if (!process.env.MONGO_URI && process.env.NODE_ENV !== 'production') {
  require('../scripts/seed').seed().catch((e) => logger.error('seed falló', { error: e.message }));
}

const server = createApp().listen(port, () => {
  logger.info('ms-precios escuchando', {
    port,
    almacen: process.env.MONGO_URI ? 'mongodb' : 'memoria (solo local)',
    certificado: process.env.CLIENT_CERT_THUMBPRINT ? 'activo' : 'desactivado',
  });
});

// App Service manda SIGTERM al reiniciar o escalar: terminar las peticiones en curso y cerrar Mongo.
process.on('SIGTERM', () => {
  logger.info('SIGTERM: cerrando');
  server.close(() => closeDb().finally(() => process.exit(0)));
});
