// imports
import { getDatos } from "./clases/consultaApi.js";
import { Ticket } from "./clases/tickets.js";
import { Servicio } from "./clases/servicios.js";

// declarar variables
let resultadoConsulta;
let fragTable = document.createDocumentFragment();

// recoger datos del front
// recoger botones del front
let botonUsuariosHtml = document.getElementById("usuarios");
let botonTicketsHtml = document.getElementById("tickets");
let botonServiciosHtml = document.getElementById("servicios");

//recoger barra de navegacion para insertar debajo el section
let barraNav = document.getElementById("nav");

//crear elementos
const sectionElement = document.createElement("section");
sectionElement.className = "section";
sectionElement.style.background = "rgb(41, 207, 179)";

barraNav.insertAdjacentElement("afterend", sectionElement);

// añadir los eventos para el fech
botonServiciosHtml.addEventListener("click", async () => {
  resultadoConsulta = await getDatos("services/");
  crearFragmentoFetch(resultadoConsulta, "servicios");
  insertarHtml(fragTable, sectionElement);
});

botonTicketsHtml.addEventListener("click", async () => {
  resultadoConsulta = await getDatos("tickets/");
  crearFragmentoFetch(resultadoConsulta, "tickets");
  insertarHtml(fragTable, sectionElement);
});

/*  usuarios:

botonUsuariosHtml.addEventListener("click", async () => {
  resultadoConsulta = await getDatos("users/");
  console.log(resultadoConsulta);
}); */

const crearFragmentoFetch = (consulta, valor) => {
  console.log(valor);
  console.log(consulta);

  if (consulta.length <= 0) {
    let parrafoEstaVacio = document.createElement("p");
    parrafoEstaVacio.className = "text-center m-0 p-3";
    parrafoEstaVacio.innerText = "No hay datos que mostrar";
    insertarHtml(parrafoEstaVacio, fragTable);
  } else {
    let table = document.createElement("table");
    table.className = "table table-striped m-0 h-100";
    table.id = "tablaInformativa";

    if (valor == "servicios") {
      // creaacion de elementos para titulo
      let thead = document.createElement("thead");
      let tr1 = document.createElement("tr");
      let thCampo0 = document.createElement("th");
      let thCampo1 = document.createElement("th");
      let thCampo2 = document.createElement("th");
      let thCampo3 = document.createElement("th");

      thCampo0.innerText = "Tabla Servicios:";
      thCampo1.innerText = "Nombre";
      thCampo2.innerText = "Numero Actual";
      thCampo3.innerText = "#";

      tr1.appendChild(thCampo2);
      tr1.insertAdjacentElement("afterbegin", thCampo1);
      tr1.appendChild(thCampo3);

      thead.insertAdjacentElement("afterbegin", tr1);

      for (let i = 0; i < consulta.length; i++) {
        // instanciando servicio
        let servicio = new Servicio(consulta[i]);

        // creando los elementos necesarios
        let tr = document.createElement("tr");
        let tdCampo1 = document.createElement("td");
        let tdCampo2 = document.createElement("td");
        let tdCampo3 = document.createElement("td");
        let formborrar = document.createElement("form");
        let btnBorrar = document.createElement("button");

        // rellenar los campos
        tdCampo1.innerText = servicio.nombre;
        tdCampo2.innerText = servicio.numero;
        tdCampo3.className = "espaciadoBoton";

        // formulario para borrar
        btnBorrar.innerText = "borrar";
        btnBorrar.type = "submit";
        btnBorrar.className = "btnBorrar";
        btnBorrar.id = servicio._id;

        btnBorrar.addEventListener("click", () => {
          //hacer un fech para eliminar cuando se hace click
          const id = btnBorrar.id;
          fetch(`/services/${id}`, {
            method: "delete",
            "Content-Type": "application/json",
            body: JSON.stringify({ id: id }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            });

          console.log("hecho" + id);
        });

        //añadir a la tabla
        formborrar.appendChild(btnBorrar);
        tdCampo3.appendChild(formborrar);

        tr.appendChild(tdCampo2);
        tr.insertAdjacentElement("afterbegin", tdCampo1);
        tr.appendChild(tdCampo3);
        table.insertAdjacentElement("beforeend", tr);
      }
      table.insertAdjacentElement("afterbegin", thead);
    } else if (valor == "tickets") {
      // creaacion de elementos para titulo
      let thead = document.createElement("thead");
      let tr1 = document.createElement("tr");
      let thCampo1 = document.createElement("th");
      let thCampo2 = document.createElement("th");
      let thCampo3 = document.createElement("th");
      let thCampo4 = document.createElement("th");

      thCampo1.innerText = "Numero";
      thCampo2.innerText = "Id del Servicio";
      thCampo3.innerText = "Id del Usuario";
      thCampo4.innerText = "#";

      tr1.appendChild(thCampo2);
      tr1.insertAdjacentElement("afterbegin", thCampo1);
      tr1.appendChild(thCampo3);
      tr1.appendChild(thCampo4);

      thead.insertAdjacentElement("afterbegin", tr1);

      for (let i = 0; i < consulta.length; i++) {
        // instanciando ticket
        let ticket = new Ticket(consulta[i]);
        // creando los elementos necesarios
        let tr = document.createElement("tr");
        let tdCampo1 = document.createElement("td");
        let tdCampo2 = document.createElement("td");
        let tdCampo3 = document.createElement("td");
        let tdCampo4 = document.createElement("td");
        let formborrar = document.createElement("form");
        let btnBorrar = document.createElement("button");

        // rellenar los campos
        tdCampo1.innerText = ticket.numero;
        tdCampo2.innerText = ticket.id_servicio;
        tdCampo3.innerText = ticket.id_usuario;

        // formulario para borrar

        btnBorrar.innerText = "borrar";
        btnBorrar.type = "submit";
        btnBorrar.className = "btnBorrar";
        btnBorrar.id = ticket._id;

        btnBorrar.addEventListener("click", () => {
          //hacer un fech para eliminar cuando se hace click
          const id = btnBorrar.id;
          fetch(`/tickets/${id}`, {
            method: "delete",
            "Content-Type": "application/json",
            body: JSON.stringify({ id: id }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            });

          console.log("hecho" + id);
        });

        formborrar.appendChild(btnBorrar);
        tdCampo4.appendChild(formborrar);
        tdCampo4.className = "espaciadoBoton";

        tr.appendChild(tdCampo2);
        tr.insertAdjacentElement("afterbegin", tdCampo1);
        tr.appendChild(tdCampo3);
        tr.appendChild(tdCampo4);
        table.insertAdjacentElement("beforeend", tr);
      }
      table.insertAdjacentElement("afterbegin", thead);
    } else {
      // Ampliacion para la tabla de usuarios en el momento que se ponga un sistema login
      // actualmente trabajando en sistema login en clases de fernando 16/01/23
    }
    insertarHtml(table, fragTable);
  }
};

const insertarHtml = (elementoInsertar, lugar) => {
  if (lugar.childNodes.length > 0) {
    lugar.childNodes.forEach((element) => {
      element.remove();
    });
    lugar.appendChild(elementoInsertar);
  } else {
    lugar.appendChild(elementoInsertar);
  }
};

