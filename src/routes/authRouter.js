// Middlewares de auth
import { isLoggedIn, isLoggedOut } from "../middleWares/authentication.js";

export const configAuthRouter = (authRouter, passport) => {
  authRouter
    .get("/login", isLoggedOut, (req, res) => {
      res.render("login");
    })
    .post(
      "/login",
      isLoggedOut,
      passport.authenticate("login", {
        successRedirect: "/",
        failureRedirect: "/login-error",
      })
    )
    .get("/signup", isLoggedOut, (req, res) => {
      res.render("signup");
    })
    .post(
      "/signup",
      isLoggedOut,
      passport.authenticate("signup", {
        successRedirect: "/",
        failureRedirect: "/signup-error",
      })
    )
    .get("/logout", isLoggedIn, (req, res) => {
      // cargo temporalmente el nombre de la sesion
      const nombre = req.user.email;
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.render("logout", { nombre: nombre });
      });
    })
    .get("/login-error", isLoggedOut, (req, res) => {
      res.render("error", {
        error: "User error login",
        redirect: "login",
      });
    })
    .get("/signup-error", isLoggedOut, (req, res) => {
      res.render("error", {
        error: "User error signup",
        redirect: "signup",
      });
    });
};
