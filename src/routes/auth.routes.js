// auth.routes.js

// Rutas de autenticación
const express  = require('express');
const router   = express.Router();
const authCtrl = require('../controllers/auth.controller');

// Registra un nuevo usuario
router.post('/register', authCtrl.register);

// Iniciar sesion y devolver un token
router.post('/login', authCtrl.login);

module.exports = router;