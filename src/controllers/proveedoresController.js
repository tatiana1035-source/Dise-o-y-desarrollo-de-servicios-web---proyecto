const db = require('../config/db');

// Listar todos los proveedores
exports.listarProveedores = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM proveedores');
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Crear un nuevo proveedor
exports.crearProveedor = async (req, res) => {
  const { nombre, email, telefono, direccion, ciudad } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO proveedores (nombre, email, telefono, direccion, ciudad) VALUES (?, ?, ?, ?, ?)',
      [nombre, email, telefono, direccion, ciudad]
    );
    res.status(201).json({ id_proveedor: result.insertId, nombre, email, telefono, direccion, ciudad });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Obtener proveedor por ID
exports.obtenerProveedor = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM proveedores WHERE id_proveedor = ?', [req.params.id]);
    if (!results.length) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json(results[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Actualizar proveedor por ID
exports.actualizarProveedor = async (req, res) => {
  const { nombre, email, telefono, direccion, ciudad } = req.body;
  try {
    await db.query(
      'UPDATE proveedores SET nombre=?, email=?, telefono=?, direccion=?, ciudad=? WHERE id_proveedor=?',
      [nombre, email, telefono, direccion, ciudad, req.params.id]
    );
    res.json({ message: 'Proveedor actualizado correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Eliminar proveedor por ID
exports.eliminarProveedor = async (req, res) => {
  try {
    await db.query('DELETE FROM proveedores WHERE id_proveedor=?', [req.params.id]);
    res.json({ message: 'Proveedor eliminado correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};