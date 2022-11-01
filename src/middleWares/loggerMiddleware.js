import logger from "../log/logger.js";

export const allRoutes = (req, res, next) => {
  const info = `Ruta: ${req.url} - metodo: ${req.method}`;
  logger.info(info);
  next();
};

export const notImplementedRoutes = (req, res, next) => {
  const warn = `Ruta: ${req.url} - metodo: ${req.method}`;
  logger.warn(warn);
  next();
};
