export const getCallesByNombre=async (nombre_calle,page_number="1")=>{
    const resp=await fetch("http://127.0.0.1:8000/api/showCalleByNombre?page="+page_number+"&nombre="+nombre_calle,{
        method:"GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
    })
    const data =await resp.json()
    return data;

}