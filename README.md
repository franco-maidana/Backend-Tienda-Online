# 🛍 Backend - Tienda Online

Este es el backend de una tienda en línea desarrollado con **Node.js, Express y MySQL**, incluyendo autenticación con **JWT y Passport**, gestión de usuarios, carrito de compras, pedidos y pagos con **Stripe**.

## 🚀 Tecnologías utilizadas

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework para manejar rutas y middleware
- **MySQL** - Base de datos relacional para gestionar productos, usuarios y pedidos
- **Multer** - Manejo de subida de imágenes
- **JWT & Passport** - Autenticación segura con tokens
- **Stripe** - Procesamiento de pagos
- **Nodemailer** - Envío de correos electrónicos
- **bcrypt** - Encriptación de contraseñas
- **dotenv** - Manejo de variables de entorno

---

## 📦 Instalación y configuración

📌 Autenticación
Método	Ruta	Descripción
POST	/api/auth/login	Iniciar sesión
POST	/api/auth/register	Registro de usuario
POST	/api/auth/logout	Cerrar sesión

📌 Usuarios
Método	Ruta	Descripción
GET	/api/usuario/listado	Obtener todos los usuarios
PUT	/api/usuario/upDate/:id	Modificar datos del usuario
DELETE	/api/usuario/destroy/:id	Eliminar usuario

📌 Productos
Método	Ruta	Descripción
GET	/api/producto/listado	Obtener todos los productos
POST	/api/producto/crear	Crear un nuevo producto
PUT	/api/producto/upDate/:id	Modificar producto
DELETE	/api/producto/destroy/:id	Eliminar producto

📌 Carrito de Compras
Método	Ruta	Descripción
POST	/api/carrito/create	Agregar producto al carrito
GET	/api/carrito/listar/:usuario_id	Ver productos en el carrito
PUT	/api/carrito/upDate	Modificar cantidad de un producto
DELETE	/api/carrito/destroy	Eliminar un producto del carrito
DELETE	/api/carrito/vaciar	Vaciar el carrito de compras

📌 Órdenes
Método	Ruta	Descripción
POST	/api/ordenes/create	Crear una nueva orden
GET	/api/ordenes/:orden_id	Obtener detalles de una orden

📌 Pagos con Stripe
Método	Ruta	Descripción
POST	/api/pago/checkout	Procesar pago con Stripe

backend
│── src
│   ├── config/         # Configuración de la base de datos
│   ├── controllers/    # Lógica de las rutas (productos, usuarios, pedidos)
│   ├── data/           # Modelos de la base de datos
│   ├── middlewares/    # Middleware de autenticación y validación
│   ├── router/         # Rutas de la API
│   ├── services/       # Lógica de negocio (capa intermedia)
│   ├── utils/          # Utilidades como multer y envío de correos
│── .env                # Variables de entorno
│── package.json        # Dependencias del proyecto
│── server.js           # Archivo principal del servidor


Franco Maidana - Desarrolador Backend