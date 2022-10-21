import express from "express";
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import * as dotenv from "dotenv";
import Yargs from "yargs";
import infoRoutes from "./routes/infoRoutes.js";
import fakeProdsRoutes from "./routes/fakeProdsRoutes.js";
import randomGenRoutes from "./routes/randomGenRoutes.js";
dotenv.config();
//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
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

// configuro sesion
import session from "./middleWares/session.js";
app.use(session);

// configuro passport
import passport from "passport";
import * as userService from "./services/userService.js";
import passportConfig from "./config/passport.js";
passportConfig(passport, userService);

// inicio passport y lo vinculo a la sesión
app.use(passport.initialize());
app.use(passport.session());

//Set engine
app.set("views", "./views");
app.set("view engine", "ejs");

// Middlewares
import { isLoggedIn, isLoggedOut } from "./middleWares/authentication.js";

// rutas
// el get de login tiene un middleware para que no hacer un login 2 veces
app.get("/login", isLoggedOut, (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  isLoggedOut,
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login-error",
  })
);

app.get("/signup", isLoggedOut, (req, res) => {
  res.render("signup");
});

app.post(
  "/signup",
  isLoggedOut,
  passport.authenticate("signup", {
    successRedirect: "/",
    failureRedirect: "/signup-error",
  })
);

app.get("/", isLoggedIn, (req, res) => {
  res.render("index", { nombre: req.user.email });
});

// agrego la ruta generadora de randoms
app.use("/api/productos-test", fakeProdsRoutes);

// en el template del profe hay un get para el logout
// realmente no se si es lo correcto, siento que deberia ser un post o un delete
// dejo igualmente la ruta de get para el logout
// le pongo un middleware para que solo corra si estoy loggeado, sino redirecciona
app.get("/logout", isLoggedIn, (req, res) => {
  // cargo temporalmente el nombre de la sesion
  const nombre = req.user.email;
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.render("logout", { nombre: nombre });
  });
});

app.get("/login-error", isLoggedOut, (req, res) => {
  res.render("error", {
    error: "User error login",
    redirect: "login",
  });
});

app.get("/signup-error", isLoggedOut, (req, res) => {
  res.render("error", {
    error: "User error signup",
    redirect: "signup",
  });
});

// agrego la ruta de info
app.use("/info", infoRoutes);

// agrego la ruta generadora de randoms
app.use("/api/randoms", randomGenRoutes);

//--------------------------------------------
// inicio el servidor

const yargs = Yargs(process.argv.slice(2));
const args = yargs.alias({ p: "port" }).default({ port: 8080 }).argv;

const PORT = args.port;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
