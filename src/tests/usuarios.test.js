const request = require('supertest');
const app = require('../../src/app');

jest.setTimeout(30000);

describe('Módulo Usuarios', () => {

  test('GET /usuarios - debe retornar lista de usuarios', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /usuarios/:id - debe retornar un usuario existente', async () => {
    const res = await request(app).get('/usuarios/1');
    expect(res.statusCode).toBe(200);
  });

  test('GET /usuarios/:id - debe retornar 404 si no existe', async () => {
    const res = await request(app).get('/usuarios/99999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /usuarios - debe crear un usuario', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({
        nombre: 'Usuario Test',
        correo: 'test_jest89@correo.com',
        rol: 'auxiliar',
        clave: 'Test1234*'
      });
    expect(res.statusCode).toBe(201);
  });

  test('PUT /usuarios/:id - debe actualizar un usuario', async () => {
    const res = await request(app)
      .put('/usuarios/1')
      .send({
        nombre: 'Usuario Actualizado',
        correo: 'actualizado@correo.com',
        rol: 'lider',
        clave: 'Test1234*'
      });
    expect(res.statusCode).toBe(200);
  });

});