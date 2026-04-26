const express = require('express');
const router = express.Router();
const movimientosController = require('../controllers/movimientosController');

/**
 * @swagger
 * tags:
 *   name: Movimientos
 *   description: Control de movimientos de inventario
 */

/**
 * @swagger
 * /movimientos:
 *   get:
 *     summary: Listar todos los movimientos
 *     tags: [Movimientos]
 *     responses:
 *       200:
 *         description: Lista de movimientos obtenida correctamente
 */
router.get('/', movimientosController.listarMovimientos);

/**
 * @swagger
 * /movimientos:
 *   post:
 *     summary: Registrar un nuevo movimiento
 *     tags: [Movimientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_producto:
 *                 type: integer
 *               id_almacen:
 *                 type: integer
 *               tipo:
 *                 type: string
 *               cantidad:
 *                 type: integer
 *               fecha:
 *                 type: string
 *               id_usuario:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Movimiento registrado correctamente
 */
router.post('/', movimientosController.crearMovimiento);

/**
 * @swagger
 * /movimientos/{id}:
 *   get:
 *     summary: Obtener movimiento por ID
 *     tags: [Movimientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movimiento encontrado
 *       404:
 *         description: Movimiento no encontrado
 */
router.get('/:id', movimientosController.obtenerMovimiento);

/**
 * @swagger
 * /movimientos/{id}:
 *   put:
 *     summary: Actualizar movimiento por ID
 *     tags: [Movimientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movimiento actualizado correctamente
 */
router.put('/:id', movimientosController.actualizarMovimiento);

/**
 * @swagger
 * /movimientos/{id}:
 *   delete:
 *     summary: Eliminar movimiento por ID
 *     tags: [Movimientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movimiento eliminado correctamente
 */
router.delete('/:id', movimientosController.eliminarMovimiento);

module.exports = router;
