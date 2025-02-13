import dotenv from "dotenv";
import express from "express";
import Conexion from "./src/config/db.js";
import cors from "cors";
import indexRouter from "./src/router/index.router.js";
import passport from './src/utils/passport.js'
import cookieParser from "cookie-parser";

dotenv.config();

const server = express();
const PORT = process.env.PORT || 8080;

// 🔥 Conectar a la base de datos
const ready = () => {
  console.log("🚀 Servidor corriendo en el puerto " + PORT);
  Conexion;
};

// 📌 Configurar CORS (Permitir el frontend)
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Permitir cookies si usas autenticación
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

server.use(passport.initialize())
server.use(cookieParser());

server.use(express.urlencoded({ extended: true }));

// 📌 Cargar las rutas
server.use("/", indexRouter);

// 📌 Iniciar el servidor
server.listen(PORT, ready);
