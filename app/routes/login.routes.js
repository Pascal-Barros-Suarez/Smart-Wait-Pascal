module.exports = (app) => {const express = require("express");
const session = require("express-session");
let router = require("express").Router();

app.use(
	session({
	  secret: "secret",
	  resave: true,
	  saveUninitialized: true,
	})
  );



  // http://localhost:3000/auth
  router.post("/auth", function (request, response) {
    // Capture the input fields
    let username = request.body.username;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
      // If the account exists
      if (username === "Pascal" && password === "Admin*12345") {
        // Authenticate the user
        request.session.loggedin = true;
        request.session.username = username;
        // Redirect to home page
        response.redirect("/login/home");
      } else {
        response.send("Usuario y/o Contraseña Incorrecta");
      }
      response.end();
    } else {
      response.send("Por favor ingresa Usuario y Contraseña!");
      response.end();
    }
  });
  // http://localhost:3000/home
  router.get("/home", function (request, response) {
    // If the user is loggedin
    if (request.session.loggedin) {
      // Output username
      response.send(
        "Te has logueado satisfactoriamente:, " + request.session.username + "!"
      );
    } else {
      // Not logged in
      response.send("¡Inicia sesión para ver esta página!");
    }
    response.end();
  });

  app.use("/login", router);
};
