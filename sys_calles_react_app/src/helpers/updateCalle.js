export const updateCalle=async(id_calle,nombre_calle)=>{
    
    const resp=await fetch("http://127.0.0.1:8000/api/updateCalle",
    {
        method:'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_calle:id_calle,
            nombre_calle:nombre_calle
        }),

    })
    const data=await resp.json()
    return  data.actualizada;
}