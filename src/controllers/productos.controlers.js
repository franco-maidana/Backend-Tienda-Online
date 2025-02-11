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

export const ListadoProducto = async (req,res,next) => {
  try {
    const pagina = parseInt(req.query.page) || 1;
    const limte = parseInt(req.query.limit) || 5;

    const productos = await listar(pagina, limte)

    return res.status(200).json({
      message: 'Listado de productos',
      productos
    })
  } catch (error) {
    return next(error)
  }
}

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