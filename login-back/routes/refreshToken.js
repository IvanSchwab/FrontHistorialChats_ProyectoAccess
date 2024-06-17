import express from "express";
const router = express.Router();
// const getTokenFromHeader = require("../auth/getTokenFromHeader");
import getTokenFromHeader from "../auth/getTokenFromHeader";

router.post("/", async (req, res) => {
  const refreshToken = getTokenFromHeader(req.headers);
  if (refreshToken) {
    try {
      const found = await Token.findOne({ token: refreshToken });
      if (!found) {
        return res
          .status(401)
          .send(jsonResponse(401, { error: "No autorizado" }));
      }

      const payload = verifyRefreshToken(found.token);
      if (payload) {
        const accessToken = generateAccessToken(payload);

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
  res.send("refresh token");
});

module.exports = router;
