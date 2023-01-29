const db = require("../models");
const User = db.usuarios;
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.auth = async (req, res) => {
  // Capture the input fields
  let username = req.body.username;
  let password = req.body.password;

  // Ensure the input fields exists and are not empty
  if (username && password) {
    // If the account exists
    User.find({
      nombre: username,
    }).then((data) => {
      console.log(data);
      //res.send(data);
      if (data.length == 1) {
        bcrypt.compare(password, data[0].password, function (err, result) {
          if (err) {
            console.log("Error:", err);
          } else if (result) {
            console.log("Passwords match");

            // Authenticate the user
            req.session.loggedin = true;
            req.session.username = username;
            req.session.role = data[0].admin;
            // Redirect to home page
            res.redirect("/login/home");
            res.end();
          } else {
            console.log("no coinciden" + password, data.password);
          }
        });
      } else {
        res.status(401).send("Usuario y/o Contraseña Incorrecta");
      }
      //res.end();
    });
  } else {
    res.send("Por favor ingresa Usuario y Contraseña!");
    res.end();
  }
};

exports.home = (req, res) => {
  // If the user is loggedin
  if (req.session.loggedin) {
    // Output username
    res.send(
      "Te has logueado satisfactoriamente;  " + req.session.username + "!"
    );
  } else {
    // Not logged in
    res.status(401).send("¡Inicia sesión para ver esta página!");
  }
  res.end();
};

exports.logOut = (req, res) => {
  // If the user is logged in
  if (!req.session.loggedin) {
    res
      .status(401)
      .send("no puedes cerrar sesion debido a que no estas logueado!");
  } else {
    // Not logged in
    req.session.destroy((err) => {
      res.redirect("/"); // will always fire after session is destroyed
      //res.end("has cerrado sesion satisfactoriamente!");
      res.end();
    });
  }
  
};
