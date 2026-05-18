const request = require('supertest');
const app = require('../../src/app');

jest.setTimeout(30000);

describe('Módulo Escáner Código de Barras', () => {

  test('GET /codigos/PRD001 - debe retornar producto por código', async () => {
    const res = await request(app).get('/codigos/PRD001');
    expect(res.statusCode).toBe(200);
  });

  test('GET /codigos/:codigo - debe retornar 404 si el código no existe', async () => {
    const res = await request(app).get('/codigos/NOEXISTE999');
    expect(res.statusCode).toBe(404);
  });

  test('PATCH /codigos/PRD001/cantidad - debe actualizar cantidad por código', async () => {
    const res = await request(app)
      .patch('/codigos/PRD001/cantidad')
      .send({
        cantidad: 50
      });
    expect(res.statusCode).toBe(200);
  });

});