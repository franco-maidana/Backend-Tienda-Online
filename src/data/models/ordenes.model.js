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
    return productos.length > 0 ? productos : [];  // ✅ Evita que sea undefined
};


// 🔥 Guardar productos en detalles_orden después de generar una orden
export const agregarDetallesOrden = async (orden_id, producto_id, cantidad, precio) => {
    const [detalle] = await Conexion.query(
        `INSERT INTO detalles_orden (orden_id, producto_id, cantidad, precio) 
          VALUES (?, ?, ?, ?)`,
        [orden_id, producto_id, cantidad, precio]
    );
    return detalle; // Retorna el ID del detalle insertado
};

// 🔍 Obtener detalles de una orden (productos comprados)
export const obtenerDetallesOrden = async (orden_id) => {
    try {
      const [detalle] = await Conexion.query(
        `SELECT o.id, o.usuario_id, o.estado, o.created_at, 
                d.producto_id, d.cantidad, d.precio
         FROM ordenes o
         JOIN detalles_orden d ON o.id = d.orden_id
         WHERE o.id = ?`, 
        [orden_id]  // Asegúrate de que la variable se pasa correctamente
      );
  
      // console.log("📌 Datos obtenidos de la base de datos:", detalle); // 👀 Verificar en consola
  
      return detalle.length ? { productos: detalle } : null;
    } catch (error) {
      console.error("❌ Error en obtenerDetallesOrden:", error);
      throw new Error("Error al obtener los detalles de la orden");
    }
  };
  

export const obtenerOrdenes = async (usuario_id = null) => {
    let query = `
      SELECT o.id, o.usuario_id, o.total, o.estado, o.created_at,
             d.producto_id, d.cantidad, d.precio
      FROM ordenes o
      JOIN detalles_orden d ON o.id = d.orden_id
    `;
  
    const params = [];
    if (usuario_id) {
      query += " WHERE o.usuario_id = ?";
      params.push(usuario_id);
    }
  
    query += " ORDER BY o.created_at DESC";
  
    const [ordenes] = await Conexion.query(query, params);
    return ordenes;
  };