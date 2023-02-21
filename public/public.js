//requires
//const sessions = require("./sessions.controller");
// sesiones de express en el front para express:

// imports
//consultas api
import {
  getData,
  insertData,
  updateData,
  deleteData,
} from "./clases/consultaApi.js";

import { Ticket } from "./clases/tickets.js";
import { Servicio } from "./clases/servicios.js";

//funciones
const insertarHtml = (elementoInsertar, lugar) => {
  if (lugar.childNodes.length > 0) {
    limpiarElementos(lugar);
    lugar.appendChild(elementoInsertar);
  } else {
    lugar.appendChild(elementoInsertar);
  }
};

const limpiarElementos = (lugarLimpiar) => {
  lugarLimpiar.childNodes.forEach((element) => {
    element.remove();
  });
};

const conseguirTablaServicio = async () => {
  resultadoConsulta = await getData("services/");
  crearFragmentoFetch(resultadoConsulta, "servicios");
  insertarHtml(fragTable, sectionElement);
  insertarHtml(btnServicioElement, divAñadirElement);
};

////////////////////////////////  fin de funciones  ////////////////////////////////

// recoger datos del front
// recoger botones del front
let botonUsuariosHtml = document.getElementById("usuarios");
let botonTicketsHtml = document.getElementById("tickets");
let botonServiciosHtml = document.getElementById("servicios");

//recoger barra de navegacion para insertar debajo el section
let barraNavHTML = document.getElementById("nav");
let footerHtml = document.getElementById("footer");
let logInOutHTML = document.getElementById("log-in-out");
// declarar variables
let resultadoConsulta;
let fragTable = document.createDocumentFragment();
let fragFormInsert = document.createDocumentFragment();
let fragFormUpdate = document.createDocumentFragment();

//crear elementos
const sectionElement = document.createElement("section");
sectionElement.className = "section h100";
sectionElement.style.background = "rgb(41, 207, 179)";

//btn servicio
let btnServicioElement = document.createElement("button");
btnServicioElement.className = "btn btn-success m-2";
btnServicioElement.textContent = "Añadir";
btnServicioElement.addEventListener("click", async () => {
  crearFragmentoFormularioInsert("Servicio");
  insertarHtml(fragFormInsert, sectionElement);
});

//btn ticket
let btnTicketElement = document.createElement("button");
btnTicketElement.className = "btn btn-success m-2";
btnTicketElement.textContent = "Añadir";
btnTicketElement.addEventListener("click", async () => {
  crearFragmentoFormularioInsert("Ticket");
  insertarHtml(fragFormInsert, sectionElement);
});

let divAñadirElement = document.createElement("div");
divAñadirElement.style.background = "rgb(41, 207, 179)";
divAñadirElement.className = "m-0 h-100";
divAñadirElement.id = "divAñadir";

// insertar elementos
barraNavHTML.insertAdjacentElement("afterend", sectionElement);
footerHtml.insertAdjacentElement("beforebegin", divAñadirElement);

// añadir los eventos para el fech
botonServiciosHtml.addEventListener("click", async () => {
  conseguirTablaServicio();
});

botonTicketsHtml.addEventListener("click", async () => {
  resultadoConsulta = await getData("tickets/");
  crearFragmentoFetch(resultadoConsulta, "tickets");
  insertarHtml(fragTable, sectionElement);
  insertarHtml(btnTicketElement, divAñadirElement);
});

/*  usuarios:

botonUsuariosHtml.addEventListener("click", async () => {
  resultadoConsulta = await getData("users/");
  console.log(resultadoConsulta);
}); 
*/

const crearFragmentoFetch = (consulta, valor) => {
  if (consulta.length <= 0) {
    let parrafoEstaVacioElement = document.createElement("p");
    parrafoEstaVacioElement.className = "text-center m-0 p-3";
    parrafoEstaVacioElement.innerText = "No hay datos que mostrar";
    insertarHtml(parrafoEstaVacioElement, fragTable);
  } else {
    let tableElement = document.createElement("table");
    tableElement.className = "table table-striped m-0 h-100";
    tableElement.id = "tablaInformativa";

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
        let btnUpdate = document.createElement("button");

        // rellenar los campos
        tdCampo1.innerText = servicio.nombre;
        tdCampo2.innerText = servicio.numero;
        tdCampo3.className = "espaciadoBoton p-2";

        // formulario para borrar
        btnBorrar.innerText = "borrar";
        btnBorrar.type = "submit";
        btnBorrar.className = "btnBorrar mt-1 mb-1 me-1";
        btnBorrar.id = servicio._id;

        btnBorrar.addEventListener("click", () => {
          const id = btnUpdate.id;
          deleteData(`services/${id}`, { id: id });
          console.log("borrado" + id);
        });
        // boton para actualizar
        btnUpdate.innerText = "Actualizar";
        btnUpdate.type = "submit";
        btnUpdate.className = "btnBorrar mt-1 mb-1 me-1";
        btnUpdate.id = servicio._id;

        btnUpdate.addEventListener("click", async () => {
          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

          console.log("en boton update", fragFormUpdate);

          let updateForm;
          updateForm = await crearFragmentoFormularioUpdate(
            "Servicio",
            btnUpdate.id
          );
          console.log("despues", updateForm);
          insertarHtml(updateForm, fragFormUpdate);
          insertarHtml(fragFormUpdate, sectionElement);
          console.log("en boton update", fragFormUpdate);

          console.log("actualizado " + btnUpdate.id);
        });

        //añadir a la tabla
        formborrar.appendChild(btnBorrar);
        formborrar.appendChild(btnUpdate);
        tdCampo3.appendChild(formborrar);

        tr.appendChild(tdCampo2);
        tr.insertAdjacentElement("afterbegin", tdCampo1);
        tr.appendChild(tdCampo3);
        tableElement.insertAdjacentElement("beforeend", tr);
      }
      tableElement.insertAdjacentElement("afterbegin", thead);
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
          const lugar = "tickets/";
          deleteData(lugar, { id: id });
          console.log("hecho" + id);
        });

        formborrar.appendChild(btnBorrar);
        tdCampo4.appendChild(formborrar);
        tdCampo4.className = "espaciadoBoton";

        tr.appendChild(tdCampo2);
        tr.insertAdjacentElement("afterbegin", tdCampo1);
        tr.appendChild(tdCampo3);
        tr.appendChild(tdCampo4);
        tableElement.insertAdjacentElement("beforeend", tr);
      }
      tableElement.insertAdjacentElement("afterbegin", thead);
    } else {
      // Ampliacion para la tabla de usuarios en el momento que se ponga un sistema login
      // actualmente trabajando en sistema login en clases de fernando 16/01/23
    }
    insertarHtml(tableElement, fragTable);
  }
};

const crearFragmentoFormularioInsert = (valor) => {
  sectionElement.className = "section h100 p-2";
  limpiarElementos(divAñadirElement);
  let formElement = document.createElement("form");
  formElement.className = "form mt-3 h100";
  //formElement.setAttribute('method', "Post");
  //formElement.setAttribute('action', "/services/");

  if (valor === "Servicio") {
    let H1Element = document.createElement("h1");
    H1Element.className = "h1 m-3 text-center";
    H1Element.innerText = "Añadir Servicio";

    let div1Element = document.createElement("div");
    div1Element.className = "mb-3";

    let div2Element = document.createElement("div");
    div2Element.className = "mb-3";

    let labelNombreElement = document.createElement("label");
    labelNombreElement.setAttribute("for", "nombre");
    labelNombreElement.className = "form-label";
    labelNombreElement.innerText = "Nombre:";

    let labelNumeroElement = document.createElement("label");
    labelNumeroElement.setAttribute("for", "numero");
    labelNumeroElement.className = "form-label";
    labelNumeroElement.innerText = "Numero ";

    let inputNombreElement = document.createElement("input");
    inputNombreElement.type = "text";
    inputNombreElement.className = "form-control";
    inputNombreElement.id = "nombre";

    let inputNumeroElement = document.createElement("input");
    inputNumeroElement.type = "number";
    inputNumeroElement.className = "form-control";
    inputNumeroElement.id = "numero";

    let btnAñadir = document.createElement("button");
    btnAñadir.className = "btn btn-success m-2";
    btnAñadir.innerText = "Añadir";
    btnAñadir.type = "submit";
    btnAñadir.addEventListener("click", async (e) => {
      e.preventDefault();
      const formData = {
        nombre: document.querySelector("#nombre").value,
        numero: document.querySelector("#numero").value,
      };

      await insertData("services/", formData);
      conseguirTablaServicio();
    });

    div1Element.appendChild(inputNombreElement);
    div1Element.insertAdjacentElement("afterbegin", labelNombreElement);

    div2Element.appendChild(labelNumeroElement);
    div2Element.insertAdjacentElement("beforeend", inputNumeroElement);

    formElement.appendChild(div1Element);
    formElement.appendChild(div2Element);
    formElement.appendChild(btnAñadir);
    formElement.insertAdjacentElement("afterbegin", H1Element);
  } else if (valor === "Ticket") {
    /////////
  } else {
    //////////////
  }
  insertarHtml(formElement, fragFormInsert);
};

const crearFragmentoFormularioUpdate = async (valor, id) => {
  sectionElement.className = "section h100 p-2";
  limpiarElementos(divAñadirElement);
  let formElementUpdate = document.createElement("form");
  formElementUpdate.className = "form mt-3 h100";

  if (valor === "Servicio") {
    const servicio = await getData(`services/${id}`);
    // console.log(servicio);

    let H1Element = document.createElement("h1");
    H1Element.className = "h1 m-3 text-center";
    H1Element.innerText = "Actualizar Servicio";

    let div1Element = document.createElement("div");
    div1Element.className = "mb-3";

    let div2Element = document.createElement("div");
    div2Element.className = "mb-3";

    let labelNombreElement = document.createElement("label");
    labelNombreElement.setAttribute("for", "nombre");
    labelNombreElement.className = "form-label";
    labelNombreElement.innerText = "Nombre:";

    let labelNumeroElement = document.createElement("label");
    labelNumeroElement.setAttribute("for", "numero");
    labelNumeroElement.className = "form-label";
    labelNumeroElement.innerText = "Numero ";

    let inputNombreElement = document.createElement("input");
    inputNombreElement.type = "text";
    inputNombreElement.className = "form-control";
    inputNombreElement.id = "nombre";
    inputNombreElement.value = servicio.nombre;
    inputNombreElement.placeholder = servicio.nombre;

    let inputNumeroElement = document.createElement("input");
    inputNumeroElement.type = "number";
    inputNumeroElement.className = "form-control";
    inputNumeroElement.id = "numero";
    inputNumeroElement.value = servicio.numeroActual;
    inputNumeroElement.placeholder = servicio.numeroActual;

    let btnActualizar = document.createElement("button");
    btnActualizar.className = "btn btn-success m-2";
    btnActualizar.innerText = "Actualizar";
    btnActualizar.type = "submit";
    btnActualizar.addEventListener("click", async (e) => {
      e.preventDefault();
      const formData = {
        nombre: document.querySelector("#nombre").value,
        numero: document.querySelector("#numero").value,
      };

      await updateData(`services/${id}`, formData);
      conseguirTablaServicio();
    });

    div1Element.appendChild(inputNombreElement);
    div1Element.insertAdjacentElement("afterbegin", labelNombreElement);

    div2Element.appendChild(labelNumeroElement);
    div2Element.insertAdjacentElement("beforeend", inputNumeroElement);

    formElementUpdate.appendChild(div1Element);
    formElementUpdate.appendChild(div2Element);
    formElementUpdate.appendChild(btnActualizar);
    formElementUpdate.insertAdjacentElement("afterbegin", H1Element);
  } else if (valor === "Ticket") {
    /////////
  } else {
    //////////////
  }
  console.log("al crear el form", formElementUpdate);
  return formElementUpdate;
  // insertarHtml(formElementUpdate, sectionElement);
};
