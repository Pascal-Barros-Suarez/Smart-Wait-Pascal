module.exports = (app) => {
  const express = require("express");
  const session = require("express-session");
  const sessions = require("./sessions.controller.js");

  let router = require("express").Router();

  // http://localhost:3000/auth
  router.get("/auth", sessions.auth);

  // http://localhost:3000/home
  router.get("/home", sessions.home);

  app.use("/login", router);
};
