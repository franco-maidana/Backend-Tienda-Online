import { Router } from "express";
import usuarioRouter from "./usuario.router.js";
import productoRouter from "./productos.router.js";

const ApiRouter = Router();

ApiRouter.use('/usuario', usuarioRouter);
ApiRouter.use('/producto', productoRouter);

export default ApiRouter;