import Conexion from '../../config/db.js'

// consultas directas a MySQL

// Creamos un nuevo registro
export const crearUsuario = async (nombre, apellido, telefono, direccion, email, password) => {
  const [crear] = await Conexion.query(
    'INSERT INTO usuario (nombre, apellido, telefono, direccion, email, password) VALUES (?,?,?,?,?,?)',
    [nombre, apellido, telefono, direccion, email, password]
  );
  return crear.insertId  // devuelve el id del usuario creado
}


// Buscamos un usuario por el email
export const obtenerUsuarios = async (email) => {
  const [usuarios] = await Conexion.query('SELECT * FROM usuario WHERE email = ?', [email])
  return usuarios.length ? usuarios[0] : null
};