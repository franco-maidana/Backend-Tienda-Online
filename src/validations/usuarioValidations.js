import { body } from 'express-validator';

export const validatorRegistro = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({min: 3}).withMessage('El nombre debe de tener al menos 3 caracteres'),

  body('email')
    .isEmail().withMessage('Debe ser un email valido'),

  body('password')
    .isLength({min: 8}).withMessage('La contraseña debe de tener al menos 8 caracteres')

]