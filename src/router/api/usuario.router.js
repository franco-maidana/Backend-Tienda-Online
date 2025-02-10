import { Router } from "express";
import { registro, Listar, actualizarDatosUsuario } from "../../controllers/usuarios.controllers.js";
import { forgotPassword, resetPassword } from "../../controllers/auth.controllers.js"; // 🔥 Agregar resetPassword
import { validatorRegistro } from "../../validations/usuarioValidations.js";
import manejodeErrores from "../../middlewares/validation.mid.js";

const usuarioRouter = Router();

usuarioRouter.post("/crear", validatorRegistro, manejodeErrores, registro);
usuarioRouter.get("/listado", Listar);
usuarioRouter.put("/upDate/:id", actualizarDatosUsuario);
usuarioRouter.post("/forgot-password", forgotPassword);
usuarioRouter.post("/reset-password", resetPassword); // 🔥 Agregar esta ruta

export default usuarioRouter;
