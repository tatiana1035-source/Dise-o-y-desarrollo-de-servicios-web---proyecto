const express = require('express');
const router = express.Router();
const movimientosController = require('../controllers/movimientosController');

// Endpoints CRUD
router.get('/', movimientosController.listarMovimientos);        // Listar todos
router.post('/', movimientosController.crearMovimiento);         // Crear nuevo
router.get('/:id', movimientosController.obtenerMovimiento);     // Obtener por ID
router.put('/:id', movimientosController.actualizarMovimiento);  // Actualizar por ID
router.delete('/:id', movimientosController.eliminarMovimiento); // Eliminar por ID

module.exports = router;
