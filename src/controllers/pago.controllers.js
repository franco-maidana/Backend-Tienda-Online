import { iniciarPago } from "../services/pago.service.js";
import Conexion from "../config/db.js";
import dotenv from 'dotenv'

dotenv.config();

export const procesarPago = async (req, res) => {
    try {
    const { orden_id } = req.body;
    const pago = await iniciarPago(orden_id);
    res.json(pago);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
};
