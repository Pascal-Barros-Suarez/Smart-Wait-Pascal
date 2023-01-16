export class Servicio {
  _id = String;
  nombre = String;
  numero = Number;

  constructor(servicio) {
    this._id = servicio._id;
    this.nombre = servicio.nombre;
    this.numero = servicio.numero;
  }
}
