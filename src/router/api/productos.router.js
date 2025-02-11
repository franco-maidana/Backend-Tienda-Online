import { Router } from "express";
import { crearNuevoProducto } from "../../controllers/productos.controlers.js";
import upload from "../../utils/multer.js";

const productoRouter = Router()

productoRouter.post('/crear', upload.single('imagen') ,crearNuevoProducto);

export default productoRouter