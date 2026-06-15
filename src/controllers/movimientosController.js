const db = require('../config/db');

// Listar todos los movimientos
exports.listarMovimientos = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM movimientos');
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Crear un nuevo movimiento
exports.crearMovimiento = async (req, res) => {
  const { id_producto, id_almacen, tipo, cantidad, fecha, id_usuario } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO movimientos (id_producto, id_almacen, tipo, cantidad, fecha, id_usuario) VALUES (?, ?, ?, ?, ?, ?)',
      [id_producto, id_almacen, tipo, cantidad, fecha, id_usuario]
    );
    res.status(201).json({ id_movimiento: result.insertId, id_producto, id_almacen, tipo, cantidad, fecha, id_usuario });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Obtener movimiento por ID
exports.obtenerMovimiento = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM movimientos WHERE id_movimiento = ?', [req.params.id]);
    if (!results.length) return res.status(404).json({ message: 'Movimiento no encontrado' });
    res.json(results[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Actualizar movimiento por ID
exports.actualizarMovimiento = async (req, res) => {
  const { id_producto, id_almacen, tipo, cantidad, fecha, id_usuario } = req.body;
  try {
    await db.query(
      'UPDATE movimientos SET id_producto=?, id_almacen=?, tipo=?, cantidad=?, fecha=?, id_usuario=? WHERE id_movimiento=?',
      [id_producto, id_almacen, tipo, cantidad, fecha, id_usuario, req.params.id]
    );
    res.json({ message: 'Movimiento actualizado correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Eliminar movimiento por ID
exports.eliminarMovimiento = async (req, res) => {
  try {
    await db.query('DELETE FROM movimientos WHERE id_movimiento=?', [req.params.id]);
    res.json({ message: 'Movimiento eliminado correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};