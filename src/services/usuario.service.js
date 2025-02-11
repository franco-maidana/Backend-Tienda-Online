import bcrypt from 'bcrypt'
import {crearUsuario, obtenerUsuarios, obtenemosListaUsuario, actualizarUsuario, borrarUsuario, obtenerUsuariosPorID} from '../data/models/usuario.model.js'


// registramos un nuevo usuario
export const crear = async (nombre, apellido, telefono, direccion, email, password) => {
  try {
    const usuarioExistente = await obtenerUsuarios(email);
    if (usuarioExistente) throw new Error('El email ya está registrado, por favor intente con otro email');

    // Encriptar contraseña
    const passwordEncriptado = bcrypt.hashSync(password, 10);

    // Crear usuario en la base de datos
    const usuarioId = await crearUsuario(nombre, apellido, telefono, direccion, email, passwordEncriptado);
    return { id: usuarioId, nombre, apellido, telefono, direccion, email };

  } catch (error) {
    // Capturar error de duplicado en MySQL
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('El email ya está registrado, intenta con otro.');
    }
    throw error; // Si es otro error, lo lanzamos igual
  }
};


// obtenemos lista de usuario
export const listar = async (pagina = 1, limite = 5) => {
  const offset = (pagina - 1) * limite;
  const {usuarios, total } = await obtenemosListaUsuario(limite, offset);

  // removemos la contraseña andes de devolver la lista de usuario sin modificar la base de datos
  const usuarioSinContraseña = usuarios.map(({password, ...usuarios}) => usuarios)

  return {
    Usuarios: usuarioSinContraseña,
    paginaActual: pagina,
    totalPagina: Math.ceil(total / limite),
    totalUsuario: total,
  };
}

// actualizamos usuario
export const modificarUsuario = async (id, datos) => {

  if (!datos) {
      throw new Error("❌ Error: Los datos no fueron pasados correctamente.");
  }

  const usuarioExistente = await obtenemosListaUsuario(id);
  if (!usuarioExistente) throw new Error("El usuario no existe");

  const actualizado = await actualizarUsuario(id, datos);
  if (!actualizado) throw new Error("No se pudo actualizar el usuario");

  return { message: "Usuario actualizado correctamente" };
};

// 🚀 Lógica para eliminar usuario
export const eliminar = async (id) => {

  // 1️⃣ Verificar si el usuario existe
  const usuario = await obtenerUsuariosPorID(id);
  if (!usuario) {
      throw new Error("Usuario no encontrado");
  }

  // 2️⃣ Eliminar el usuario de la base de datos
  const eliminado = await borrarUsuario(id);
  if (!eliminado) {
      throw new Error("No se pudo eliminar el usuario");
  }

  return { message: "Usuario eliminado exitosamente" };
};
