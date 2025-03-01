import { Router } from "express";
import jwt from 'jsonwebtoken';
import { obtenerUsuarios } from '../data/models/usuario.model.js';

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}
  
  applyCbs(cbs) {
    return cbs.map((each) => async (req, res, next) => {
        try {
            if (typeof each !== "function") {
                console.error("❌ ERROR: No es una función ->", each);
                throw new Error("Uno de los controladores no es una función");
            }

            await each(req, res, next);
        } catch (error) {
            next(error);
        }
    });
    }




  // 📌 Middleware para validar autenticación y autorización
  politicas = (arrayPoliticas) => async (req, res, next) => {
    try {
      if (arrayPoliticas.includes("public")) return next();
  
      // 📌 Extraer token de las cookies
      let token = req.cookies?.token;
      console.log("📌 Token recibido en la cookie:", token); // ✅ Verificar si el token llega correctamente
  
      if (!token) {
        console.warn("🔒 No autorizado - No hay token en las cookies");
        return res.status(401).json({ message: "No estás autenticado - CustomRouter" });
      }
  
      // 📌 Verificar token y extraer datos
      let data;
      try {
        data = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("📌 Token decodificado:", data); // ✅ Verificar si el token se decodifica correctamente
      } catch (error) {
        console.error("❌ Error al verificar el token:", error.message);
        return res.status(401).json({ message: "Token inválido - CustomRouter" });
      }
  
      // 📌 Obtener usuario desde la base de datos
      const user = await obtenerUsuarios(data.email);
      // console.log("📌 Usuario obtenido:", user); // ✅ Verificar si el usuario se encuentra en la base de datos
  
      if (!user) {
        console.warn("🚨 Usuario no encontrado en la base de datos");
        return res.status(404).json({ message: "Usuario no encontrado - CustomRouter" });
      }
  
      // 📌 Validar acceso según el rol
      // console.log("📌 Rol del usuario:", user.role, "| Roles permitidos:", arrayPoliticas); // ✅ Verificar coincidencia de roles
  
      if (arrayPoliticas.includes(user.role)) {
        req.user = user;
        return next();
      } else {
        console.warn("🚨 Acceso denegado - No tienes permisos suficientes");
        return res.status(403).json({ message: "No tienes acceso a esta ruta - CustomRouter" });
      }
    } catch (error) {
      console.error("❌ Error en el middleware `politicas`:", error.message);
      return res.status(500).json({ message: "Error interno del servidor - CustomRouter" });
    }
  };
  


  create(path, politicas, ...cbs) {
    this.router.post(path, this.politicas(politicas), this.applyCbs(cbs));
  }

  listar(path, politicas, ...cbs) {
    this.router.get(path, this.politicas(politicas), this.applyCbs(cbs));
  }

  modificar(path, politicas, ...cbs) {
    this.router.put(path, this.politicas(politicas), this.applyCbs(cbs));
  }

  eliminar(path, politicas, ...cbs) {
    this.router.delete(path, this.politicas(politicas), this.applyCbs(cbs));
  }

  use(path, politicas, ...cbs) {
    this.router.use(path, this.politicas(politicas), this.applyCbs(cbs));
  }
}
