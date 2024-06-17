import express from "express";
import routerMaster from "./routes/routerMaster.js";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.DB_CONNECTION_STRING;

const app = express();
const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

async function main(){
  await mongoose.connect(uri);
  console.log("Conectado a MongoDB")
}

main().catch(console.error);

app.use('/', routerMaster);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
