const express = require('express');
const router = express.Router();
const codigosController = require('../controllers/codigosController');

/**
 * @swagger
 * tags:
 *   name: Códigos
 *   description: Lectura de códigos de barras y QR
 */

/**
 * @swagger
 * /codigos/{codigo}:
 *   get:
 *     summary: Buscar producto por código de barras o QR
 *     tags: [Códigos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         example: "PROD-001"
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:codigo', codigosController.buscarPorCodigo);

/**
 * @swagger
 * /codigos/{codigo}/cantidad:
 *   patch:
 *     summary: Actualizar cantidad por código de barras
 *     tags: [Códigos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: integer
 *               tipo:
 *                 type: string
 *                 enum: [entrada, salida]
 *     responses:
 *       200:
 *         description: Cantidad actualizada correctamente
 *       404:
 *         description: Producto no encontrado
 */
router.patch('/:codigo/cantidad', codigosController.actualizarCantidadPorCodigo);

module.exports = router;