import CustomRouter from "../customRouter.js";
import { login, logout } from "../../controllers/auth.controllers.js";

const sessionsRouter = new CustomRouter();

//  Ruta para iniciar sesión (pública)
sessionsRouter.create("/login", ['public'], login);

//  Ruta para cerrar sesión (requiere estar autenticado)
sessionsRouter.create("/logout", ['admin', 'cliente'], logout);

export default sessionsRouter.getRouter();
