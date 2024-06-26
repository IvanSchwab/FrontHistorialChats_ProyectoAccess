import {Router} from 'express';
import allChatRoutes from './allChatsRouter.js';
import loginRoutes from './loginRouter.js';
import signoutRoutes from './signoutRouter.js';
import signupRoutes from './signupRouter.js';
import userRoutes from './userRouter.js';
import refreshToken from '../routes/refreshToken.js';

const routerMaster = Router()  

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