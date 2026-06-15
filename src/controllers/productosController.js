const db = require('../config/db');

// 
exports.listarProductos = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM producto');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
  const { nombre, precio, cantidad, stock_minimo, fecha_registro, activo, codigo_producto, descripcion, id_categoria, id_proveedor } = req.body;
  const sql = `INSERT INTO producto (nombre, precio, cantidad, stock_minimo, fecha_registro, activo, codigo_producto, descripcion, id_categoria, id_proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  try {
    const [result] = await db.query(sql, [nombre, precio, cantidad, stock_minimo, fecha_registro, activo, codigo_producto, descripcion, id_categoria, id_proveedor]);
    res.status(201).json({ id_producto: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener producto por ID
exports.obtenerProducto = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM producto WHERE id_producto = ?', [req.params.id]);
    if (!results.length) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar producto por ID
exports.actualizarProducto = async (req, res) => {
  const { nombre, precio, cantidad, stock_minimo, fecha_registro, activo, codigo_producto, descripcion, id_categoria, id_proveedor } = req.body;
  const sql = `UPDATE producto SET nombre=?, precio=?, cantidad=?, stock_minimo=?, fecha_registro=?, activo=?, codigo_producto=?, descripcion=?, id_categoria=?, id_proveedor=? WHERE id_producto=?`;
  try {
    await db.query(sql, [nombre, precio, cantidad, stock_minimo, fecha_registro, activo, codigo_producto, descripcion, id_categoria, id_proveedor, req.params.id]);
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar producto por ID
exports.eliminarProducto = async (req, res) => {
  try {
    await db.query('DELETE FROM producto WHERE id_producto=?', [req.params.id]);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};