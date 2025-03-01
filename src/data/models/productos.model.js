import Conexion from "../../config/db.js";

// 🔥 Crear un nuevo producto con imagen
export const crearProducto = async ({ nombre, descripcion, marca, categoria, precio, stock, descuento, imagen, estado }) => {
    const [result] = await Conexion.query(
        `INSERT INTO productos (nombre, descripcion, marca, categoria, precio, stock, descuento, imagen, estado) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nombre, descripcion, marca, categoria, precio, stock, descuento, imagen, estado]
    );

    return result.insertId; // 🔥 Devuelve el ID del producto recién creado
};

// Buscamos la lista de los usuarios
export const obtenemosListaProducto = async (limite, offset, categoria) => {
  try {
    // 📌 Convertir valores a enteros puros antes de la consulta
    const limiteInt = Number.isNaN(parseInt(limite, 10)) ? 10 : parseInt(limite, 10);
    const offsetInt = Number.isNaN(parseInt(offset, 10)) ? 0 : parseInt(offset, 10);

    let query = "SELECT * FROM productos";
    let queryParams = [];

    if (categoria) {
      query += " WHERE categoria = ?";
      queryParams.push(categoria);
    }

    query += ` LIMIT ${limiteInt} OFFSET ${offsetInt}`; // ⚠️ Concatenamos los valores directamente

    // console.log("📌 SQL Ejecutado:", query);
    // console.log("📌 Parámetros:", queryParams);

    // 📌 Ejecutamos la consulta sin pasar `LIMIT` y `OFFSET` como parámetros
    const [productos] = await Conexion.execute(query, queryParams);

    // 📌 Contamos el total de productos sin paginación
    let totalQuery = "SELECT COUNT(*) AS total FROM productos";
    let totalParams = [];

    if (categoria) {
      totalQuery += " WHERE categoria = ?";
      totalParams.push(categoria);
    }

    const [totalResult] = await Conexion.execute(totalQuery, totalParams);
    const total = totalResult[0].total;

    return { productos, total };
  } catch (error) {
    console.error("❌ Error en obtenemosListaProducto:", error.message);
    throw new Error("Error al obtener productos");
  }
};

// modificar productos
export const actualizarProducto = async (id, datos) => {

  if (!datos || Object.keys(datos).length === 0) {
    throw new Error("❌ Error: No se recibieron datos en el modelo.");
  }

  const campos = [];
  const values = [];

  if (datos.nombre !== undefined) { campos.push("nombre = ?"); values.push(datos.nombre); }
  if (datos.descripcion !== undefined) { campos.push("descripcion = ?"); values.push(datos.descripcion); }
  if (datos.marca !== undefined) { campos.push("marca = ?"); values.push(datos.marca); }
  if (datos.categoria !== undefined) { campos.push("categoria = ?"); values.push(datos.categoria); }
  if (datos.precio !== undefined) { campos.push("precio = ?"); values.push(datos.precio); }
  if (datos.stock !== undefined) { campos.push("stock = ?"); values.push(datos.stock); }
  if (datos.descuento !== undefined) { campos.push("descuento = ?"); values.push(datos.descuento); }
  
  if (campos.length === 0) {
    throw new Error("❌ Error: No hay datos válidos para actualizar.");
  }

  campos.push("updated_at = NOW()");
  values.push(id);

  const consulta = `UPDATE productos SET ${campos.join(", ")} WHERE id = ?`;

  const [result] = await Conexion.query(consulta, values);
  return result.affectedRows > 0;
};

// eliminamos un usuario por su id 
export const obtenerProductoPorID = async (id) => {
  const [producto] = await Conexion.query(
    'SELECT * FROM productos WHERE id = ?',
    [id]
  );
  return producto.length ? producto[0] : null
}

// borrar un producto
export const borrarProducto = async (id) => {
  const [resultado] = await Conexion.query(
    'DELETE FROM productos WHERE id = ?',
    [id]
  );
  return resultado.affectedRows > 0 
}

// 🔥 Disminuir stock después de la compra
export const disminuirStock = async (producto_id, cantidad) => {
  await Conexion.query(
      `UPDATE productos SET stock = stock - ? WHERE id = ?`,
      [cantidad, producto_id]
  );
};
