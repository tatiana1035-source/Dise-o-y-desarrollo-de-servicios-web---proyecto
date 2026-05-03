const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedoresController');

/**
 * @swagger
 * tags:
 *   name: Proveedores
 *   description: Administración de proveedores
 */

/**
 * @swagger
 * /proveedores:
 *   get:
 *     summary: Listar todos los proveedores
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de proveedores obtenida correctamente
 */
router.get('/', proveedoresController.listarProveedores);

/**
 * @swagger
 * /proveedores:
 *   post:
 *     summary: Crear un nuevo proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
  *               email:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *               ciudad:
 *                 type: string
 *     responses:
 *       201:
 *         description: Proveedor creado correctamente
 */
router.post('/', proveedoresController.crearProveedor);

/**
 * @swagger
 * /proveedores/{id}:
 *   get:
 *     summary: Obtener proveedor por ID
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 *       404:
 *         description: Proveedor no encontrado
 */
router.get('/:id', proveedoresController.obtenerProveedor);

/**
 * @swagger
 * /proveedores/{id}:
 *   put:
 *     summary: Actualizar proveedor por ID
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proveedor actualizado correctamente
 */
router.put('/:id', proveedoresController.actualizarProveedor);

/**
 * @swagger
 * /proveedores/{id}:
 *   delete:
 *     summary: Eliminar proveedor por ID
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proveedor eliminado correctamente
 */
router.delete('/:id', proveedoresController.eliminarProveedor);

module.exports = router;