//imports
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenConfig = require("../config/jwt.config");
const blacklist = tokenConfig.config.blacklist;
console.log(tokenConfig);
/* console.log(blacklist);
 */
//variable zone
const User = db.usuarios;
const saltRounds = 10;
//const blacklist = ; tokenConfig.config.blacklist

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
      if (data.length == 1) {
        bcrypt.compare(password, data[0].password, function (err, result) {
          if (err) {
            console.log("Error:", err);
          } else if (result) {
            console.log("Passwords match");

            // crear token
            const token = jwt.sign(
              // datos de carga útil
              {
                nombre: username,
                loggedin: true,
                role: data[0].admin,
              },
              tokenConfig.config.TOKEN_SECRET,
              { expiresIn: "2h" }
            );

            res.header("auth-token", token).json({ datos: { token } });

            // Redirect to home page
            //res.redirect("/login/home");
            res.end();
          } else {
            res.send("Usuario y/o Contraseña Incorrecta");
          }
          // res.redirect("/login.html");
        });
      } else {
        res.status(401).send("Usuario No encontado");
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
  const accessToken = req.headers["authorization"].split(" ")[1];
  if (blacklist.includes(accessToken)) {
    res.status(401).send({ error: "Expired Tokend" });
    res.end();
  } else {
    try {
      const decodedToken = jwt.verify(
        accessToken,
        tokenConfig.config.TOKEN_SECRET
      );
      const username = decodedToken.nombre;

      // Output username
      if (decodedToken.loggedin) {
        res.send("Te has logueado satisfactoriamente;  " + username + "!");
      } else {
        // Not logged in
        res.status(401).send("¡Inicia sesión para ver esta página!");
      }
      res.end();
    } catch (error) {
      res.status(401).send({ error: "Hay que validarse primero" });
      res.end();
    }
  }
};

exports.logOut = (req, res) => {
  // If the user is logged in
  const accessToken = req.headers["authorization"].split(" ")[1];
  const decodedToken = jwt.verify(accessToken, tokenConfig.config.TOKEN_SECRET);

  if (decodedToken.loggedin) {
    console.log(decodedToken.nombre, "se esta desonectando");
    invalidateToken(accessToken);
    res.redirect("/");
  } else {
    // Not logged in
    res
      .status(401)
      .send("no puedes cerrar sesion debido a que no estas logueado!");
  }
  res.end();
};

const invalidateToken = (token) => {
  blacklist.push(token);
  console.log(blacklist);
};
