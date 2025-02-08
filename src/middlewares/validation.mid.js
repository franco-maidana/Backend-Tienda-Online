import {validationResult} from 'express-validator'

const manejodeErrores = (req, res, next) => {
  try {
    const errores = validationResult(req)
    if(!errores.isEmpty()){
      return res.status(400).json({errores: errores.array()})
    }
  } catch (error) {
    return next(error)
  }
}

export default manejodeErrores