const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");

router.post("/", (req, res) => {
  const { name, password } = req.body;

  if (!!!name || !!!password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Campos requeridos incompletos",
      })
    );
  }

  //Autenticar usuario
  const accessToken = "access_token";
  const refreshToken = "refresh_token";
  const user = {
    id: "1",
    name: "john doe",
    username: "john_doe",
  };
  res.status(200).json(jsonResponse(200, { user, accessToken, refreshToken}));
});

module.exports = router;
