import dotenv from 'dotenv';
import express from 'express';
import Conexion from './src/config/db.js';
import cors from 'cors'
import indexRouter from './src/router/index.router.js';


// configuracion dotenv para la carga de las variables de entorno
dotenv.config();

const server = express();
const PORT = process.env.PORT || 8080

const ready = () => {
  console.log('servidor andando en el puerto ' + PORT)
  Conexion
}

server.listen(PORT, ready)

// 🔥 Configurar CORS
server.use(cors({
  origin: "http://localhost:5173", // Permitir el frontend
  credentials: true, // Permitir cookies si usas autenticación
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"] // Headers permitidos
}));

server.use(express.json());
server.use(express.urlencoded({extended: true}));


server.use('/', indexRouter)