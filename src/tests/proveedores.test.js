const request = require('supertest');
const app = require('../../src/app');

jest.setTimeout(30000);

describe('Módulo Proveedores', () => {

  test('GET /proveedores - debe retornar lista de proveedores', async () => {
    const res = await request(app).get('/proveedores');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /proveedores/:id - debe retornar un proveedor existente', async () => {
    const res = await request(app).get('/proveedores/1');
    expect(res.statusCode).toBe(200);
  });

  test('GET /proveedores/:id - debe retornar 404 si no existe', async () => {
    const res = await request(app).get('/proveedores/99999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /proveedores - debe crear un proveedor', async () => {
    const res = await request(app)
      .post('/proveedores')
      .send({
        nombre: 'Proveedor Test',
        contacto: 'Contacto Test',
        telefono: '3001234567',
        correo: 'proveedor_jest@correo.com'
      });
    expect(res.statusCode).toBe(201);
  });

  test('PUT /proveedores/:id - debe actualizar un proveedor', async () => {
    const res = await request(app)
      .put('/proveedores/1')
      .send({
        nombre: 'Proveedor Actualizado',
        contacto: 'Contacto Actualizado',
        telefono: '3009999999',
        correo: 'actualizado@correo.com'
      });
    expect(res.statusCode).toBe(200);
  });

});