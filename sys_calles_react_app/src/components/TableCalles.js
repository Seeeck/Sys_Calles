import React, { useEffect, useState } from "react";

import { TableRow } from "./TableRow";
import Pagination from "react-js-pagination";
import { OptionsSection } from "./OptionsSection";
import { getCallesByNombre } from "../helpers/getCallesByNombre";

export const TableCalles = () => {
  

  const [dataCalles, setCalles] = useState({
    calles: ''
  });

  const [inputForm,setInputForm]=useState("")
  

  //getDataCalles
  const getCalles = async (pageNumber = 1) => {
    const resp = await fetch(`http://127.0.0.1:8000/api/showCalle?page=${pageNumber}` );
    const data=await resp.json()
    setCalles({calles: data});
  };


  
  useEffect(() => {
    getCalles()
  }, []);

  
  return (
    <>
    
      <div className="row justify-content-center">
      
        <div className="col-9 gridCalles">
        <OptionsSection getCalles={getCalles} setCalles={setCalles} setInputForm={setInputForm} />
        <table className="table justify-content-center">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Provincia</th>
              <th scope="col">Region</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody>
            
            {dataCalles?.calles?.data?.map((calle) => {
              
              return <TableRow key={calle.id_calle} calle={calle} getCalles={getCalles} />
            })
            }
            
          </tbody>
          
        
        </table>
        <Pagination
          activePage={dataCalles?.calles?.current_page}
           itemsCountPerPage={dataCalles?.calles?.per_page}
           totalItemsCount={dataCalles?.calles?.total ? dataCalles?.calles?.total : 0}
           onChange={(pageNumber) => {
             if(inputForm.length>0){
              console.log("is true")
             console.log("input form mayor a 0")  
              getCallesByNombre(inputForm,pageNumber).then((data)=>{
                setCalles({calles:data})
              } 
              )
             }else{
              getCalles(pageNumber)
             }
                
           }}
           pageRangeDisplayed={3}
            itemClass="page-item"
            linkClass="page-link"
            prevPageText="Anterior"
            nextPageText="Siguiente"
            
          />
        </div>
     </div>
    
    </>
  );
};
