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

// Buscamos la lista de los usuarios
export const obtenemosListaUsuario = async (limite = 10, offset = 0) => {
  limite = parseInt(limite) || 10;  // Si no es un número, asignar 10 por defecto
  offset = parseInt(offset) || 0;   // Si no es un número, asignar 0 por defecto

  const [usuarios] = await Conexion.query(
    `SELECT * FROM usuario LIMIT ? OFFSET ?`,
    [limite, offset]
  );

  const [[{ total }]] = await Conexion.query(`SELECT COUNT(*) AS total FROM usuario`);

  return { usuarios, total };
};

// modificamos un usuario
export const actualizarUsuario = async (id, datos) => {

  if (!datos) {
      throw new Error("❌ Error: No se recibieron datos en el modelo.");
  }

  const campos = [];
  const valores = [];

  if (datos.nombre) {
      campos.push("nombre = ?");
      valores.push(datos.nombre);
  }
  if (datos.apellido) {
      campos.push("apellido = ?");
      valores.push(datos.apellido);
  }
  if (datos.telefono) {
      campos.push("telefono = ?");
      valores.push(datos.telefono);
  }
  if (datos.direccion) {
      campos.push("direccion = ?");
      valores.push(datos.direccion);
  }

  if (campos.length === 0) {
      throw new Error("No hay datos para actualizar");
  }

  campos.push("updated_at = NOW()");
  valores.push(id);

  const consulta = `UPDATE usuario SET ${campos.join(", ")} WHERE id = ?`;

  const [result] = await Conexion.query(consulta, valores);
  return result.affectedRows > 0;
};

