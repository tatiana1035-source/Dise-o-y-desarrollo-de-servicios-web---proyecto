// ============================================================
// auth.middleware.js
// Mecanismo de seguridad: Verificación de token JWT
// ============================================================

const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticación JWT.
 * Verifica que el token enviado en el header Authorization sea válido.
 * Si es válido, adjunta el payload decodificado en req.user.
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // El token debe venir en formato: Bearer <token>
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Acceso denegado. No se proporcionó token de autenticación.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, rol, iat, exp }
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado. Por favor inicie sesión nuevamente.',
      });
    }
    return res.status(403).json({
      success: false,
      message: 'Token inválido.',
    });
  }
};

/**
 * Middleware de autorización por roles.
 * @param {...string} roles - Roles permitidos (ej: 'admin', 'vendedor')
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.status(403).json({
        success: false,
        message: `Acceso denegado. Se requiere uno de los siguientes roles: ${roles.join(', ')}.`,
      });
    }
    next();
  };
};

module.exports = { verifyToken, authorizeRoles };