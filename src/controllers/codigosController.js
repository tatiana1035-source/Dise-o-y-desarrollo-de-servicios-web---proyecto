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