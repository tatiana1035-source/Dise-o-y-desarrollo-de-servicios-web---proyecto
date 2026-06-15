const db = require('../config/db');

// Buscar producto por código de barras o QR
exports.buscarPorCodigo = async (req, res) => {
  const sql = `SELECT p.*, c.nombre AS categoria, pr.nombre AS proveedor 
               FROM producto p
               LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
               LEFT JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor
               WHERE p.codigo_producto = ?`;
  try {
    const [results] = await db.query(sql, [req.params.codigo]);
    if (!results.length) return res.status(404).json({ message: 'Producto no encontrado con ese código' });
    res.json(results[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Actualizar cantidad por código de barras
exports.actualizarCantidadPorCodigo = async (req, res) => {
  const { cantidad, tipo } = req.body;
  const operacion = tipo === 'entrada' ? '+' : '-';
  try {
    const [result] = await db.query(
      `UPDATE producto SET cantidad = cantidad ${operacion} ? WHERE codigo_producto = ?`,
      [cantidad, req.params.codigo]
    );
    if (!result.affectedRows) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: `Cantidad actualizada correctamente (${tipo})` });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Listar todos los códigos
exports.listarCodigos = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM codigos');
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Crear código
exports.crearCodigo = async (req, res) => {
  const { id_producto, codigo, tipo } = req.body;
  const fecha_registro = new Date();
  try {
    const [result] = await db.query(
      'INSERT INTO codigos (id_producto, codigo, tipo, fecha_registro) VALUES (?, ?, ?, ?)',
      [id_producto, codigo, tipo, fecha_registro]
    );
    res.status(201).json({ id_codigo: result.insertId, id_producto, codigo, tipo });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Eliminar códigp
exports.eliminarCodigo = async (req, res) => {
  try {
    await db.query('DELETE FROM codigos WHERE id_codigo = ?', [req.params.id]);
    res.json({ message: 'Código eliminado correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};