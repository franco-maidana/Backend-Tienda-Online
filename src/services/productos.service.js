import {crearProducto, obtenemosListaProducto, actualizarProducto, borrarProducto, obtenerProductoPorID} from '../data/models/productos.model.js'

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

// obtenemos la lista de productos
export const listar = async (pagina = 1 , limite = 5 ) => {
  const offset = (pagina - 1 ) * limite;
  const {productos, total} = await obtenemosListaProducto(limite, offset);

  const productoSinImagen = productos.map(({imagen, ...productos}) => productos )

  return {
    productos: productoSinImagen,
    paginaActual: pagina,
    totalPAgina: Math.ceil(total / limite),
    totalProdutos: total,
  }
}

// modificar productos
export const modificarProducto = async (id, datos) => {
  if (!datos) {
    throw new Error("❌ Error: Los datos no fueron pasados correctamente.");
  }

  const productoExistente = await actualizarProducto(id, datos);
  if(!productoExistente) throw new Error('El producto no existe ')

  return {message: 'Producto actualizado correctamente'}
}

// borramos un producto
export const eliminandoProducto = async (id) => {
  const producto = await obtenerProductoPorID(id);
  if (!producto) {
        throw new Error("Producto no encontrado");
    }
  
    // 2️⃣ Eliminar el usuario de la base de datos
    const eliminado = await borrarProducto(id);
    if (!eliminado) {
        throw new Error("No se pudo eliminar el Producto");
    }
  
    return { message: "Producto eliminado exitosamente" };
}