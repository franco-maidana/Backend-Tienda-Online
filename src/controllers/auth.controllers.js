import { solicitarCambioPassword, cambiarPassword,} from "../services/auth.service.js";
import { obtenerUsuarioPorToken, obtenerUsuarios, obtenerUsuariosPorID } from "../data/models/usuario.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config()

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // console.log("📌 Email recibido en forgotPassword:", email); // 🔥 Depuración

    if (!email) {
      return res.status(400).json({ message: "El email es obligatorio" });
    }

    const resultado = await solicitarCambioPassword(email);
    res.json(resultado);
  } catch (error) {
    console.error("❌ Error en forgotPassword:", error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

//  NUEVA FUNCIÓN: Manejar la solicitud de restablecimiento de contraseña
export const resetPassword = async (req, res) => {
  try {
    //console.log("📌 Datos recibidos en resetPassword:", req.body); // 🔥 Depuración

    const { token, password } = req.body;

    if (!token || !password) {
      return res
        .status(400)
        .json({ message: "Token y nueva contraseña son obligatorios" });
    }

    const usuario = await obtenerUsuarioPorToken(token);
    //console.log("📌 Usuario encontrado:", usuario); // 🔥 Depuración

    if (!usuario) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    const resultado = await cambiarPassword(token, password);
    res.json(resultado);
  } catch (error) {
    console.error("❌ Error en resetPassword:", error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

//  Inicio de sesión con JWT en Cookies
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await obtenerUsuarios( email );

    if (!usuario) return res.status(401).json({ message: "Usuario no encontrado" });

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) return res.status(401).json({ message: "Contraseña incorrecta" });

    // ✅ Generar JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET, // ✅ Usa la clave correcta del .env
      { expiresIn: "1h" }
    );
    

    // ✅ Guardar el token en una cookie segura
    res.cookie("token", token, {
      httpOnly: true, // ✅ No accesible desde JavaScript del frontend
      secure: false, // ✅ Cambia a `true` si usas HTTPS
      sameSite: "lax", // ✅ Permite compartir cookies entre frontend y backend
    });

    // ✅ Guardar usuario en la sesión
    req.session.usuario = usuario;

    res.json({ message: "Login exitoso", usuario });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const sessionActiva = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No autenticado" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await obtenerUsuariosPorID(decoded.id);
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ usuario });
  } catch (error) {
    console.error("Error en sessionActiva:", error.message);
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};




export const logout = (req, res) => {
  res.clearCookie("token"); // ✅ Elimina el token almacenado en cookies
  req.session.destroy(); // ✅ Elimina la sesión
  res.json({ message: "Sesión cerrada correctamente" });
};