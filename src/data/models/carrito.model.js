import Conexion from "../../config/db.js";

// 🔥 Agregar un producto al carrito o actualizar cantidad si ya existe
export const agregarAlCarrito = async (usuario_id, producto_id, cantidad) => {
    // Consultar el producto incluyendo el descuento
    const [producto] = await Conexion.query(
        `SELECT stock, precio, descuento FROM productos WHERE id = ?`,
        [producto_id]
    );
    if (!producto.length) {
        throw new Error(`❌ El producto con ID ${producto_id} no existe.`);
    }
    if (producto[0].stock < cantidad) {
        throw new Error(`❌ No hay suficiente stock disponible.`);
    }

    const precioOriginal = parseFloat(producto[0].precio);
    const descuento = parseFloat(producto[0].descuento) || 0;
    const precioFinal = descuento > 0 
      ? precioOriginal - (precioOriginal * (descuento / 100)) 
      : precioOriginal;

    // Verificar si el producto ya está en el carrito
    const [existe] = await Conexion.query(
        `SELECT * FROM carrito WHERE usuario_id = ? AND producto_id = ?`,
        [usuario_id, producto_id]
    );

    if (existe.length) {
        // Si ya existe, actualizamos la cantidad
        await Conexion.query(
            `UPDATE carrito SET cantidad = cantidad + ? WHERE usuario_id = ? AND producto_id = ?`,
            [cantidad, usuario_id, producto_id]
        );
    } else {
        // Si no existe, lo agregamos con el precio ya descontado
        await Conexion.query(
            `INSERT INTO carrito (usuario_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)`,
            [usuario_id, producto_id, cantidad, precioFinal]
        );
    }
};
;

// 🔍 Obtener productos del carrito de un usuario con el total y la imagen
export const obtenerCarrito = async (usuario_id) => {
    const [productos] = await Conexion.query(
        `SELECT c.id, c.producto_id, c.cantidad, p.nombre, p.precio, p.imagen, 
        (c.cantidad * c.precio) AS total 
        FROM carrito c 
        JOIN productos p ON c.producto_id = p.id
        WHERE c.usuario_id = ?`,
        [usuario_id]
    );
    return productos;
};




// ✏️ Actualizar la cantidad de un producto en el carrito
export const actualizarCantidadCarrito = async (usuario_id, producto_id, cantidad) => {
    const [producto] = await Conexion.query(
        `SELECT stock FROM productos WHERE id = ?`,
        [producto_id]
    );

    if (!producto.length) {
        throw new Error(`❌ El producto con ID ${producto_id} no existe.`);
    }

    if (producto[0].stock < cantidad) {
        throw new Error(`❌ No hay suficiente stock disponible.`);
    }

    await Conexion.query(
        `UPDATE carrito SET cantidad = ? WHERE usuario_id = ? AND producto_id = ?`,
        [cantidad, usuario_id, producto_id]
    );
};

// ❌ Eliminar un producto del carrito
export const eliminarDelCarrito = async (usuario_id, producto_id) => {
    await Conexion.query(
        `DELETE FROM carrito WHERE usuario_id = ? AND producto_id = ?`,
        [usuario_id, producto_id]
    );
};


// 🗑 Vaciar el carrito de un usuario
export const vaciarCarrito = async (usuario_id) => {
  // 🔍 Verificar si el carrito tiene productos antes de vaciarlo
  const [productos] = await Conexion.query(
      `SELECT * FROM carrito WHERE usuario_id = ?`,
      [usuario_id]
  );

  if (!productos.length) {
      throw new Error(`❌ El carrito del usuario ID ${usuario_id} ya está vacío.`);
  }

  // 🔥 Eliminar todos los productos del carrito del usuario
  await Conexion.query(`DELETE FROM carrito WHERE usuario_id = ?`, [usuario_id]);
};
