export const saveCalle = async (
  nombre_calle,
  id_region,
  id_provincia,
  id_ciudad
) => {
  const resp = await fetch("http://127.0.0.1:8000/api/saveCalle", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre_calle: nombre_calle,
      region_fk: id_region,
      provincia_fk: id_provincia,
      ciudad_fk: id_ciudad,
    }),
  });
  const data = await resp.json();
  return data;
};
