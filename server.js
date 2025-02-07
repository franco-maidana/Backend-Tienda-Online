import dotenv from 'dotenv';
import express from 'express';
import Conexion from './src/config/db.js';


// configuracion dotenv para la carga de las variables de entorno
dotenv.config();

const server = express();
const PORT = process.env.PORT

const ready = () => {
  console.log('servidor andando en el puerto ' + PORT)
  Conexion
}

server.listen(PORT, ready)