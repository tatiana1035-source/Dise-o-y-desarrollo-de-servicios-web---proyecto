const db = require('../config/db');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

// Listar todos los usuarios
exports.listarUsuarios = (req, res) => {
  db.query('SELECT id, nombre, correo, rol FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  const { nombre, correo, clave, rol } = req.body;
  const hashedPassword = await bcrypt.hash(clave, 10);
  const sql = 'INSERT INTO usuarios (nombre, correo, clave, rol) VALUES (?, ?, ?, ?)';
  
  db.query(sql, [nombre, correo, hashedPassword, rol], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, nombre, correo, rol });
  });
};

// Obtener usuario por ID
exports.obtenerUsuario = (req, res) => {
  const { id } = req.params;
  db.query('SELECT id, nombre, correo, rol FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(results[0]);
  });
};

// Actualizar usuario por ID
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, clave, rol } = req.body;
  const hashedPassword = clave ? await bcrypt.hash(clave, 10) : null;

  const sql = hashedPassword 
    ? 'UPDATE usuarios SET nombre=?, correo=?, clave=?, rol=? WHERE id=?'
    : 'UPDATE usuarios SET nombre=?, correo=?, rol=? WHERE id=?';

  const params = hashedPassword 
    ? [nombre, correo, hashedPassword, rol, id]
    : [nombre, correo, rol, id];

  db.query(sql, params, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario actualizado correctamente' });
  });
};

// Eliminar usuario por ID
exports.eliminarUsuario = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario eliminado correctamente' });
  });
};

// Login de usuario
exports.loginUsuario = (req, res) => {
  const { correo, clave } = req.body;
  db.query('SELECT * FROM usuarios WHERE correo=?', [correo], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ message: 'Credenciales inválidas' });

    const usuario = results[0];
    const match = await bcrypt.compare(clave, usuario.clave);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login exitoso', token });
  });
};
