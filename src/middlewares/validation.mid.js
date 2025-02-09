import { validationResult } from 'express-validator';

const manejodeErrores = (req, res, next) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next(); // 🔥 Si no hay errores, permite continuar con el siguiente middleware o controlador.
  } catch (error) {
    next(error); // 🔥 Pasar errores a Express para que los maneje.
  }
};

export default manejodeErrores;
