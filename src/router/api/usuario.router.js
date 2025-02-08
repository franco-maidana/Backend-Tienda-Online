import { Router } from "express";
import {registro} from '../../controllers/usuarios.controllers.js'
import {validatorRegistro} from '../../validations/usuarioValidations.js'
import manejodeErrores from "../../middlewares/validation.mid.js";

const usuarioRouter = Router();

usuarioRouter.post('/crear', validatorRegistro, manejodeErrores, registro)

export default usuarioRouter;