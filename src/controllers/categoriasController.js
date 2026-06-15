const db = require('../config/db');

// Listar todas las categorías
exports.listarCategorias = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM categorias');
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Crear una nueva categoría
exports.crearCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const [result] = await db.query('INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
    res.status(201).json({ id_categoria: result.insertId, nombre, descripcion });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Obtener categoría por ID
exports.obtenerCategoria = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM categorias WHERE id_categoria = ?', [req.params.id]);
    if (!results.length) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json(results[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Actualizar categoría por ID
exports.actualizarCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    await db.query('UPDATE categorias SET nombre=?, descripcion=? WHERE id_categoria=?', [nombre, descripcion, req.params.id]);
    res.json({ message: 'Categoría actualizada correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Eliminar categoría por ID
exports.eliminarCategoria = async (req, res) => {
  try {
    await db.query('DELETE FROM categorias WHERE id_categoria=?', [req.params.id]);
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};