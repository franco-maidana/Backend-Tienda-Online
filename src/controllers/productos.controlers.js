import { registrarProducto } from "../services/productos.service.js";

export const crearNuevoProducto = async (req, res) => {
  try {
      console.log("📌 Datos recibidos en crearProducto:", req.body);
      console.log("📌 Archivo recibido:", req.file);

      const producto = await registrarProducto(req.body, req.file);
      
      res.status(201).json({ message: "Producto creado exitosamente", producto });

  } catch (error) {
      console.error("❌ Error en crearProducto:", error.message);
      res.status(400).json({ message: error.message });
  }
};