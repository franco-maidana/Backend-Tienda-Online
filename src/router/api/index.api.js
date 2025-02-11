import { Router } from "express";
import usuarioRouter from "./usuario.router.js";
import productoRouter from "./productos.router.js";
import carritoDeCompras from "./carritoDeCompras.router.js";
import ordenesRouter from "./ordenes.router.js";

const ApiRouter = Router();

ApiRouter.use('/usuario', usuarioRouter);
ApiRouter.use('/producto', productoRouter);
ApiRouter.use('/carrito', carritoDeCompras);
ApiRouter.use('/ordenes', ordenesRouter);


export default ApiRouter;