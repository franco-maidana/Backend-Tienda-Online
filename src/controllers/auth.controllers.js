import { solicitarCambioPassword, cambiarPassword } from '../services/auth.service.js';
import { obtenerUsuarioPorToken } from "../data/models/usuario.model.js";

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

// ✅ NUEVA FUNCIÓN: Manejar la solicitud de restablecimiento de contraseña
export const resetPassword = async (req, res) => {
  try {
      //console.log("📌 Datos recibidos en resetPassword:", req.body); // 🔥 Depuración

      const { token, password } = req.body;

      if (!token || !password) {
          return res.status(400).json({ message: "Token y nueva contraseña son obligatorios" });
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


