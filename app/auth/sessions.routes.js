module.exports = (app) => {
  const sessions = require("./sessions.controller");

  let router = require("express").Router();

  // http://localhost:3000/login/auth
  router.post("/auth", sessions.auth);

  // http://localhost:3000/login/home
  router.get("/home", sessions.home);

  /*   // http://localhost:3000/login/log-out
  router.get("/logout", sessions.logout);

  // http://localhost:3000/login/register
  router.get("/register", sessions.register) */

  app.use("/login", router);
};
