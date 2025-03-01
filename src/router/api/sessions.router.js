import CustomRouter from "../customRouter.js";
import { login, logout, sessionActiva } from "../../controllers/auth.controllers.js";

const sessionsRouter = new CustomRouter();

//  Ruta para iniciar sesión (pública)
sessionsRouter.create("/login", ['public'], login);

//  Ruta para cerrar sesión (requiere estar autenticado)
sessionsRouter.create("/logout", ['admin', 'cliente'], logout);

sessionsRouter.listar('/usuario', ['admin', 'cliente'], sessionActiva);

export default sessionsRouter.getRouter();
