const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');

/**
 * @swagger
 * tags:
 *   name: Reportes
 *   description: Reportes e informes del inventario
 */

/**
 * @swagger
 * /reportes/stock-bajo:
 *   get:
 *     summary: Productos con stock bajo
 *     tags: [Reportes]
 *     responses:
 *       200:
 *         description: Lista de productos con stock menor al mínimo
 */
router.get('/stock-bajo', reportesController.stockBajo);

/**
 * @swagger
 * /reportes/sin-stock:
 *   get:
 *     summary: Productos sin stock
 *     tags: [Reportes]
 *     responses:
 *       200:
 *         description: Lista de productos con cantidad en cero
 */
router.get('/sin-stock', reportesController.sinStock);

/**
 * @swagger
 * /reportes/general:
 *   get:
 *     summary: Reporte general del inventario
 *     tags: [Reportes]
 *     responses:
 *       200:
 *         description: Estadísticas generales del inventario
 */
router.get('/general', reportesController.reporteGeneral);

/**
 * @swagger
 * /reportes/movimientos:
 *   get:
 *     summary: Movimientos por rango de fechas
 *     tags: [Reportes]
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
 *         description: Lista de movimientos en el rango de fechas
 */
router.get('/movimientos', reportesController.movimientosPorFecha);

module.exports = router;