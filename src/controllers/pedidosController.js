const db = require('../config/db');

// Listar todos los pedidos
exports.listarPedidos = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM pedidos');
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Crear un nuevo pedido
exports.crearPedido = async (req, res) => {
  const { id_proveedor, estado, total } = req.body;
  const fecha = new Date();
  try {
    const [result] = await db.query(
      'INSERT INTO pedidos (id_proveedor, fecha, estado, total) VALUES (?, ?, ?, ?)',
      [id_proveedor, fecha, estado || 'pendiente', total]
    );
    res.status(201).json({ id_pedido: result.insertId, id_proveedor, fecha, estado, total });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Obtener pedido por ID
exports.obtenerPedido = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM pedidos WHERE id_pedido = ?', [req.params.id]);
    if (!results.length) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json(results[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Actualizar pedido por ID
exports.actualizarPedido = async (req, res) => {
  const { id_proveedor, estado, total } = req.body;
  try {
    await db.query(
      'UPDATE pedidos SET id_proveedor=?, estado=?, total=? WHERE id_pedido=?',
      [id_proveedor, estado, total, req.params.id]
    );
    res.json({ message: 'Pedido actualizado correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Eliminar pedido por ID
exports.eliminarPedido = async (req, res) => {
  try {
    await db.query('DELETE FROM pedidos WHERE id_pedido=?', [req.params.id]);
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Listar pedidos por proveedor
exports.pedidosPorProveedor = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM pedidos WHERE id_proveedor = ?', [req.params.id]);
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
};