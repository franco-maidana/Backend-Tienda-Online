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
