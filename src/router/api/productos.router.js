import CustomRouter from "../customRouter.js";
import { crearNuevoProducto, ListadoProducto, actualizarProducto, eliminarProducto } from "../../controllers/productos.controlers.js";
import upload from "../../utils/multer.js";


const productoRouter = new CustomRouter()

productoRouter.create('/crear', ['admin'] , upload.single('imagen') , crearNuevoProducto);
productoRouter.listar('/listado', ['cliente', 'admin'] , ListadoProducto);
productoRouter.modificar('/upDate/:id', ['admin'] , actualizarProducto);
productoRouter.eliminar('/destroy/:id', ['admin'] , eliminarProducto)

export default productoRouter.getRouter()