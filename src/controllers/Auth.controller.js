// ============================================================
// auth.controller.js
// Controlador de autenticación
// GA8-220501096-AA1-EV01
// ============================================================

const authService    = require('../services/auth.service');
const UserRepository = require('../repositories/user.repository'); // Adaptarlo al modelo real

const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body, UserRepository);
    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password, UserRepository);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = { register, login };