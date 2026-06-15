const db = require('../config/db');

// Listar todo el historial
exports.listarHistorial = async (req, res) => {
  const sql = `SELECT h.*, u.nombre AS usuario 
               FROM historial h
               LEFT JOIN usuarios u ON h.id_usuario = u.id
               ORDER BY h.fecha DESC`;
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Registrar una acción en el historial
exports.registrarAccion = async (req, res) => {
  const { id_usuario, id_producto, id_almacen, cantidad, accion, descripcion } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO historial (id_usuario, id_producto, id_almacen, cantidad, accion, descripcion, fecha) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [id_usuario, id_producto, id_almacen, cantidad, accion, descripcion]
    );
    res.status(201).json({ id_historial: result.insertId, id_usuario, id_producto, accion, descripcion });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Historial por usuario
exports.historialPorUsuario = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM historial WHERE id_usuario = ? ORDER BY fecha DESC', [req.params.id]);
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Historial por rango de fechas
exports.historialPorFecha = async (req, res) => {
  const { fecha_inicio, fecha_fin } = req.query;
  const sql = `SELECT h.*, u.nombre AS usuario 
               FROM historial h
               LEFT JOIN usuarios u ON h.id_usuario = u.id
               WHERE h.fecha BETWEEN ? AND ?
               ORDER BY h.fecha DESC`;
  try {
    const [results] = await db.query(sql, [fecha_inicio, fecha_fin]);
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
};