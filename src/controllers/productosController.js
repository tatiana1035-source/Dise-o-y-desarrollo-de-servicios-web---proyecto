const db = require('../config/db');

exports.listarProductos = (req, res) => {
  const esAPI = req.headers['x-requested-with'] === 'XMLHttpRequest' 
             || req.headers.accept === 'application/json';
  
  if (!esAPI) {
    return res.render('productos', { titulo: 'Productos' });
  }
  
  db.query('SELECT * FROM producto', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Crear un nuevo producto
exports.crearProducto = (req, res) => {
  const { nombre, precio, cantidad, stock_minimo, fecha_registro, activo, codigo_producto, descripcion, id_categoria, id_proveedor } = req.body;
  const sql = `INSERT INTO producto 
    (nombre, precio, cantidad, stock_minimo, fecha_registro, activo, codigo_producto, descripcion, id_categoria, id_proveedor) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  db.query(sql, [nombre, precio, cantidad, stock_minimo, fecha_registro, activo, codigo_producto, descripcion, id_categoria, id_proveedor], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id_producto: result.insertId, nombre, precio, cantidad, stock_minimo, fecha_registro, activo, codigo_producto, descripcion, id_categoria, id_proveedor });
  });
};

// Obtener producto por ID
exports.obtenerProducto = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM producto WHERE id_producto = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(results[0]);
  });
};

// Actualizar producto por ID
exports.actualizarProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, precio, cantidad, stock_minimo, fecha_registro, activo, codigo_producto, descripcion, id_categoria, id_proveedor } = req.body;
  const sql = `UPDATE producto 
    SET nombre=?, precio=?, cantidad=?, stock_minimo=?, fecha_registro=?, activo=?, codigo_producto=?, descripcion=?, id_categoria=?, id_proveedor=? 
    WHERE id_producto=?`;
  
  db.query(sql, [nombre, precio, cantidad, stock_minimo, fecha_registro, activo, codigo_producto, descripcion, id_categoria, id_proveedor, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Producto actualizado correctamente' });
  });
};

// Eliminar producto por ID
exports.eliminarProducto = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM producto WHERE id_producto=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Producto eliminado correctamente' });
  });
};
