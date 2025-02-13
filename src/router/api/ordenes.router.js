import CustomRouter from "../customRouter.js";
import { confirmarCompra, obtenerDetalleOrden } from "../../controllers/ordenes.controllers.js";

const ordenesRouter = new CustomRouter();

//  Crear una nueva orden (requiere autenticación como cliente)
ordenesRouter.create('/create', ['cliente'], confirmarCompra);
//  Obtener el detalle de una orden (clientes y admins pueden ver sus órdenes)
ordenesRouter.listar('/:orden_id', ['cliente', 'admin'], obtenerDetalleOrden);

export default ordenesRouter.getRouter();
