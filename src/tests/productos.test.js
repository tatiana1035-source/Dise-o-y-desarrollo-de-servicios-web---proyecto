const request = require('supertest');
const app = require('../../src/app');

jest.setTimeout(30000);

describe('Módulo Productos', () => {

  test('GET /productos - debe retornar lista de productos', async () => {
    const res = await request(app).get('/productos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /productos/:id - debe retornar un producto existente', async () => {
    const res = await request(app).get('/productos/5');
    expect(res.statusCode).toBe(200);
  });

  test('GET /productos/:id - debe retornar 404 si no existe', async () => {
    const res = await request(app).get('/productos/99999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /productos - debe crear un producto', async () => {
    const res = await request(app)
      .post('/productos')
      .send({
        nombre: 'Producto Test',
        precio: 1000,
        cantidad: 10,
        stock_minimo: 2,
        fecha_registro: '2026-01-01',
        activo: 1,
        codigo_producto: 'TEST010',
        descripcion: 'Producto de prueba',
        id_categoria: 1,
        id_proveedor: 1
      });
    expect(res.statusCode).toBe(201);
  });

  test('PUT /productos/:id - debe actualizar un producto', async () => {
    const res = await request(app)
      .put('/productos/1')
      .send({
        nombre: 'Producto Actualizado',
        precio: 2000,
        cantidad: 20,
        stock_minimo: 5,
        fecha_registro: '2026-01-01',
        activo: 1,
        codigo_producto: 'TEST001',
        descripcion: 'Actualizado',
        id_categoria: 1,
        id_proveedor: 1
      });
    expect(res.statusCode).toBe(200);
  });

});