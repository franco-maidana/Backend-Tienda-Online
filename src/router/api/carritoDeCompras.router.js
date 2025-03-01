import CustomRouter from "../customRouter.js";
import { 
  agregarAlCarritoController, 
  verCarritoController, 
  modificarCantidadController, 
  eliminarProductoController, 
  vaciarCarritoController 
} from "../../controllers/carrito.controllers.js";

const carritoDeCompras = new CustomRouter();

//  Agregar producto al carrito (cliente autenticado)
carritoDeCompras.create('/create', ['cliente',], agregarAlCarritoController);
//  Ver carrito del usuario (solo el usuario puede ver su carrito)
carritoDeCompras.listar('/listar/:usuario_id', ['cliente'], verCarritoController);
//  Modificar cantidad de productos en el carrito
carritoDeCompras.modificar('/upDate', ['cliente'], modificarCantidadController);
//  Eliminar un producto específico del carrito
carritoDeCompras.eliminar('/destroy', ['cliente'], eliminarProductoController);
//  Vaciar el carrito completamente
carritoDeCompras.eliminar('/vaciar', ['cliente'], vaciarCarritoController);

export default carritoDeCompras.getRouter();
