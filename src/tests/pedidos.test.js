const request = require('supertest');
const app = require('../../src/app');

jest.setTimeout(30000);

describe('Módulo Pedidos', () => {

  test('GET /pedidos - debe retornar lista de pedidos', async () => {
    const res = await request(app).get('/pedidos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /pedidos/:id - debe retornar un pedido existente', async () => {
    const res = await request(app).get('/pedidos/1');
    expect(res.statusCode).toBe(200);
  });

  test('GET /pedidos/:id - debe retornar 404 si no existe', async () => {
    const res = await request(app).get('/pedidos/99999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /pedidos - debe crear un pedido', async () => {
    const res = await request(app)
      .post('/pedidos')
      .send({
        id_proveedor: 1,
        estado: 'pendiente',
        total: 150000
      });
    expect(res.statusCode).toBe(201);
  });

  test('PUT /pedidos/:id - debe actualizar un pedido', async () => {
    const res = await request(app)
      .put('/pedidos/1')
      .send({
        id_proveedor: 1,
        estado: 'entregado',
        total: 200000
      });
    expect(res.statusCode).toBe(200);
  });

  test('GET /pedidos/proveedor/:id - debe retornar pedidos por proveedor', async () => {
    const res = await request(app).get('/pedidos/proveedor/1');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});