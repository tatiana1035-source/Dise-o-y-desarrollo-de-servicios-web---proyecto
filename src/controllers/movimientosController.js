const db = require('../config/db');

// Listar todos los movimientos
exports.listarMovimientos = (req, res) => {
  db.query('SELECT * FROM movimientos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Crear un nuevo movimiento
exports.crearMovimiento = (req, res) => {
  const { id_producto, id_almacen, tipo, cantidad, fecha, id_usuario } = req.body;
  const sql = `INSERT INTO movimientos 
    (id_producto, id_almacen, tipo, cantidad, fecha, id_usuario) 
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [id_producto, id_almacen, tipo, cantidad, fecha, id_usuario], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ 
      id_movimiento: result.insertId, 
      id_producto, id_almacen, tipo, cantidad, fecha, id_usuario 
    });
  });
};

// Obtener movimiento por ID
exports.obtenerMovimiento = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM movimientos WHERE id_movimiento = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Movimiento no encontrado' });
    res.json(results[0]);
  });
};

// Actualizar movimiento por ID
exports.actualizarMovimiento = (req, res) => {
  const { id } = req.params;
  const { id_producto, id_almacen, tipo, cantidad, fecha, id_usuario } = req.body;
  const sql = `UPDATE movimientos 
    SET id_producto=?, id_almacen=?, tipo=?, cantidad=?, fecha=?, id_usuario=? 
    WHERE id_movimiento=?`;

  db.query(sql, [id_producto, id_almacen, tipo, cantidad, fecha, id_usuario, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Movimiento actualizado correctamente' });
  });
};

// Eliminar movimiento por ID
exports.eliminarMovimiento = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM movimientos WHERE id_movimiento=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Movimiento eliminado correctamente' });
  });
};