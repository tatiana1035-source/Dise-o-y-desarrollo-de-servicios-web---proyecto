const db = require('../config/db');

// Listar todos los proveedores
exports.listarProveedores = (req, res) => {
  db.query('SELECT * FROM proveedores', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Crear un nuevo proveedor
exports.crearProveedor = (req, res) => {
  const { nombre, email, telefono, direccion, ciudad } = req.body;
  const sql = `INSERT INTO proveedores 
    (nombre, email, telefono, direccion, ciudad) 
    VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [nombre, email, telefono, direccion, ciudad], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id_proveedor: result.insertId, nombre, email, telefono, direccion, ciudad });
  });
};

// Obtener proveedor por ID
exports.obtenerProveedor = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM proveedores WHERE id_proveedor = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json(results[0]);
  });
};

// Actualizar proveedor por ID
exports.actualizarProveedor = (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, direccion, ciudad } = req.body;
  const sql = `UPDATE proveedores 
    SET nombre=?, email=?, telefono=?, direccion=?, ciudad=? 
    WHERE id_proveedor=?`;

  db.query(sql, [nombre, email, telefono, direccion, ciudad, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Proveedor actualizado correctamente' });
  });
};

// Eliminar proveedor por ID
exports.eliminarProveedor = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM proveedores WHERE id_proveedor=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Proveedor eliminado correctamente' });
  });
};