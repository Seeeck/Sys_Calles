import React, { useState } from "react";
import { getCallesByNombre } from "../helpers/getCallesByNombre";
export const SearchForm = (props) => {

    const handleInput=(e)=>{
        e.preventDefault()
        
        props.setInputForm(e.target.value)
        if(e.target.value.trim()==""){
            
            return props.getCalles()
        }

        getCallesByNombre(e.target.value,1).then(data=>{
            console.log(data)
            return props.setCalles({calles:data})
        })
        
    }
  return (
    <>
      <form onSubmit={(e)=>{e.preventDefault()}} className="row">

        <div className="form-group col ">
          <input
            onChange={(e)=>{handleInput(e)}}
            type="text"
            className="form-control"
            placeholder="Ingresa una calle a buscar"
          ></input>
        </div>
      </form>
    </>
  );
};
