import Conexion from "../../config/db.js";

// 🔥 Crear una nueva orden de compra → Inserta una nueva orden en la tabla ordenes.
export const crearOrden = async (usuario_id, total) => {
    const [orden] = await Conexion.query(
        `INSERT INTO ordenes (usuario_id, total, estado) VALUES (?, ?, 'pendiente')`,
        [usuario_id, total]
    );
    return orden.insertId; // 🔥 Retorna el ID de la orden creada
};

// 🔍 Obtener los productos del carrito de un usuario -> Obtiene los productos del carrito antes de generar la orden.
export const obtenerProductosDelCarrito = async (usuario_id) => {
    const [productos] = await Conexion.query(
        `SELECT c.producto_id, c.cantidad, c.precio 
          FROM carrito c 
          WHERE c.usuario_id = ?`,
        [usuario_id]
    );
    return productos;
};
