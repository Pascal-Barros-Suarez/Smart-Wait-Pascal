const db = require("../models");
const Servicio = db.servicio;
const Tickets = db.tickets;

// Create and Save a new Service
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Service
  const service = new Servicio({
    _id: new db.mongoose.Types.ObjectId(),
    nombre: req.body.nombre,
    numero: req.body.numero,
  });

  // Save Service in the database
  service
    .save(service)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Service.",
      });
    });
};

// Retrieve all Services from the database.
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  let condition = nombre
    ? { nombre: { $regex: new RegExp(nombre), $options: "i" } }
    : {};

  Servicio.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving services.",
      });
    });
};

// Find a single Service with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Servicio.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Service with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Service with id=" + id });
    });
};

// Find the number of a single Service with an id
exports.findNumber = (req, res) => {
  const id = req.params.id;

  Servicio.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Service with id " + id });
      else res.send({ numero: data.numero });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Service with id=" + id });
    });
};

// Update a Service by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Servicio.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Service with id=${id}. Maybe Service was not found!`,
        });
      } else res.send({ message: "Service was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Service with id=" + id,
      });
    });
};

// Delete a Service with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(id);

  Servicio.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Service with id=${id}. Maybe Service was not found!`,
        });
      } else {
        Tickets.deleteMany({ id_servicio: id }).then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot delete tickets with service_id=${id}. Maybe tickets was not found!`,
            });
          } else {
            res.send({
              message: "The Service and his tickets was deleted successfully!",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Service with id=" + id,
      });
    });
};

// Delete all Services from the database.
exports.deleteAll = (req, res) => {
  Servicio.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Service were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all services.",
      });
    });
};
