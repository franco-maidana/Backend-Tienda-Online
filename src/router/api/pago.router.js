import express from "express";
import { procesarPago } from "../../controllers/pago.controllers.js";

const pagoRouter = express.Router();

// 🔥 Ruta para iniciar el pago con Stripe
pagoRouter.post("/checkout", procesarPago);



export default pagoRouter;
