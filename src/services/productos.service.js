import {crearProducto} from '../data/models/productos.model.js'

// logica para crear un producto


export const registrarProducto = async (datos, file) => {
  // 🔹 Validaciones básicas
  const { nombre, descripcion, marca, categoria, precio, stock, descuento, estado } = datos;
  
  if (!nombre || !marca || !categoria || precio === undefined || stock === undefined) {
      throw new Error("Todos los campos obligatorios deben completarse.");
  }
  if (precio < 0 || stock < 0 || descuento < 0 || descuento > 100) {
      throw new Error("Valores inválidos para precio, stock o descuento.");
  }

  // 📂 Obtener la ruta de la imagen
  const imagen = file ? `/uploads/${file.filename}` : null;

  // 🔥 Insertar producto en la base de datos
  const productoId = await crearProducto({ nombre, descripcion, marca, categoria, precio, stock, descuento, imagen, estado });

  return { id: productoId, nombre, descripcion, marca, categoria, precio, stock, descuento, imagen, estado };
};
