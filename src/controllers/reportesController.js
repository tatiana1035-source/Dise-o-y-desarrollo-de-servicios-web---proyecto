const db = require('../config/db');

// Reporte de stock bajo
exports.stockBajo = (req, res) => {
  const sql = `SELECT nombre, codigo_producto, cantidad, stock_minimo 
               FROM producto 
               WHERE cantidad <= stock_minimo`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Reporte de productos sin stock
exports.sinStock = (req, res) => {
  const sql = `SELECT nombre, codigo_producto, cantidad 
               FROM producto 
               WHERE cantidad = 0`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Reporte general de inventario
exports.reporteGeneral = (req, res) => {
  const sql = `SELECT 
    COUNT(*) AS total_productos,
    SUM(cantidad) AS total_unidades,
    SUM(precio * cantidad) AS valor_total_inventario,
    SUM(CASE WHEN cantidad <= stock_minimo THEN 1 ELSE 0 END) AS productos_stock_bajo,
    SUM(CASE WHEN cantidad = 0 THEN 1 ELSE 0 END) AS productos_sin_stock
    FROM producto`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

// Reporte de movimientos por fecha
exports.movimientosPorFecha = (req, res) => {
  const { fecha_inicio, fecha_fin } = req.query;
  const sql = `SELECT m.*, p.nombre AS producto 
               FROM movimientos m
               JOIN producto p ON m.id_producto = p.id_producto
               WHERE m.fecha BETWEEN ? AND ?`;
  db.query(sql, [fecha_inicio, fecha_fin], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};