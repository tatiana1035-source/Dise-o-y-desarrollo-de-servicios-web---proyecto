const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gestión de pedidos a proveedores
 */

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Listar todos los pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida correctamente
 */
router.get('/', pedidosController.listarPedidos);

/**
 * @swagger
 * /pedidos/proveedor/{id}:
 *   get:
 *     summary: Listar pedidos por proveedor
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedidos del proveedor obtenidos correctamente
 */
router.get('/proveedor/:id', pedidosController.pedidosPorProveedor);

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_proveedor:
 *                 type: integer
 *               estado:
 *                 type: string
 *               total:
 *                 type: number
 *     responses:
 *       201:
 *         description: Pedido creado correctamente
 */
router.post('/', pedidosController.crearPedido);

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Obtener pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido no encontrado
 */
router.get('/:id', pedidosController.obtenerPedido);

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Actualizar pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido actualizado correctamente
 */
router.put('/:id', pedidosController.actualizarPedido);

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Eliminar pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido eliminado correctamente
 */
router.delete('/:id', pedidosController.eliminarPedido);

module.exports = router;