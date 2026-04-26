const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Endpoints CRUD
router.get('/', productosController.listarProductos);        // Listar todos
router.post('/', productosController.crearProducto);         // Crear nuevo
router.get('/:id', productosController.obtenerProducto);     // Obtener por ID
router.put('/:id', productosController.actualizarProducto);  // Actualizar por ID
router.delete('/:id', productosController.eliminarProducto); // Eliminar por ID

module.exports = router;

