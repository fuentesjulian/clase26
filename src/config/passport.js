// importo las estrategia de passport-local
import { Strategy as LocalStrategy } from "passport-local";

const passportConfig = (passport, userService) => {
  const strategyOptions = { usernameField: "email" };
  // dos estrategias, signup y login
  const signupStrategy = new LocalStrategy(strategyOptions, userService.signup);
  const loginStrategy = new LocalStrategy(strategyOptions, userService.login);

  passport.use("signup", signupStrategy);
  passport.use("login", loginStrategy);

  // creo las funciones de serialize/deserialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    return done(null, await userService.getUserById(id));
  });
};

export default passportConfig;
