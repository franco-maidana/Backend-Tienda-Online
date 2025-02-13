import CustomRouter from "../customRouter.js";
import { registro, Listar, actualizarDatosUsuario, eliminarUsuario } from "../../controllers/usuarios.controllers.js";
import { forgotPassword, resetPassword } from "../../controllers/auth.controllers.js";
import { validatorRegistro } from "../../validations/usuarioValidations.js";
import manejodeErrores from "../../middlewares/validation.mid.js";

const usuarioRouter = new CustomRouter();

usuarioRouter.create("/crear", ['public'], ...validatorRegistro, manejodeErrores, registro);
usuarioRouter.listar("/listado", ['admin'], Listar);
usuarioRouter.modificar("/upDate/:id", ['admin', 'cliente'], actualizarDatosUsuario);
usuarioRouter.create("/forgot-password", ['public'], forgotPassword);
usuarioRouter.create("/reset-password", ['public'], resetPassword);
usuarioRouter.eliminar('/destroy/:id', ['admin'], eliminarUsuario);

export default usuarioRouter.getRouter();
