const db = require("../models");
const User = db.usuarios;

module.exports = (app) => {
  exports.auth = (req, res) => {
    // Capture the input fields
    let username = req.body.username;
    let password = req.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
      // If the account exists
      User.find({
        nombre: username,
        password: password,
      }).then((data) => {
        console.log(data);
        if (data == 1) {
          // Authenticate the user
          req.session.loggedin = true;
          req.session.username = username;
          // Redirect to home page
          res.redirect("/login/home");
        } else {
          res.send("Usuario y/o Contraseña Incorrecta");
        }
        res.end();
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
        "Te has logueado satisfactoriamente:, " + req.session.username + "!"
      );
    } else {
      // Not logged in
      res.send("¡Inicia sesión para ver esta página!");
    }
    res.end();
  };
};
