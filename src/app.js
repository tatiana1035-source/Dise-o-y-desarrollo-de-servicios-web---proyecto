const express = require('express');
const app = express();
require('dotenv').config();

// Importar rutas
const productosRoutes = require('./routes/productos');
const movimientosRoutes = require('./routes/movimientos');
const usuariosRoutes = require('./routes/usuarios');
const proveedoresRoutes = require('./routes/proveedores');
const categoriasRoutes = require('./routes/categorias');
const reportesRoutes = require('./routes/reportes');
const historialRoutes = require('./routes/historial');
const codigosRoutes = require('./routes/codigos');

// Middlewares
app.use(express.json());

// Rutas
app.use('/productos', productosRoutes);
app.use('/movimientos', movimientosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/proveedores', proveedoresRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/reportes', reportesRoutes);
app.use('/historial', historialRoutes);
app.use('/codigos', codigosRoutes);

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventario API',
      version: '1.0.0',
      description: 'API para gestión de inventario con Node.js, Express y MySQL'
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});