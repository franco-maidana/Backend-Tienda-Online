import {crear} from '../services/usuario.service.js'

export const registro = async (req, res, next ) => {
  try {
    const {nombre, apellido, telefono, direccion, email, password} = req.body
    const usuario = await crear(nombre, apellido, telefono, direccion, email, password);
    res.status(201).json({
      message: 'Usuario registrado con exito',
      usuario
    })
  } catch (error) {
    return next(error)
  }
}