const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");


router.post("/", async (req, res) => {
  const { name, mail, password } = req.body;

  if (!name || !mail || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Campos requeridos incompletos",
      })
    );
  }

  try {
  //Crear user
  const user = new User();
const exists = await user.nameExist(name)

if (exists){
return res.status(400).json(
  jsonResponse(400, {
    error: "El nombre ya existe",
  })
)
}

const newUser = new User({name, mail, password});


  await newUser.save(); 
    // Enviar respuesta de éxito
    return res.status(200).json(jsonResponse(200, { message: "Usuario creado" }));

} catch{
      // Manejo de errores
      return res.status(500).json(jsonResponse(500, { error: "Error del servidor" }));
}
});
module.exports = router;
