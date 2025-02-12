import {stripe} from '../utils/stripe.js'
import { obtenerDetallesOrden } from "../data/models/detalleOrden.model.js";

export const iniciarPago = async (orden_id) => {
    // 🔍 Obtener detalles de la orden
    const detalles = await obtenerDetallesOrden(orden_id);

    if (!detalles.productos.length) {
        throw new Error(`❌ No hay productos en la orden ID ${orden_id}.`);
    }

    // 🔥 Crear los productos para Stripe Checkout
    const line_items = detalles.productos.map((producto) => ({
        price_data: {
            currency: "usd",
            product_data: {
            name: producto.producto,
            },
            unit_amount: Math.round(producto.precio_unitario * 100), // Convertir a centavos
        },
        quantity: producto.cantidad,
    }));

    // 🔥 Crear una sesión de pago en Stripe
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `http://localhost:5173/success?orden_id=${orden_id}`, // URL de éxito
        cancel_url: `http://localhost:5173/cancel?orden_id=${orden_id}`, // URL de cancelación
    });

    return { url: session.url };
};
