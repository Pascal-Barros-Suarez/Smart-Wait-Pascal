const getDatos = async (consulta) => {
  return fetch(`http://localhost:3000/${consulta}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const deleteDatos = async (lugar, paramentros) => {
  return fetch(`http://localhost:3000/${lugar}`, {
    method: "delete",
    "Content-Type": "application/json",
    body: JSON.stringify({ paramentros }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log("borrado");
    });
};

const anadirDatos = async (lugar, formData) => {
  return fetch(`http://localhost:3000/${lugar}`, {
    method: "POST",
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta del servidor: ", data);
    })
    .catch((error) => {
      console.error("Error en la petición: ", error);
    });
};
export { getDatos, deleteDatos, anadirDatos };
