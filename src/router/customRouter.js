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
      // 📌 Si la ruta es pública, permitir acceso
      if (arrayPoliticas.includes("public")) return next();

      // 📌 Extraer token de las cookies
      let token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "No estás autenticado - CustomRouter" });
      }

      // 📌 Verificar token y extraer datos
      const data = jwt.verify(token, process.env.JWT_SECRET);
      if (!data) {
        return res.status(400).json({ message: "Token inválido - CustomRouter" });
      }

      // 📌 Obtener usuario y rol desde la base de datos
      const user = await obtenerUsuarios(data.email);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado - CustomRouter" });
      }

      // 📌 Validar acceso según el rol
      if (arrayPoliticas.includes(user.role)) {
        req.user = user;
        return next();
      } else {
        return res.status(403).json({ message: "No tienes acceso a esta ruta - CustomRouter" });
      }
    } catch (error) {
      return next(error);
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
