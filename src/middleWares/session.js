import MongoStore from "connect-mongo";
import session from "express-session";

// setteo sesiones
const sessionStore = MongoStore.create({
  mongoUrl: "mongodb://localhost:27017/testdb",
  /* ttl: 60,*/
});

export default session({
  store: sessionStore,
  secret: "sessionSecret",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 10 * 60 * 1000,
  },
});
