import { Router } from "express";
import { crearNuevoProducto, ListadoProducto, actualizarProducto, eliminarProducto } from "../../controllers/productos.controlers.js";
import upload from "../../utils/multer.js";

const productoRouter = Router()

productoRouter.post('/crear', upload.single('imagen') ,crearNuevoProducto);
productoRouter.get('/listado', ListadoProducto);
productoRouter.put('/upDate/:id', actualizarProducto);
productoRouter.delete('/destroy/:id', eliminarProducto)

export default productoRouter