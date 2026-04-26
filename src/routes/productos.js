const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Gestión de productos del inventario
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Listar todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 */
router.get('/', productosController.listarProductos);

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *               cantidad:
 *                 type: integer
 *               stock_minimo:
 *                 type: integer
 *               codigo_producto:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               id_categoria:
 *                 type: integer
 *               id_proveedor:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 */
router.post('/', productosController.crearProducto);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', productosController.obtenerProducto);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 */
router.put('/:id', productosController.actualizarProducto);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 */
router.delete('/:id', productosController.eliminarProducto);

module.exports = router;

