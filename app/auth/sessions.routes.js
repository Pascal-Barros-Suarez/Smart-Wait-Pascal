module.exports = (app) => {
  const sessions = require("./sessions.controller");
  const user = require("../controllers/usuarios.controller");

  let router = require("express").Router();

  // http://localhost:3000/login/auth
  router.post("/auth", sessions.auth);

  // http://localhost:3000/login/home
  router.get("/home", sessions.home);

  // http://localhost:3000/login/register
  router.post("/register", user.create);

  // http://localhost:3000/login/log-out
  router.get("/logout", sessions.logOut);

  app.use("/login", router);
};
