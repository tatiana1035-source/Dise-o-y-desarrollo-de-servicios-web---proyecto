const db = require('../config/db');

// Listar todas las alertas
exports.listarAlertas = (req, res) => {
  db.query('SELECT * FROM alertas', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Crear una nueva alerta
exports.crearAlerta = (req, res) => {
  const { id_producto, tipo, mensaje, estado } = req.body;
  const fecha = new Date();
  const sql = `INSERT INTO alertas (id_producto, tipo, mensaje, fecha, estado) VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [id_producto, tipo, mensaje, fecha, estado || 'pendiente'], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id_alerta: result.insertId, id_producto, tipo, mensaje, fecha, estado });
  });
};

// Obtener alerta por ID
exports.obtenerAlerta = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM alertas WHERE id_alertas = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Alerta no encontrada' });
    res.json(results[0]);
  });
};

// Actualizar alerta por ID
exports.actualizarAlerta = (req, res) => {
  const { id } = req.params;
  const { id_producto, tipo, mensaje, estado } = req.body;
  const sql = `UPDATE alertas SET id_producto=?, tipo=?, mensaje=?, estado=? WHERE id_alertas=?`;

  db.query(sql, [id_producto, tipo, mensaje, estado, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Alerta actualizada correctamente' });
  });
};

// Eliminar alerta por ID
exports.eliminarAlerta = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM alertas WHERE id_alertas=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Alerta eliminada correctamente' });
  });
};

// Listar alertas pendientes
exports.alertasPendientes = (req, res) => {
  db.query("SELECT * FROM alertas WHERE estado = 'pendiente'", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};