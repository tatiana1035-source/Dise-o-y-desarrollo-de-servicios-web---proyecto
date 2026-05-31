const express = require('express');
const app = express();
const path = require('path'); 
require('dotenv').config();
const cors = require('cors');

// Motor de plantillas EJS
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const productosRoutes = require('./routes/productos');
const movimientosRoutes = require('./routes/movimientos');
const usuariosRoutes = require('./routes/usuarios');
const proveedoresRoutes = require('./routes/proveedores');
const categoriasRoutes = require('./routes/categorias');
const reportesRoutes = require('./routes/reportes');
const historialRoutes = require('./routes/historial');
const codigosRoutes = require('./routes/codigos');
const alertasRoutes = require('./routes/alertas');
const pedidosRoutes = require('./routes/pedidos');

// Rutas API
app.use('/api/productos', productosRoutes);
app.use('/api/movimientos', movimientosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/reportes', reportesRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/codigos', codigosRoutes);
app.use('/api/alertas', alertasRoutes);
app.use('/api/pedidos', pedidosRoutes);

// VISTAS WEB:
const vistas = [
  'productos', 'movimientos', 'usuarios', 'proveedores', 'categorias',
  'reportes', 'historial', 'codigos', 'alertas', 'pedidos'
];

vistas. forEach(vista => {
  app.get('/' + vista, (req, res) => {
    res.render(vista, { titulo: vista });
  });
});

// Ruta principal → sirve el frontend
app.get('/', (req, res) => {
  res.render('index', { titulo: 'StockLogistic' });
});

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventario API',
      version: '1.0.0',
      description: 'API para gestión de inventario con Node.js, Express y MySQL'
    },
  },
  apis: [path.join(__dirname, './routes/*.js')],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Manejo error global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Solo levantar servidor si no estamos en pruebas
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;