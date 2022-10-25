import express from "express";
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";
import infoRoutes from "./routes/infoRoutes.js";
import fakeProdsRoutes from "./routes/fakeProdsRoutes.js";
import randomGenRoutes from "./routes/randomGenRoutes.js";

//--------------------------------------------
// instancio servidor, socket y api
const app = express();
export const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

//--------------------------------------------
// configuro el socket
import { socketConfig } from "./config/socket.js";
socketConfig(io);

//--------------------------------------------
// agrego middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//--------------------------------------------
// configuro sesion
import session from "./middleWares/session.js";
app.use(session);

//--------------------------------------------
// configuro passport
import passport from "passport";
import * as userService from "./services/userService.js";
import passportConfig from "./config/passport.js";
passportConfig(passport, userService);
// inicio passport y lo vinculo a la sesión
app.use(passport.initialize());
app.use(passport.session());

//--------------------------------------------
//Set engine
app.set("views", "./views");
app.set("view engine", "ejs");

//--------------------------------------------
// Middlewares de auth
import { isLoggedIn } from "./middleWares/authentication.js";

//--------------------------------------------
// ruta de pag ppal
app.get("/", isLoggedIn, (req, res) => {
  res.render("index", { nombre: req.user.email });
});

//--------------------------------------------
// authRouter donde esta la estrategia de autenticacion
const authRouter = express.Router();
import { configAuthRouter } from "./config/authRouter.js";
configAuthRouter(authRouter, passport);
app.use("/", authRouter);

//--------------------------------------------
// otras rutas de apis
// agrego la ruta de la api generadora de productos randoms
app.use("/api/productos-test", fakeProdsRoutes);
// agrego la ruta de la api que da info
app.use("/info", infoRoutes);
// agrego la ruta de la api generadora de nros randoms
app.use("/api/randoms", randomGenRoutes);




