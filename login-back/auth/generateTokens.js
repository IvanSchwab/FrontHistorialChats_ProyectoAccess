import jwt from "jsonwebtoken";

function sign(payload, isAccessToken) {
  return jwt.sign(
    payload,
    isAccessToken
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET,
    {
      algorithm: "HS256",
      expiresIn: 3600,
    }
  );
}

export function generateAccessToken(user) {
  return sign({ user }, true);
}

export function generateRefreshToken(user) {
  return sign({ user }, false);
}
