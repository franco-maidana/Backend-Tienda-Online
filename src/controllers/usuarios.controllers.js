import {crear, listar, modificarUsuario, eliminar} from '../services/usuario.service.js'

export const registro = async (req, res) => {
  try {
    const { nombre, apellido, telefono, direccion, email, password } = req.body;
    const usuario = await crear(nombre, apellido, telefono, direccion, email, password);
    res.status(201).json({
      message: "Usuario registrado con éxito",
      usuario 
    }
  );

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const Listar = async (req,res,next) => {
  try {
    const pagina = parseInt(req.query.page) || 1;
    const limite = parseInt(req.query.limit) || 5;

    const usuarios = await listar(pagina, limite)

    return res.status(200).json({
      message: 'Listado de usuarios',
      usuarios
    })

  } catch (error) {
    return next(error)
  }
}

export const actualizarDatosUsuario = async (req, res) => {
  try {
      const { id } = req.params;
      const datos = req.body;

      if (!datos || Object.keys(datos).length === 0) {
          return res.status(400).json({ message: "No se enviaron datos para actualizar" });
      }

      const resultado = await modificarUsuario(id, datos);
      res.json(resultado);

  } catch (error) {
      console.error("❌ Error en actualización:", error.message); // 🔥 Depuración
      res.status(400).json({ message: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {

      const { id } = req.params; // llega bien
      const resultado = await eliminar(id);
      
      res.json(resultado);
  } catch (error) {
      console.error("❌ Error al eliminar usuario:", error.message);
      res.status(400).json({ message: error.message });
  }
};