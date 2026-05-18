// ============================================================
// auth.service.js
// Lógica de autenticación: Registro, Login con bcrypt y JWT
// GA8-220501096-AA1-EV01
// ============================================================

const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const SALT_ROUNDS = 10; // Factor de costo bcrypt (recomendado: 10-12)

/**
 * Hashea una contraseña en texto plano usando bcrypt.
 * @param {string} plainPassword - Contraseña sin cifrar
 * @returns {Promise<string>} Hash bcrypt
 */
const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
};

/**
 * Compara una contraseña en texto plano con su hash almacenado.
 * @param {string} plainPassword - Contraseña ingresada por el usuario
 * @param {string} hashedPassword - Hash almacenado en la BD
 * @returns {Promise<boolean>} true si coinciden, false si no
 */
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Genera un token JWT firmado con la clave secreta.
 * @param {Object} payload - Datos a incluir en el token (id, email, rol)
 * @returns {string} Token JWT firmado
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    issuer: 'GA8-App',
  });
};

/**
 * Ejemplo de flujo de registro de usuario.
 * En producción, `userRepository` sería el modelo de Sequelize/Mongoose.
 * @param {Object} userData - { nombre, email, password, rol }
 * @param {Object} userRepository - Repositorio/modelo de usuarios
 */
const registerUser = async (userData, userRepository) => {
  const { nombre, email, password, rol } = userData;

  // 1. Verificar si el email ya existe
  const existing = await userRepository.findOne({ where: { email } });
  if (existing) {
    throw new Error('El correo electrónico ya está registrado.');
  }

  // 2. Hashear la contraseña ANTES de guardarla
  const hashedPassword = await hashPassword(password);

  // 3. Guardar usuario con contraseña hasheada (NUNCA en texto plano)
  const newUser = await userRepository.create({
    nombre,
    email,
    password: hashedPassword,
    rol: rol || 'cliente',
  });

  return { id: newUser.id, nombre: newUser.nombre, email: newUser.email };
};

/**
 * Ejemplo de flujo de inicio de sesión.
 * @param {string} email
 * @param {string} password
 * @param {Object} userRepository
 * @returns {{ token: string, user: Object }}
 */
const loginUser = async (email, password, userRepository) => {
  // 1. Buscar usuario por email
  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    throw new Error('Credenciales incorrectas.'); // Mensaje genérico por seguridad
  }

  // 2. Comparar contraseña con bcrypt
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Credenciales incorrectas.');
  }

  // 3. Generar token JWT
  const token = generateToken({ id: user.id, email: user.email, rol: user.rol });

  return {
    token,
    user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol },
  };
};

module.exports = { hashPassword, comparePassword, generateToken, registerUser, loginUser };
