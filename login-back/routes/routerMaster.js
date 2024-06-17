import {Router} from 'express';
import allChatRoutes from './allChatsRouter.js';
import loginRoutes from './loginRouter.js';
import signoutRoutes from './signoutRouter.js';
import userRoutes from './userRouter.js';

// import 

// app.use("/api/todos", require("./routes/todos"));
app.use("/api/allChats", allChatRoutes);
// app.use("/api/signup", require("./routes/signup"));
app.use("/api/signup", signoutRoutes);
// app.use("/api/login", require("./routes/login"));
app.use("/api/login", loginRoutes);
// app.use("/api/user", require("./routes/user"));
app.use("/api/user", userRoutes);
// app.use("/api/refresh-token", require("./routes/refreshToken"));
app.use("/api/refresh-token", require("./routes/refreshToken"));
// app.use("/api/signout", require("./routes/signout"));
app.use("/api/signout", signoutRoutes);

app.get("/", (req, res) => {
    res.send("api working");
  });

export default routerMaster