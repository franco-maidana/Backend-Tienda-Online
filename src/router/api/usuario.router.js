import { Router } from "express";
import {registro, Listar, actualizarDatosUsuario} from '../../controllers/usuarios.controllers.js'
import {validatorRegistro} from '../../validations/usuarioValidations.js'
import manejodeErrores from "../../middlewares/validation.mid.js";

const usuarioRouter = Router();

usuarioRouter.post('/crear', validatorRegistro, manejodeErrores, registro)
usuarioRouter.get('/listado', Listar)
usuarioRouter.put('/upDate/:id', actualizarDatosUsuario)

export default usuarioRouter;