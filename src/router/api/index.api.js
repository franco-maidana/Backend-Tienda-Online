import { Router } from "express";
import usuarioRouter from "./usuario.router.js";

const ApiRouter = Router();

ApiRouter.use('/usuario', usuarioRouter)

export default ApiRouter;