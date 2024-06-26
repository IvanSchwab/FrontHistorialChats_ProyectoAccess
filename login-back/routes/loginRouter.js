import express from "express";
const router = express.Router();
import { jsonResponse } from "../lib/jsonResponse.js";
import User from "../schema/user.js";
import getUserInfo from "../lib/getUserInfo.js";

router.post("/", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Campos requeridos incompletos",
      })
    );
  }
  // Busca al usuario en la base de datos por el nombre
  const user = await User.findOne({ name });
  // Si se encuentra un usuario con el nombre proporcionado
  if (user) {
    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    const correctPassword = await user.comparePassword(password, user.password);
    if (correctPassword) {
      // Genera tokens de acceso y actualización si la contraseña es correcta
      const accessToken = user.createAccessToken();
      const refreshToken = await user.createRefreshToken();
      // Retorna la respuesta con el usuario y los tokens generados
      res.status(200).json(
        jsonResponse(200, {
          user: getUserInfo(user),
          accessToken,
          refreshToken,
        })
      );
    } else {
      // Retorna un error si la contraseña es incorrecta
      res.status(400, {
        error: "El usuario o la contraseña son incorrectos",
      });
    }
  } else {
    // Retorna un error si no se encuentra el usuario
    res.status(400, {
      error: "Usuario no encontrado",
    });
  }
});

export default router;
