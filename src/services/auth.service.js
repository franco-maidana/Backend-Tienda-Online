import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { obtenerUsuarios, guardarTokenReset, obtenerUsuarioPorToken, actualizarPassword, eliminarTokenReset } from '../data/models/usuario.model.js';
import { enviarEmail } from '../utils/email.js'; // 🔥 IMPORTANTE

export const solicitarCambioPassword = async (email) => {
    const usuario = await obtenerUsuarios(email);
    if (!usuario) throw new Error("No existe un usuario con ese email");

    // Generar un token aleatorio
    const token = crypto.randomBytes(32).toString("hex");

    // Guardar el token en la base de datos
    await guardarTokenReset(usuario.id, token);

    // Crear enlace de recuperación
    const enlace = `http://localhost:5173/reset-password?token=${token}`;
    //console.log("📌 Enlace de recuperación generado:", enlace); // 🔥 Depuración

    // Enviar el email al usuario
    const mensajeHTML = `
        <h2>Recuperación de contraseña</h2>
        <p>Hola ${usuario.nombre},</p>
        <p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
        <a href="${enlace}" target="_blank">Cambiar contraseña</a>
        <p>Si no solicitaste esto, ignora este mensaje.</p>
    `;

    await enviarEmail(email, "Recuperación de contraseña", mensajeHTML);

    return { message: "Se ha enviado un email con instrucciones para cambiar la contraseña" };
};

// ✅ FUNCIÓN CORREGIDA: Restablecer la contraseña
export const cambiarPassword = async (token, nuevaPassword) => {
    const usuario = await obtenerUsuarioPorToken(token);
    if (!usuario) throw new Error("Token inválido o expirado");

    // Encriptar la nueva contraseña
    const passwordEncriptado = bcrypt.hashSync(nuevaPassword, 10);
    
    // Actualizar la contraseña en la base de datos
    const actualizado = await actualizarPassword(usuario.id, passwordEncriptado);

    if (!actualizado) {
        throw new Error("No hay datos para actualizar");
    }

    // Eliminar el token de recuperación
    await eliminarTokenReset(usuario.id);

    return { message: "Contraseña restablecida correctamente" };
};
