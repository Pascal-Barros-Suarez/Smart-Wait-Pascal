module.exports = (mongoose) => {
  const modelo = mongoose.model(
    "servicio",
    mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      nombre: String,
      numero: Number,
    })
  );

  return modelo;
};
