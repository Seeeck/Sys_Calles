export const deleteDataCalle = async (id_calle) => {
  const resp = await fetch("http://127.0.0.1:8000/api/deleteCalle", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        id_calle:id_calle
    }
    )
  });
  const data = await resp.json();
  console.log(data);
  return data;
};
