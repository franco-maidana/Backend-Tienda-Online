import { agregarProductoAlCarrito, obtenerCarritoUsuario, modificarCantidadEnCarrito, eliminarProductoDelCarrito, vaciarCarritoUsuario } from "../services/carrito.service.js";

export const agregarAlCarritoController = async (req, res) => {
    try {
        const { usuario_id, producto_id, cantidad } = req.body;
        const respuesta = await agregarProductoAlCarrito(usuario_id, producto_id, cantidad);
        res.json(respuesta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const verCarritoController = async (req, res) => {
    try {
        const { usuario_id } = req.params;
        const carrito = await obtenerCarritoUsuario(usuario_id);
        res.json(carrito);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const modificarCantidadController = async (req, res) => {
  try {
      const { usuario_id, producto_id, cantidad } = req.body;

      const respuesta = await modificarCantidadEnCarrito(usuario_id, producto_id, cantidad);
      res.json(respuesta);
      
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

export const eliminarProductoController = async (req, res) => {
  try {
      const { usuario_id, producto_id } = req.body;

      const respuesta = await eliminarProductoDelCarrito(usuario_id, producto_id);
      res.json(respuesta);
      
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

export const vaciarCarritoController = async (req, res) => {
  try {
      const { usuario_id } = req.body;

      const respuesta = await vaciarCarritoUsuario(usuario_id);
      res.json(respuesta);
      
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};