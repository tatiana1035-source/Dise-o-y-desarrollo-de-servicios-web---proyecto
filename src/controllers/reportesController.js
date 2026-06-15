const db = require('../config/db');

// Reporte de stock bajo
exports.stockBajo = async (req, res) => {
  try {
    const [results] = await db.query('SELECT nombre, codigo_producto, cantidad, stock_minimo FROM producto WHERE cantidad <= stock_minimo');
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Reporte de productos sin stock
exports.sinStock = async (req, res) => {
  try {
    const [results] = await db.query('SELECT nombre, codigo_producto, cantidad FROM producto WHERE cantidad = 0');
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Reporte general de inventario
exports.reporteGeneral = async (req, res) => {
  const sql = `SELECT 
    COUNT(*) AS total_productos,
    SUM(cantidad) AS total_unidades,
    SUM(precio * cantidad) AS valor_total_inventario,
    SUM(CASE WHEN cantidad <= stock_minimo THEN 1 ELSE 0 END) AS productos_stock_bajo,
    SUM(CASE WHEN cantidad = 0 THEN 1 ELSE 0 END) AS productos_sin_stock
    FROM producto`;
  try {
    const [results] = await db.query(sql);
    res.json(results[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Reporte de movimientos por fecha
exports.movimientosPorFecha = async (req, res) => {
  const { fecha_inicio, fecha_fin } = req.query;
  try {
    const [results] = await db.query(
      'SELECT m.*, p.nombre AS producto FROM movimientos m JOIN producto p ON m.id_producto = p.id_producto WHERE m.fecha BETWEEN ? AND ?',
      [fecha_inicio, fecha_fin]
    );
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
};