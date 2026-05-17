const express = require('express');
const router = express.Router();
const alertasController = require('../controllers/alertasController');

/**
 * @swagger
 * tags:
 *   name: Alertas
 *   description: Gestión de alertas del inventario
 */

/**
 * @swagger
 * /alertas:
 *   get:
 *     summary: Listar todas las alertas
 *     tags: [Alertas]
 *     responses:
 *       200:
 *         description: Lista de alertas obtenida correctamente
 */
router.get('/', alertasController.listarAlertas);

/**
 * @swagger
 * /alertas/pendientes:
 *   get:
 *     summary: Listar alertas pendientes
 *     tags: [Alertas]
 *     responses:
 *       200:
 *         description: Lista de alertas pendientes
 */
router.get('/pendientes', alertasController.alertasPendientes);

/**
 * @swagger
 * /alertas:
 *   post:
 *     summary: Crear una nueva alerta
 *     tags: [Alertas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_producto:
 *                 type: integer
 *               tipo:
 *                 type: string
 *               mensaje:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Alerta creada correctamente
 */
router.post('/', alertasController.crearAlerta);

/**
 * @swagger
 * /alertas/{id}:
 *   get:
 *     summary: Obtener alerta por ID
 *     tags: [Alertas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alerta encontrada
 *       404:
 *         description: Alerta no encontrada
 */
router.get('/:id', alertasController.obtenerAlerta);

/**
 * @swagger
 * /alertas/{id}:
 *   put:
 *     summary: Actualizar alerta por ID
 *     tags: [Alertas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alerta actualizada correctamente
 */
router.put('/:id', alertasController.actualizarAlerta);

/**
 * @swagger
 * /alertas/{id}:
 *   delete:
 *     summary: Eliminar alerta por ID
 *     tags: [Alertas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alerta eliminada correctamente
 */
router.delete('/:id', alertasController.eliminarAlerta);

module.exports = router;