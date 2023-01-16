module.exports = (app) => {
  const tickets = require("../controllers/tickets.controller.js");

  let router = require("express").Router();

  // Create a new ticket
  router.post("/", tickets.create);

  // Retrieve all tickets
  router.get("/", tickets.findAll);

  // Retrieve a single ticket with id
  router.get("/:id", tickets.findOne);

  // Update a ticket with id
  router.put("/:id", tickets.update);

  // Delete a ticket with id
  router.delete("/:id", tickets.delete);

  // Delete all tickets
  router.delete("/", tickets.deleteAll);

  app.use("/tickets", router);
};
