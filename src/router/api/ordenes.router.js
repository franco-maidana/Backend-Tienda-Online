import { Router } from "express";
import { confirmarCompra, obtenerDetalleOrden } from "../../controllers/ordenes.controllers.js";

const ordenesRouter = Router();

ordenesRouter.post('/create', confirmarCompra);
ordenesRouter.get('/:orden_id', obtenerDetalleOrden);

export default ordenesRouter