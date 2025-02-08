# Ecomerse Backend

Este proyecto simula una tienda en linea, desarroyado con NODE.JS, EXPRESS, Y MySQL
Este proyecto permite la gestión de productos, carritos de compra, órdenes y autenticación con JWT.

## 🚀 Características
✅ **Autenticación con JWT** (login, registro, protección de rutas)  
✅ **CRUD de productos** (crear, leer, actualizar y eliminar productos)  
✅ **Carrito de compras** (agregar/quitar productos antes de pagar)  
✅ **Gestión de órdenes** (crear, pagar y administrar órdenes)  
✅ **Base de datos MySQL** para almacenamiento eficiente  
✅ **Estructura escalable y modular** con `models/`, `services/` y `controllers/` 


📌 Guía de Desarrollo - Backend Tienda Online 🚀
📌 1️⃣ Conexión a la Base de Datos → /config/db.js
🔹 Configura la conexión con MySQL y usa variables de entorno (.env).

📌 2️⃣ Modelos → /models
🔹 Define las consultas a la base de datos (usuarios, productos, carritos, órdenes).

📌 3️⃣ Servicios → /services
🔹 Maneja la lógica de negocio (validaciones, cálculos, JWT, stock).

📌 4️⃣ Validaciones → /validations
🔹 Reglas para verificar datos antes de almacenarlos (ej. email válido, contraseña segura).

📌 5️⃣ Controladores → /controllers
🔹 Reciben peticiones HTTP y llaman a los servicios.

📌 6️⃣ Rutas → /routes
🔹 Define los endpoints del API (/auth, /productos, /carrito).

📌 7️⃣ Servidor → /server.js
🔹 Configura Express, las rutas y los middlewares.

📌 8️⃣ Pruebas y Documentación → /docs