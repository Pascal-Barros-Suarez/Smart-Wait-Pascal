const express = require("express");
const cors = require("cors");
const session = require("express-session");
const auth = require("./app/config/sessions.config");
const app = express();

app.use(session(auth.config));

let corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

// home route
app.get("/", (req, res) => {
  console.log("Ha entrado un cliente");
  res.sendFile(__dirname + "/public/views/html/index.html");
});

// home route
app.get("/login.html", (req, res) => {
  res.sendFile(__dirname + "/public/views/html/login.html");
});

// require of routes
require("./app/routes/tickets.routes")(app);
require("./app/routes/servicio.routes")(app);
require("./app/routes/usuarios.routes")(app);

// require of routes auth
require("./app/auth/sessions.routes")(app);

// end requires

// set port, listen for requests
const PORT = process.env.PORT || 3e3;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

////////////////////////////////////////////////////

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Server is connected to the database!");
  })
  .catch((err) => {
    console.log("Can not connect to the database!!", err);
    process.exit();
  });

/*
  express-session
https://www.configuroweb.com/inicio-de-sesion-con-node-js-express-y-mysql/

Google cloud
https://cloud.google.com/nodejs/getting-started/authenticate-users?hl=es

  */
