const db = require("../models");
const Usuario = db.usuarios;
const Tickets = db.tickets;

// Create and Save a new Usuario
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const usuario = new Usuario({
    _id: new db.mongoose.Types.ObjectId(),
    nombre: req.body.nombre,
    password: req.body.password,
    admin: req.body.admin ? req.body.admin : false,
  });

  // Save Usuario in the database
  usuario
    .save(usuario)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  let condition = nombre
    ? { nombre: { $regex: new RegExp(nombre), $options: "i" } }
    : {};

  Usuario.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Find all Admin Users
exports.findAllAdmins = (req, res) => {
  Usuario.find({ admin: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Find a single Usuario with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Usuario.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Usuario.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Usuario.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        Tickets.deleteMany({ id_usuario: id }).then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot delete tickets with user_id=${id}. Maybe tickets was not found!`,
            });
          } else {
            res.send({
              message: "The User and his tickets was deleted successfully!",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
