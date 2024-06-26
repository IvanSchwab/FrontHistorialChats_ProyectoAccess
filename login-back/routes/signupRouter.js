import express from "express";
import { jsonResponse } from "../lib/jsonResponse.js";
import User from "../schema/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, mail, password } = req.body;

  // Verifica que los campos requeridos esten presentes
  if (!name || !mail || !password) {
    console.error("Campos requeridos incompletos");
    return res.status(400).json(
      jsonResponse(400, {
        error: "Campos requeridos incompletos",
      })
    );
  }

  try {
    // Crear user
    const user = new User();
    const exists = await user.nameExist(name);
    
    // Verificar si ya existe un usuario con el mismo nombre
    if (exists) {
      console.error("El nombre ya existe");
      return res.status(400).json(
        jsonResponse(400, {
          error: "El nombre ya existe",
        })
      );
    }

    // Crear un nuevo usuario utilizando el esquema definido
    const newUser = new User({ name, mail, password });
    await newUser.save(); // Guardar el nuevo usuario en la base de datos

    // Enviar respuesta de éxito
    console.log("Usuario creado");
    return res.status(200).json(jsonResponse(200, { message: "Usuario creado" }));
  } catch (error) {
    console.error("Error del servidor:", error);
    // Manejo de errores
    return res.status(500).json(jsonResponse(500, { error: "Error del servidor" }));
  }
});

export default router;
