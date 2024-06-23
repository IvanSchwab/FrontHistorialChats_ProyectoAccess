import {Router} from 'express';
import allChatRoutes from './allChatsRouter.js';
import loginRoutes from './loginRouter.js';
import signoutRoutes from './signoutRouter.js';
import signupRoutes from './signupRouter.js';
import userRoutes from './userRouter.js';
import refreshToken from '../routes/refreshToken.js';

const routerMaster = Router()  

// import 

// app.use("/api/todos", require("./routes/todos"));
// app.use("/api/signup", require("./routes/signup"));
// app.use("/api/login", require("./routes/login"));
// app.use("/api/user", require("./routes/user"));
// app.use("/api/refresh-token", require("./routes/refreshToken"));
// app.use("/api/signout", require("./routes/signout"));

routerMaster.use("/api/allChats", allChatRoutes);
routerMaster.use("/api/signup", signupRoutes);
routerMaster.use("/api/login", loginRoutes);
routerMaster.use("/api/user", userRoutes);
routerMaster.use("/api/refresh-token", refreshToken);
routerMaster.use("/api/signout", signoutRoutes);

routerMaster.get("/", (req, res) => {
    res.send("api working");
  });

export default routerMaster