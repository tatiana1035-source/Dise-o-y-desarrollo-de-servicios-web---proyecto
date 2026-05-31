const db = require('../config/db');

// Buscar producto por código de barras o QR
exports.buscarPorCodigo = (req, res) => {
  const { codigo } = req.params;
  const sql = `SELECT p.*, c.nombre AS categoria, pr.nombre AS proveedor 
               FROM producto p
               LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
               LEFT JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor
               WHERE p.codigo_producto = ?`;
  db.query(sql, [codigo], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Producto no encontrado con ese código' });
    res.json(results[0]);
  });
};

// Actualizar cantidad por código de barras
exports.actualizarCantidadPorCodigo = (req, res) => {
  const { codigo } = req.params;
  const { cantidad, tipo } = req.body;
  const operacion = tipo === 'entrada' ? '+' : '-';
  const sql = `UPDATE producto 
               SET cantidad = cantidad ${operacion} ? 
               WHERE codigo_producto = ?`;
  db.query(sql, [cantidad, codigo], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: `Cantidad actualizada correctamente (${tipo})` });
  });
};

// Listar todos los códigos
exports.listarCodigos = (req, res) => {
  db.query('SELECT * FROM codigos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Crear código
exports.crearCodigo = (req, res) => {
  const { id_producto, codigo, tipo } = req.body;
  const fecha_registro = new Date();
  const sql = 'INSERT INTO codigos (id_producto, codigo, tipo, fecha_registro) VALUES (?, ?, ?, ?)';
  db.query(sql, [id_producto, codigo, tipo, fecha_registro], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id_codigo: result.insertId, id_producto, codigo, tipo });
  });
};

// Eliminar código
exports.eliminarCodigo = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM codigos WHERE id_codigo = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Código eliminado correctamente' });
  });
};