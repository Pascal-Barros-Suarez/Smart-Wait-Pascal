const getData = async (consulta) => {
  return fetch(`http://localhost:3000/${consulta}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const insertData = async (lugar, formData) => {
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

const updateData = async (lugar, formData) => {
  try {
    const response = await fetch(lugar, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteData = async (lugar, paramentros) => {
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

export { getData, insertData, updateData, deleteData };
