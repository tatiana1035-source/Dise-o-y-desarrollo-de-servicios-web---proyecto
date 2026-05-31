// ============================================================
// auth.service.js
// Lógica de autenticación
// // ============================================================

const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const SALT_ROUNDS = 10; // Factor de costo bcrypt (recomendado: 10-12)

// Cifrar contraseña
 
const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
};

// Comparar contraseña con el hash guardado

const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Genera un token JWT

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    issuer: 'GA8-App',
  });
};

// Registrar usuario nuevo
  
const registerUser = async (userData, userRepository) => {
  const { nombre, email, password, rol } = userData;

  
  const existing = await userRepository.findOne({ where: { email } });
  if (existing) {
    throw new Error('El correo electrónico ya está registrado.');
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await userRepository.create({
    nombre,
    email,
    password: hashedPassword,
    rol: rol || 'cliente',
  });

  return { id: newUser.id, nombre: newUser.nombre, email: newUser.email };
};

// Iniciar sesión
const loginUser = async (email, password, userRepository) => {
  // 1. Buscar usuario por email
  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    throw new Error('Credenciales incorrectas.'); // Mensaje genérico por seguridad
  }

    const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Credenciales incorrectas.');
  }

  const token = generateToken({ id: user.id, email: user.email, rol: user.rol });

  return {
    token,
    user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol },
  };
};

module.exports = { hashPassword, comparePassword, generateToken, registerUser, loginUser };
