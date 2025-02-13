import { solicitarCambioPassword, cambiarPassword,} from "../services/auth.service.js";
import { obtenerUsuarioPorToken, obtenerUsuarios } from "../data/models/usuario.model.js";
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
      const usuario = await obtenerUsuarios(email);

      if (!usuario) {
          return res.status(400).json({ message: "Credenciales incorrectas" });
      }

      const passwordValida = bcrypt.compareSync(password, usuario.password);
      if (!passwordValida) {
          return res.status(400).json({ message: "Credenciales incorrectas" });
      }

      // Crear token
      const token = jwt.sign({ email: usuario.email, role: usuario.role }, process.env.JWT_SECRET, {
          expiresIn: "2h",
      });

      // Enviar token en cookies
      res.cookie("token", token, {
          httpOnly: true,
          secure: false, //  Cambia a `true` en producción con HTTPS
          sameSite: "Strict"
      });

      res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
      res.status(500).json({ message: "Error en el servidor" });
  }
};


export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Sesión cerrada correctamente" });
};