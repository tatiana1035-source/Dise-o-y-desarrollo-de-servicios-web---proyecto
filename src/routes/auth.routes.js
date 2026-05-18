// ============================================================
// auth.routes.js
// Rutas de autenticación: /api/auth/register y /api/auth/login
// GA8-220501096-AA1-EV01
// ============================================================

const express  = require('express');
const router   = express.Router();
const authCtrl = require('../controllers/auth.controller');

/**
 * POST /api/auth/register
 * Registra un nuevo usuario. La contraseña se hashea en el servicio.
 * Body: { nombre, email, password, rol? }
 */
router.post('/register', authCtrl.register);

/**
 * POST /api/auth/login
 * Autentica un usuario y devuelve un JWT.
 * Body: { email, password }
 */
router.post('/login', authCtrl.login);

module.exports = router;