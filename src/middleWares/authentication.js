// ### MIDDLEWARES de login
// middlewares para no entrar al home sin login y para no loggearme 2 veces
// si estoy loggeado llama a next, sino hace un redirect al login
export const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect("/login");
  next();
};
// si estoy no estoy loggeado llama anext, sino hace un redirect al home
export const isLoggedOut = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/");
  next();
};
