import CustomRouter from "../customRouter.js";
import { procesarPago } from "../../controllers/pago.controllers.js";

const pagoRouter = new CustomRouter();

//  Ruta para iniciar el pago con Stripe (requiere autenticación)
pagoRouter.create("/checkout", ['cliente'], procesarPago);

export default pagoRouter.getRouter();
