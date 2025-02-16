import { registrarProducto, listar, modificarProducto, eliminandoProducto } from "../services/productos.service.js";

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

export const ListadoProducto = async (req, res) => {
  try {
    const pagina = parseInt(req.query.pagina) || 1;
    const limite = parseInt(req.query.limite) || 10;
    const categoria = req.query.categoria || null;

    console.log(`📌 Solicitando productos - Página: ${pagina}, Límite: ${limite}, Categoría: ${categoria}`);

    const productosData = await listar(pagina, limite, categoria);
    
    res.json(productosData);
  } catch (error) {
    console.error("❌ Error al listar productos:", error);
    res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
  }
};



export const actualizarProducto = async (req,res,next) => {
  try {
    const {id} = req.params
    const datos = req.body

    if (!datos || Object.keys(datos).length === 0) {
      return res.status(400).json({ message: "No se enviaron datos para actualizar" });
    }

    const resultado = await modificarProducto(id, datos);
    res.json(resultado)

  } catch (error) {
    return next(error)
  }
}

export const eliminarProducto = async (req,res,next) => {
  try {
    const {id} = req.params

    const eliminarProducto = await eliminandoProducto(id)
    res.json(eliminarProducto)
  } catch (error) {
    return next(error)
  }
}