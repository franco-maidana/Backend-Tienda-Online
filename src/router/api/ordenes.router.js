import CustomRouter from "../customRouter.js";
import { confirmarCompra, obtenerDetalleOrden, listarOrdenesUsuario } from "../../controllers/ordenes.controllers.js";

const ordenesRouter = new CustomRouter();

// Primero, la ruta específica para listar las órdenes del usuario:
ordenesRouter.listar('/mis-ordenes', ['cliente', 'admin'], listarOrdenesUsuario);

// Luego, la ruta dinámica para obtener el detalle de una orden específica:
ordenesRouter.listar('/:orden_id', ['cliente', 'admin'], obtenerDetalleOrden);

// Y finalmente, la ruta para crear una orden:
ordenesRouter.create('/create', ['cliente'], confirmarCompra);

export default ordenesRouter.getRouter();
