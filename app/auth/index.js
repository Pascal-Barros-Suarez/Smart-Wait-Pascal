const session = require("express-session");
const path = require("path");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

// http://localhost:3000/
app.get("/", function (request, response) {
  // Render login template
  response.sendFile(path.join(__dirname + "/static/login.html"));
});

// http://localhost:3000/auth
app.post("/auth", function (request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // If the account exists
    if (username === "Pascal" && password === "Pascal") {
      // Authenticate the user
      request.session.loggedin = true;
      request.session.username = username;
      // Redirect to home page
      response.redirect("/home");
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
app.get("/home", function (request, response) {
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

app.listen(3000);
