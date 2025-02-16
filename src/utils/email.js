import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD
    },
    tls: {
        rejectUnauthorized: false //  Permitir certificados auto-firmados
    }
});

export const enviarEmail = async (destinatario, asunto, mensaje) => {
    try {
        //console.log(" Intentando enviar email a:", destinatario); //  Depuración

        const info = await transporter.sendMail({
            from: `"Soporte Tienda" <${process.env.GOOGLE_EMAIL}>`,
            to: destinatario,
            subject: asunto,
            html: mensaje
        });

        //console.log(" Email enviado con éxito:", info.response); // 🔥 Confirmación

    } catch (error) {
        console.error("❌ Error al enviar el email:", error.message);
    }
};
