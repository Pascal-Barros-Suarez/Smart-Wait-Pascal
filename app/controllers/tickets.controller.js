const db = require("../models");
const path = require("path");
const Ticket = db.tickets;

// Create and Save a new Ticket
exports.create = (req, res) => {
  // Validate request
  if (!req.body.numero) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Ticket
  const ticket = new Ticket({
    numero: req.body.numero,
    id_servicio: req.body.id_servicio,
    id_usuario: req.body.id_usuario,
  });

  // Save Ticket in the database
  ticket
    .save(ticket)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ticket.",
      });
    });
};

// Retrieve all Tickets from the database.
exports.findAll = (req, res) => {
  const numero = req.query.numero;
  let condition = numero
    ? { numero: { $regex: new RegExp(numero), $options: "i" } }
    : {};

  Ticket.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tickets.",
      });
    });
};

// Find a single Ticket with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Ticket.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Ticket with id " + id });
      else {
        data.populate("id_servicio").then((results) => {
          results.populate("id_usuario").then((result) => {
            let numero = result.numero;
            let fecha = result.createdAt;
            let servicio = result.id_servicio.nombre;
            let usuario = result.id_usuario.nombre;
            res.send({
              message:
                "Tu numero es el " +
                numero +
                " para el servicio: " +
                servicio +
                " Fecha actual: " +
                fecha +
                " perteneciente a " +
                usuario,
            });
          });

          //res.send(result.id_servicio.nombre);
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error retrieving Ticket with id = " + id + " el error es " + err,
      });
    });
};

// Update a Ticket by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Ticket.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Ticket with id=${id}. Maybe Ticket was not found!`,
        });
      } else res.send({ message: "Ticket was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Ticket with id=" + id,
      });
    });
};

// Delete a Ticket with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Ticket.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Ticket with id=${id}. Maybe Ticket was not found!`,
        });
      } else {
        res.send({
          message: "Ticket was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Ticket with id=" + id,
      });
    });
};

// Delete all Tickets from the database.
exports.deleteAll = (req, res) => {
  Ticket.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tickets were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Tickets.",
      });
    });
};
