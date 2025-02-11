import { Router } from "express";
import { agregarAlCarritoController, verCarritoController, modificarCantidadController ,eliminarProductoController, vaciarCarritoController } from "../../controllers/carrito.controllers.js";

const carritoDeCompras =  Router()

carritoDeCompras.post('/create', agregarAlCarritoController);
carritoDeCompras.get('/listar/:usuario_id', verCarritoController);
carritoDeCompras.put('/upDate', modificarCantidadController);
carritoDeCompras.delete('/destroy', eliminarProductoController);
carritoDeCompras.delete('/vaciar', vaciarCarritoController);

export default carritoDeCompras