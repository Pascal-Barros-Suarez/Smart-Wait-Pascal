module.exports = (app) => {
  const services = require("../controllers/servicio.controller.js");

  let router = require("express").Router();

  // Create a new Service
  router.post("/", services.create);

  // Retrieve all Services
  router.get("/", services.findAll);

  // Retrieve the actual numbrer from a single Service with id
  router.get("/number/:id", services.findNumber);

  // Retrieve a single Service with id
  router.get("/:id", services.findOne);

  // Update a Service with id
  router.put("/:id", services.update);

  // Delete a Service with id
  router.delete("/:id", services.delete);

  // Delete all Services
  router.delete("/", services.deleteAll);

  app.use("/services", router);
};
