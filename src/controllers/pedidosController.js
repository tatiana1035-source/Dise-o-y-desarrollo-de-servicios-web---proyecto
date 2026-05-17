const db = require('../config/db');

// Listar todos los pedidos
exports.listarPedidos = (req, res) => {
  db.query('SELECT * FROM pedidos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Crear un nuevo pedido
exports.crearPedido = (req, res) => {
  const { id_proveedor, estado, total } = req.body;
  const fecha = new Date();
  const sql = `INSERT INTO pedidos (id_proveedor, fecha, estado, total) VALUES (?, ?, ?, ?)`;

  db.query(sql, [id_proveedor, fecha, estado || 'pendiente', total], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id_pedido: result.insertId, id_proveedor, fecha, estado, total });
  });
};

// Obtener pedido por ID
exports.obtenerPedido = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM pedidos WHERE id_pedido = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json(results[0]);
  });
};

// Actualizar pedido por ID
exports.actualizarPedido = (req, res) => {
  const { id } = req.params;
  const { id_proveedor, estado, total } = req.body;
  const sql = `UPDATE pedidos SET id_proveedor=?, estado=?, total=? WHERE id_pedido=?`;

  db.query(sql, [id_proveedor, estado, total, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Pedido actualizado correctamente' });
  });
};

// Eliminar pedido por ID
exports.eliminarPedido = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM pedidos WHERE id_pedido=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Pedido eliminado correctamente' });
  });
};

// Listar pedidos por proveedor
exports.pedidosPorProveedor = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM pedidos WHERE id_proveedor = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};