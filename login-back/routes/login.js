const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");
const getUserInfo = require("../lib/getUserInfo")

router.post("/", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Campos requeridos incompletos",
      })
    );
  }

  const user = await User.findOne({ name });

  if (user) {
    const correctPassword = await user.comparePassword(password, user.password);
    if (correctPassword) {
      //Autenticar usuario
      const accessToken = user.createAccessToken();
      const refreshToken = await user.createRefreshToken();
      res
        .status(200)
        .json(jsonResponse(200, { user: getUserInfo(user), accessToken, refreshToken }));
    } else{
      res.status(400, {
        error: "El usuario o la contraseña son incorrectos",
      });
  
    }
  } else {
    res.status(400, {
      error: "Usuario no encontrado",
    });
  }
});

module.exports = router;
