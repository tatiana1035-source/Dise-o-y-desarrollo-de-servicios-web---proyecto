const db = require('../config/db');

// Listar todas las categorías
exports.listarCategorias = (req, res) => {
  db.query('SELECT * FROM categorias', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Crear una nueva categoría
exports.crearCategoria = (req, res) => {
  const { nombre, descripcion } = req.body;
  const sql = 'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)';

  db.query(sql, [nombre, descripcion], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id_categoria: result.insertId, nombre, descripcion });
  });
};

// Obtener categoría por ID
exports.obtenerCategoria = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM categorias WHERE id_categoria = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json(results[0]);
  });
};

// Actualizar categoría por ID
exports.actualizarCategoria = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  const sql = 'UPDATE categorias SET nombre=?, descripcion=? WHERE id_categoria=?';

  db.query(sql, [nombre, descripcion, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Categoría actualizada correctamente' });
  });
};

// Eliminar categoría por ID
exports.eliminarCategoria = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM categorias WHERE id_categoria=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Categoría eliminada correctamente' });
  });
};