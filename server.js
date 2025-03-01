import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import indexRouter from "./src/router/index.router.js";
import passport from "./src/utils/passport.js";

dotenv.config();

const server = express();
const PORT = process.env.PORT || 8080;

// 🔥 Conectar a la base de datos
const ready = () => {
  console.log("🚀 Servidor corriendo en el puerto " + PORT);
};

// 📌 Middleware para procesar JSON y manejar cookies
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

// 📌 Configurar sesiones con cookies seguras
server.use(
  session({
    secret: "clave_secreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // ✅ No accesible desde JavaScript en el frontend
      secure: false, // ✅ Cambia a `true` en producción con HTTPS
      sameSite: "lax", // ✅ Permite compartir cookies entre frontend y backend
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// 📌 Configurar CORS para permitir cookies
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // ✅ Permitir el envío de cookies
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 📌 Inicializar Passport.js
server.use(passport.initialize());
server.use(passport.session());

// 📌 Servir imágenes de la carpeta "upload"
server.use("/uploads", express.static(path.join(process.cwd(), "upload")));

// 📌 Cargar las rutas
server.use("/", indexRouter);

// 📌 Iniciar el servidor
server.listen(PORT, ready);
