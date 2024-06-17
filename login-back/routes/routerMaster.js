import {Router} from 'express';
import allChatRoutes from './allChatsRouter.js';
import loginRoutes from './loginRouter.js';
import signoutRoutes from './signoutRouter.js';
import userRoutes from './userRouter.js';
import refreshToken from '../routes/refreshToken.js';

const routerMaster = Router()  

// import 

// app.use("/api/todos", require("./routes/todos"));
routerMaster.use("/api/allChats", allChatRoutes);
// app.use("/api/signup", require("./routes/signup"));
routerMaster.use("/api/signup", signoutRoutes);
// app.use("/api/login", require("./routes/login"));
routerMaster.use("/api/login", loginRoutes);
// app.use("/api/user", require("./routes/user"));
routerMaster.use("/api/user", userRoutes);
// app.use("/api/refresh-token", require("./routes/refreshToken"));
routerMaster.use("/api/refresh-token", refreshToken);
// app.use("/api/signout", require("./routes/signout"));
routerMaster.use("/api/signout", signoutRoutes);

routerMaster.get("/", (req, res) => {
    res.send("api working");
  });

export default routerMaster