import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../auth/generateTokens.js";
import getUserInfo from "../lib/getUserInfo.js";
import Token from "../schema/token.js";

const UserSchema = new mongoose.Schema({
  id: { type: Object },
  name: { type: String, required: true, unique: true },
  mail: { type: String, required: true },
  password: { type: String, required: true },
});
// Middleware para encriptar la contraseña (bcrypt)
UserSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    const document = this;

    bcrypt.hash(document.password, 10, (err, hash) => {
      if (err) {
        next(err);
      } else {
        document.password = hash;
        next();
      }
    });
  } else {
    next();
  }
});

// Método para verificar si ya existe un usuario con el mismo nombre
UserSchema.methods.nameExist = async function (name) {
  const result = await mongoose.model("User").find({ name });

  return result.length > 0;
};

// Método para comparar contraseñas encriptadas
UserSchema.methods.comparePassword = async function (password, hash) {
  const same = await bcrypt.compare(password, hash);
  return same;
};

// Método para generar un token de acceso basado en la información del usuario
UserSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};

// Método para generar un token de actualización y guardarlo en la base de datos
UserSchema.methods.createRefreshToken = async function () {
  const refreshToken = generateRefreshToken(getUserInfo(this));
  try {
    await new Token({ token: refreshToken }).save();

    return refreshToken;
  } catch (error) {
    console.log(error);
  }
};

// Creación del modelo 'User' basado en el esquema definido
const User = mongoose.model("User", UserSchema);

export default User;
