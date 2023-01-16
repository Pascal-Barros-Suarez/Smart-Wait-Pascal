const getDatos = async (consulta) => {
  return fetch(`http://localhost:3000/${consulta}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export { getDatos };
