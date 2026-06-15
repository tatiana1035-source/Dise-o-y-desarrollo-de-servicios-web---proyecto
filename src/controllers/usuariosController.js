const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Listar todos los usuarios
exports.listarUsuarios = async (req, res) => {
  try {
    const [results] = await db.query('SELECT id, nombre, correo, rol FROM usuarios');
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  const { nombre, correo, clave, rol } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(clave, 10);
    const [result] = await db.query(
      'INSERT INTO usuarios (nombre, correo, clave, rol) VALUES (?, ?, ?, ?)',
      [nombre, correo, hashedPassword, rol]
    );
    res.status(201).json({ id: result.insertId, nombre, correo, rol });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Obtener usuario por ID
exports.obtenerUsuario = async (req, res) => {
  try {
    const [results] = await db.query('SELECT id, nombre, correo, rol FROM usuarios WHERE id = ?', [req.params.id]);
    if (!results.length) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(results[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Actualizar usuario por ID
exports.actualizarUsuario = async (req, res) => {
  const { nombre, correo, clave, rol } = req.body;
  try {
    const hashedPassword = clave ? await bcrypt.hash(clave, 10) : null;
    const sql = hashedPassword
      ? 'UPDATE usuarios SET nombre=?, correo=?, clave=?, rol=? WHERE id=?'
      : 'UPDATE usuarios SET nombre=?, correo=?, rol=? WHERE id=?';
    const params = hashedPassword
      ? [nombre, correo, hashedPassword, rol, req.params.id]
      : [nombre, correo, rol, req.params.id];
    await db.query(sql, params);
    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Eliminar usuario por ID
exports.eliminarUsuario = async (req, res) => {
  try {
    await db.query('DELETE FROM usuarios WHERE id=?', [req.params.id]);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Login de usuario
exports.loginUsuario = async (req, res) => {
  const { correo, clave } = req.body;
  try {
    const [results] = await db.query('SELECT * FROM usuarios WHERE correo=?', [correo]);
    if (!results.length) return res.status(401).json({ message: 'Credenciales inválidas' });
    const usuario = results[0];
    const match = await bcrypt.compare(clave, usuario.clave);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });
    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login exitoso', token });
  } catch (err) { res.status(500).json({ error: err.message }); }
};