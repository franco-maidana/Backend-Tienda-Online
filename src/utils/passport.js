import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import Conexion from "../config/db.js";

dotenv.config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 🔥 Extrae el token del header Authorization
    secretOrKey: process.env.JWT_SECRET, // 📌 Clave secreta para firmar el token
};

//  Estrategia de autenticación con JWT
passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const [usuarios] = await Conexion.query(
                "SELECT id, nombre, email, role FROM usuario WHERE id = ?",
                [jwt_payload.id]
            );

            if (!usuarios.length) return done(null, false);
            return done(null, usuarios[0]); // ✅ Usuario autenticado
        } catch (error) {
            return done(error, false);
        }
    })
);

export default passport;
