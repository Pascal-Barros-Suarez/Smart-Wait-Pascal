module.exports = (mongoose) => {
  const modelo = mongoose.model(
    "usuarios",
    mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      nombre: String,
      password: String,
      admin: Boolean,
    })
  );

  return modelo;
};
