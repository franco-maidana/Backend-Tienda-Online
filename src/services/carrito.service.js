import { agregarAlCarrito, obtenerCarrito, actualizarCantidadCarrito, eliminarDelCarrito, vaciarCarrito } from "../data/models/carrito.model.js";

export const agregarProductoAlCarrito = async (usuario_id, producto_id, cantidad) => {
    if (cantidad <= 0) throw new Error("La cantidad debe ser mayor a 0.");
    await agregarAlCarrito(usuario_id, producto_id, cantidad);
    return { message: "✅ Producto agregado al carrito." };
};

export const obtenerCarritoUsuario = async (usuario_id) => {
    const productos = await obtenerCarrito(usuario_id);
    const total = productos.reduce((acc, prod) => acc + parseFloat(prod.total), 0);
    return { productos, total };
};

export const modificarCantidadEnCarrito = async (usuario_id, producto_id, cantidad) => {
    if (cantidad <= 0) throw new Error("La cantidad debe ser mayor a 0.");
    await actualizarCantidadCarrito(usuario_id, producto_id, cantidad);
    return { message: "✅ Cantidad actualizada en el carrito." };
};

export const eliminarProductoDelCarrito = async (usuario_id, producto_id) => {
    await eliminarDelCarrito(usuario_id, producto_id);
    return { message: "✅ Producto eliminado del carrito." };
};

export const vaciarCarritoUsuario = async (usuario_id) => {
  await vaciarCarrito(usuario_id);
  return { message: "✅ Carrito vaciado correctamente." };
};