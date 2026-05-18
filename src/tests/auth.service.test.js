// ============================================================
// auth.service.test.js
// Pruebas unitarias: Mecanismos de seguridad (JWT + bcrypt)
// GA8-220501096-AA1-EV01
// ============================================================

const bcrypt      = require('bcrypt');
const jwt         = require('jsonwebtoken');
const authService = require('../services/auth.service');

// Configurar variable de entorno para pruebas
process.env.JWT_SECRET      = 'test_secret_key_ga8';
process.env.JWT_EXPIRES_IN  = '1h';

// ─────────────────────────────────────────────
// GRUPO 1: hashPassword
// ─────────────────────────────────────────────
describe('hashPassword()', () => {
  test('debe generar un hash diferente al texto plano', async () => {
    const plain  = 'MiPassword123!';
    const hashed = await authService.hashPassword(plain);
    expect(hashed).not.toBe(plain);
  });

  test('debe generar un hash bcrypt válido (empieza con $2b$)', async () => {
    const hashed = await authService.hashPassword('TestPass');
    expect(hashed).toMatch(/^\$2b\$/);
  });

  test('dos hasheos del mismo texto deben producir hashes distintos', async () => {
    const h1 = await authService.hashPassword('MismaPass');
    const h2 = await authService.hashPassword('MismaPass');
    expect(h1).not.toBe(h2);
  });
});

// ─────────────────────────────────────────────
// GRUPO 2: comparePassword
// ─────────────────────────────────────────────
describe('comparePassword()', () => {
  test('debe retornar true cuando la contraseña coincide con el hash', async () => {
    const plain  = 'ContraseñaCorrecta1!';
    const hashed = await bcrypt.hash(plain, 10);
    const result = await authService.comparePassword(plain, hashed);
    expect(result).toBe(true);
  });

  test('debe retornar false cuando la contraseña NO coincide', async () => {
    const hashed = await bcrypt.hash('PasswordOriginal', 10);
    const result = await authService.comparePassword('PasswordIncorrecta', hashed);
    expect(result).toBe(false);
  });
});

// ─────────────────────────────────────────────
// GRUPO 3: generateToken
// ─────────────────────────────────────────────
describe('generateToken()', () => {
  const payload = { id: 1, email: 'usuario@test.com', rol: 'admin' };

  test('debe retornar un string (token JWT)', () => {
    const token = authService.generateToken(payload);
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3); // header.payload.signature
  });

  test('el token debe contener el payload correcto al decodificarlo', () => {
    const token   = authService.generateToken(payload);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.id).toBe(payload.id);
    expect(decoded.email).toBe(payload.email);
    expect(decoded.rol).toBe(payload.rol);
  });

  test('el token debe tener issuer GA8-App', () => {
    const token   = authService.generateToken(payload);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.iss).toBe('GA8-App');
  });

  test('un token con secret incorrecto debe lanzar error', () => {
    const token = authService.generateToken(payload);
    expect(() => jwt.verify(token, 'wrong_secret')).toThrow();
  });
});