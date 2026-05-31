// Importamos la conexión a MySQL
const db = require('../config/db'); 

const UserRepository = {
  
// Buscar un usuario por su correo electrónico
  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
  },

  // Crea e inserta un nuevo usuario en la BD
    create: async (userData) => {
    const { username, email, password, role } = userData;
    
    // Insertar en la base de datos
    const [result] = await db.query(
      'INSERT INTO usuarios (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, password, role || 'usuario']
    );

    // Devolver el usuario sin la contraseña
    return {
      id: result.insertId,
      username,
      email,
      role: role || 'usuario'
    };
  }
};

module.exports = UserRepository;
