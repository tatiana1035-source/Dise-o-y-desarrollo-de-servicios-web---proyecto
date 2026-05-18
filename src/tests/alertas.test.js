const request = require('supertest');
const app = require('../../src/app');

jest.setTimeout(30000);

describe('Módulo Alertas', () => {

  test('GET /alertas - debe retornar lista de alertas', async () => {
    const res = await request(app).get('/alertas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /alertas/pendientes - debe retornar alertas pendientes', async () => {
    const res = await request(app).get('/alertas/pendientes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /alertas/:id - debe retornar una alerta existente', async () => {
    const res = await request(app).get('/alertas/1');
    expect(res.statusCode).toBe(200);
  });

  test('GET /alertas/:id - debe retornar 404 si no existe', async () => {
    const res = await request(app).get('/alertas/99999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /alertas - debe crear una alerta', async () => {
    const res = await request(app)
      .post('/alertas')
      .send({
        id_producto: 5,
        tipo: 'stock_bajo',
        mensaje: 'Alerta de prueba Jest',
        estado: 'pendiente'
      });
    expect(res.statusCode).toBe(201);
  });

  test('PUT /alertas/:id - debe actualizar una alerta', async () => {
    const res = await request(app)
      .put('/alertas/1')
      .send({
        id_producto: 5,
        tipo: 'stock_bajo',
        mensaje: 'Alerta actualizada',
        estado: 'revisada'
      });
    expect(res.statusCode).toBe(200);
  });

});