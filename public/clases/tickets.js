export class Ticket {
  _id = String;
  numero = Number;
  id_servicio = String;
  id_usuario = String;

  constructor(ticket) {
    this._id = ticket._id;
    this.numero = ticket.numero;
    this.id_servicio = ticket.id_servicio;
    this.id_usuario = ticket.id_usuario;
  }
}
