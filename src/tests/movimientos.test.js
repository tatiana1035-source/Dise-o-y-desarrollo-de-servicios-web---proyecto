const request = require('supertest');
const app = require('../../src/app');

jest.setTimeout(30000);

describe('Módulo Movimientos', () => {

  test('GET /movimientos - debe retornar lista de movimientos', async () => {
    const res = await request(app).get('/movimientos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /movimientos/:id - debe retornar un movimiento existente', async () => {
    const res = await request(app).get('/movimientos/3');
    expect(res.statusCode).toBe(200);
  });

  test('GET /movimientos/:id - debe retornar 404 si no existe', async () => {
    const res = await request(app).get('/movimientos/99999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /movimientos - debe crear un movimiento', async () => {
    const res = await request(app)
      .post('/movimientos')
      .send({
        id_producto: 5,
        id_almacen: 1,
        tipo: 'entrada',
        cantidad: 10,
        fecha: '2026-01-01',
        id_usuario: 1
      });
    expect(res.statusCode).toBe(201);
  });

  test('PUT /movimientos/:id - debe actualizar un movimiento', async () => {
    const res = await request(app)
      .put('/movimientos/3')
      .send({
        id_producto: 5,
        id_almacen: 1,
        tipo: 'salida',
        cantidad: 5,
        fecha: '2026-01-01',
        id_usuario: 1
      });
    expect(res.statusCode).toBe(200);
  });

});