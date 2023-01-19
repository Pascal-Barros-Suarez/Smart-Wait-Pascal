const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.servicio = require("./servicio.model.js")(mongoose);
db.tickets = require("./tickets.model.js")(mongoose);
db.usuarios = require("./usuarios.model.js")(mongoose);

module.exports = db;
