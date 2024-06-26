import express from "express";
const router = express.Router();
import getTokenFromHeader from "../auth/getTokenFromHeader.js";

router.post("/", async (req, res) => {
  // Obtiene el token de actualización del encabezado de la solicitud
  const refreshToken = getTokenFromHeader(req.headers);
  if (refreshToken) {
    try {
      // Busca el token de actualización en la base de datos
      const found = await Token.findOne({ token: refreshToken });
      if (!found) {
        return res
          .status(401)
          .send(jsonResponse(401, { error: "No autorizado" }));
      }

      // Verifica el token de actualización y obtiene el contenido
      const payload = verifyRefreshToken(found.token);

      if (payload) {
        const accessToken = generateAccessToken(payload);

        // Retorna el token de acceso generado en la respuesta
        return res.status(200).send(jsonResponse(200, { accessToken }));
      } else {
        return res
          .status(401)
          .send(jsonResponse(401, { error: "No autorizado" }));
      }
    } catch (error) {
      return res
        .status(401)
        .send(jsonResponse(401, { error: "No autorizado" }));
    }
  } else {
    res.status(401).send(jsonResponse(401, { error: "No autorizado" }));
  }
});

export default router;
