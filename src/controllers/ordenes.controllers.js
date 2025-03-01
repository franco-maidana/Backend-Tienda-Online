import { generarOrden, verDetallesOrden, obtenerOrdenesPorUsuario  } from "../services/ordenes.service.js";

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
    // console.log("📌 ID de orden recibido:", orden_id); // 👀 Verificar en consola

    if (!orden_id) {
      return res.status(400).json({ message: "ID de orden no proporcionado" });
    }

    const detalle = await verDetallesOrden(orden_id);

    if (!detalle || !detalle.productos.length) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    res.json(detalle);
  } catch (error) {
    console.error("❌ Error en obtenerDetalleOrden:", error);
    res.status(500).json({ message: error.message });
  }
};


// 📌 Nueva función para listar todas las órdenes de un usuario
export const listarOrdenesUsuario = async (req, res) => {
  try {
    console.log("Usuario logueado:", req.user); // Verifica la estructura del objeto
    // Usa la propiedad correcta (por ejemplo, id)
    const usuario_id = req.user.usuario_id || req.user.id;
    
    if (!usuario_id) {
      return res.status(400).json({ message: "Usuario no autenticado correctamente" });
    }
    
    const ordenes = await obtenerOrdenesPorUsuario(usuario_id);
    res.json({ message: "Órdenes del usuario obtenidas correctamente", ordenes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


