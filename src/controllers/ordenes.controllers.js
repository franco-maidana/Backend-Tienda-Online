import { generarOrden, verDetallesOrden } from "../services/ordenes.service.js";

export const confirmarCompra = async (req, res) => {
  try {
    const { usuario_id } = req.body;

    const resultado = await generarOrden(usuario_id);
    res.json(resultado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const obtenerDetalleOrden = async (req, res) => {
  try {
    const { orden_id } = req.params;
    const detalle = await verDetallesOrden(orden_id);
    res.json(detalle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
