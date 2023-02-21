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
  try {
    const response = await fetch(`http://localhost:3000/${lugar}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
export { getDatos, deleteDatos, anadirDatos };
