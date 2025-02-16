import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// 📌 Middleware para verificar el token desde la cookie
export const verificarAutenticacion = (req, res, next) => {
    const token = req.cookies.token; // 🔥 Extrae el token desde la cookie

    if (!token) {
        return res.status(401).json({ message: "Acceso no autorizado, token no encontrado" });
    }

    try {
        const usuario = jwt.verify(token, process.env.JWT_SECRET); // ✅ Decodifica el token
        req.usuario = usuario; // 🔥 Adjunta el usuario a la solicitud
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido o expirado" });
    }
};
