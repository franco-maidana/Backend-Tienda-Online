import bcrypt from 'bcrypt'
import {crearUsuario, obtenerUsuarios} from '../data/models/usuario.model.js'


// registramos un nuevo usuario
export const crear = async (nombre, apellido, telefono, direccion, email, password) => {
  const usuarioExistente = await obtenerUsuarios(email);
  if(usuarioExistente) throw new Error('El email ya esta registrado')

  // encriptamos password
  const passwordEncriptado = bcrypt.hashSync(password, 10);

  const usuarioId = await crearUsuario(nombre, apellido, telefono, direccion, email, passwordEncriptado);
  return {id: usuarioId, nombre, apellido, telefono, direccion, email,}
}