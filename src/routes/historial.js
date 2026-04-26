const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historialController');

/**
 * @swagger
 * tags:
 *   name: Historial
 *   description: Registro de acciones y auditoría del sistema
 */

/**
 * @swagger
 * /historial:
 *   get:
 *     summary: Listar todo el historial de acciones
 *     tags: [Historial]
 *     responses:
 *       200:
 *         description: Historial obtenido correctamente
 */
router.get('/', historialController.listarHistorial);

/**
 * @swagger
 * /historial:
 *   post:
 *     summary: Registrar una acción en el historial
 *     tags: [Historial]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               accion:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Acción registrada correctamente
 */
router.post('/', historialController.registrarAccion);

/**
 * @swagger
 * /historial/usuario/{id}:
 *   get:
 *     summary: Historial por usuario
 *     tags: [Historial]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Historial del usuario obtenido correctamente
 */
router.get('/usuario/:id', historialController.historialPorUsuario);

/**
 * @swagger
 * /historial/fechas:
 *   get:
 *     summary: Historial por rango de fechas
 *     tags: [Historial]
 *     parameters:
 *       - in: query
 *         name: fecha_inicio
 *         required: true
 *         schema:
 *           type: string
 *         example: "2024-01-01"
 *       - in: query
 *         name: fecha_fin
 *         required: true
 *         schema:
 *           type: string
 *         example: "2024-12-31"
 *     responses:
 *       200:
 *         description: Historial en el rango de fechas obtenido correctamente
 */
router.get('/fechas', historialController.historialPorFecha);

module.exports = router;