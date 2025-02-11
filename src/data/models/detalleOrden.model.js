import Conexion from "../../config/db.js";

// 🔍 Agregar productos a `detalles_orden`
export const agregarDetallesOrden = async (orden_id, producto_id, cantidad, precio) => {
    await Conexion.query(
        `INSERT INTO detalles_orden (orden_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)`,
        [orden_id, producto_id, cantidad, precio]
    );
};

// 🔍 Obtener detalles de una orden con nombre de productos
export const obtenerDetallesOrden = async (orden_id) => {
  const [detalles] = await Conexion.query(
      `SELECT 
          d.orden_id,
          p.nombre AS producto,
          d.cantidad,
          d.precio AS precio_unitario,
          (d.cantidad * d.precio) AS total_producto
      FROM detalles_orden d
      JOIN productos p ON d.producto_id = p.id
      WHERE d.orden_id = ?`,
      [orden_id]
  );

  // 🔍 Obtener el total de la orden
  const [[totalOrden]] = await Conexion.query(
      `SELECT total FROM ordenes WHERE id = ?`,
      [orden_id]
  );

  return { productos: detalles, total_orden: totalOrden.total };
};