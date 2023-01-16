module.exports = (mongoose) => {
  const modelo = mongoose.model(
    "tickets",
    mongoose.Schema(
      {
        numero: Number,
        id_servicio: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "servicio",
          dependent: true,
        },
        id_usuario: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "usuarios",
          dependent: true,
        },
      },
      { timestamps: true, cascade: true }
    )
  );

  return modelo;
};
