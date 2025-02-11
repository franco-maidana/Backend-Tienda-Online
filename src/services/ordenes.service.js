import {crearOrden, obtenerProductosDelCarrito} from '../data/models/ordenes.model.js'
import {agregarDetallesOrden, obtenerDetallesOrden} from '../data/models/detalleOrden.model.js'
import {disminuirStock} from '../data/models/productos.model.js'
import {vaciarCarrito} from '../data/models/carrito.model.js'

export const generarOrden = async (usuario_id) => {
  // 🔍 Obtener los productos del carrito
  const productos = await obtenerProductosDelCarrito(usuario_id);

  if (productos.length === 0) {
      throw new Error("❌ No hay productos en el carrito.");
  }

  // 🔥 Calcular total de la compra
  const total = productos.reduce((acc, prod) => acc + (prod.cantidad * prod.precio), 0);

  // 🔥 Crear la orden en la BD
  const orden_id = await crearOrden(usuario_id, total);

  // 🔥 Guardar los productos en `detalles_orden` y descontar stock
  for (const producto of productos) {
      await agregarDetallesOrden(orden_id, producto.producto_id, producto.cantidad, producto.precio);
      await disminuirStock(producto.producto_id, producto.cantidad); // 🔥 Restamos stock
  }

  // 🔥 Vaciar el carrito después de confirmar la compra
  await vaciarCarrito(usuario_id);

  return { message: "✅ Orden creada correctamente.", orden_id, total };
};

export const verDetallesOrden = async (orden_id) => {
  const detalles = await obtenerDetallesOrden(orden_id);

  if (!detalles.productos.length) {
      throw new Error(`❌ No hay productos en la orden ID ${orden_id}.`);
  }

  return detalles;
};