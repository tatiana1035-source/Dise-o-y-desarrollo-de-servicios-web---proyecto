const db = require('../config/db');

// Listar todas las alertas
exports.listarAlertas = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM alertas');
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Crear una nueva alerta
exports.crearAlerta = async (req, res) => {
  const { id_producto, tipo, mensaje, estado } = req.body;
  const fecha = new Date();
  try {
    const [result] = await db.query(
      'INSERT INTO alertas (id_producto, tipo, mensaje, fecha, estado) VALUES (?, ?, ?, ?, ?)',
      [id_producto, tipo, mensaje, fecha, estado || 'pendiente']
    );
    res.status(201).json({ id_alerta: result.insertId, id_producto, tipo, mensaje, fecha, estado });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Obtener alerta por ID
exports.obtenerAlerta = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM alertas WHERE id_alertas = ?', [req.params.id]);
    if (!results.length) return res.status(404).json({ message: 'Alerta no encontrada' });
    res.json(results[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Actualizar alerta por ID
exports.actualizarAlerta = async (req, res) => {
  const { id_producto, tipo, mensaje, estado } = req.body;
  try {
    await db.query(
      'UPDATE alertas SET id_producto=?, tipo=?, mensaje=?, estado=? WHERE id_alertas=?',
      [id_producto, tipo, mensaje, estado, req.params.id]
    );
    res.json({ message: 'Alerta actualizada correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Eliminar alerta por ID
exports.eliminarAlerta = async (req, res) => {
  try {
    await db.query('DELETE FROM alertas WHERE id_alertas=?', [req.params.id]);
    res.json({ message: 'Alerta eliminada correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Listar alertas pendientes
exports.alertasPendientes = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM alertas WHERE estado = 'pendiente'");
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
};