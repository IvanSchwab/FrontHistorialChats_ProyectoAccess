const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");

router.post("/", (req, res) => {
    const { name, mail, password } = req.body;

    if (!!!name || !!!mail || !!!password) {
      return res.status(400).json(
        jsonResponse(400, {
          error: "Campos requeridos incompletos",
        })
      );
    }
  
    //Crear user
    res
    .status(200).
    json(jsonResponse(200,
         { message: "Usuario creado" }));
         
    res.send("signup");})

module.exports = router;