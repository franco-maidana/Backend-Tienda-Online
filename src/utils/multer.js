import multer from "multer";
import path from 'path'

// 🔥 Configuración de almacenamiento para guardar imágenes en la carpeta "uploads"
const storage = multer.diskStorage({
  destination: (req, file, cb ) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    const uniquesuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniquesuffix + path.extname(file.originalname))
  }
})

// 🔥 Filtros para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(new Error("Formato de archivo no permitido. Solo imágenes JPG y PNG."));
  }
};


// 📌 Middleware de `multer`
const upload = multer({ storage, fileFilter });

export default upload;