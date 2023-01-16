module.exports = (app) => {
  const usuarios = require("../controllers/usuarios.controller");

  let router = require("express").Router();

  // Create a new User
  router.post("/", usuarios.create);

  // Retrieve all Users
  router.get("/", usuarios.findAll);

  // Retrieve all Admin Users
  router.get("/seguridad", usuarios.findAllAdmins);

  // Retrieve a single User with id
  router.get("/:id", usuarios.findOne);

  // Update a User with id
  router.put("/:id", usuarios.update);

  // Delete a User with id
  router.delete("/:id", usuarios.delete);

  app.use("/users", router);
};
