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
  console.log("📌 Buscando usuario con email:", email); // 🔥 Depuración

  if (!email || typeof email !== 'string') {
      throw new Error("❌ Error: Email inválido en la consulta SQL");
  }

  const [usuarios] = await Conexion.query(
      `SELECT * FROM usuario WHERE email = ?`,
      [email]
  );

  return usuarios.length ? usuarios[0] : null;
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

// guardar el token recuperado
export const guardarTokenReset = async (id, token) => {
  const [result] = await Conexion.query(
      `UPDATE usuario SET reset_token = ?, reset_expira = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE id = ?`,
      [token, id]
  );

  return result.affectedRows > 0;
};


// Obtener usuario por token
export const obtenerUsuarioPorToken = async (token) => {
  console.log("📌 Buscando usuario con token:", token); // 🔥 Depuración

  const [usuarios] = await Conexion.query(
      `SELECT * FROM usuario WHERE reset_token = ? AND reset_expira > NOW()`,
      [token]
  );

  console.log("📌 Resultado de la consulta:", usuarios); // 🔥 Depuración

  return usuarios.length ? usuarios[0] : null;
};



// Eliminar el token después de usarlo
export const eliminarTokenReset = async (id) => {
  await Conexion.query(
      `UPDATE usuario SET reset_token = NULL, reset_expira = NULL WHERE id = ?`,
      [id]
  );
};

// actualizamos password
export const actualizarPassword = async (id, passwordEncriptado) => {
  console.log("📌 Intentando actualizar contraseña para el usuario ID:", id); // 🔥 Depuración

  const [result] = await Conexion.query(
      `UPDATE usuario SET password = ?, reset_token = NULL, reset_expira = NULL, updated_at = NOW() WHERE id = ?`,
      [passwordEncriptado, id]
  );

  console.log("📌 Resultado de la actualización:", result); // 🔥 Depuración

  return result.affectedRows > 0;
};
