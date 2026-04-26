const db = require('../config/db');

// Listar todo el historial
exports.listarHistorial = (req, res) => {
  const sql = `SELECT h.*, u.nombre AS usuario 
               FROM historial h
               LEFT JOIN usuarios u ON h.id_usuario = u.id
               ORDER BY h.fecha DESC`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Registrar una acción en el historial
exports.registrarAccion = (req, res) => {
  const { id_usuario, accion, descripcion } = req.body;
  const sql = `INSERT INTO historial (id_usuario, accion, descripcion, fecha) 
               VALUES (?, ?, ?, NOW())`;
  db.query(sql, [id_usuario, accion, descripcion], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id_historial: result.insertId, id_usuario, accion, descripcion });
  });
};

// Historial por usuario
exports.historialPorUsuario = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM historial WHERE id_usuario = ? ORDER BY fecha DESC`;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Historial por rango de fechas
exports.historialPorFecha = (req, res) => {
  const { fecha_inicio, fecha_fin } = req.query;
  const sql = `SELECT h.*, u.nombre AS usuario 
               FROM historial h
               LEFT JOIN usuarios u ON h.id_usuario = u.id
               WHERE h.fecha BETWEEN ? AND ?
               ORDER BY h.fecha DESC`;
  db.query(sql, [fecha_inicio, fecha_fin], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};