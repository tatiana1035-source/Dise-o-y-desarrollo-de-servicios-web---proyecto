// Importamos la conexión a MySQL que ya tienes configurada en tu proyecto
const db = require('../config/db'); 

const UserRepository = {
  /**
   * Busca un usuario por su correo electrónico
   * @param {string} email 
   * @returns {Promise<Object|null>}
   */
  findByEmail: async (email) => {
    // Nota: Asegúrate de que tu tabla se llame 'usuarios' (o cámbialo por el nombre real)
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Crea e inserta un nuevo usuario en la base de datos
   * @param {Object} userData 
   * @returns {Promise<Object>}
   */
  create: async (userData) => {
    const { username, email, password, role } = userData;
    
    // Ejecuta la inserción en la base de datos
    const [result] = await db.query(
      'INSERT INTO usuarios (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, password, role || 'usuario']
    );

    // Retorna el usuario creado sin la contraseña por seguridad
    return {
      id: result.insertId,
      username,
      email,
      role: role || 'usuario'
    };
  }
};

module.exports = UserRepository;
