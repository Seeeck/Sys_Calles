import React, { useState, useEffect } from "react";
import { saveCalle } from "../helpers/postSaveCalle";
import {SearchForm} from "./SearchForm";

import Modal from "react-bootstrap/Modal";
export const OptionsSection = (props) => {
  //Estado de modal
  const [isOpen, setIsOpen] = React.useState(false);

  //Estados de opciones de selects
  const [dataRegiones, setRegiones] = useState([]);
  const [dataProvincia, setProvincias] = useState([]);
  const [dataCiudad, setCiudades] = useState([]);

  //Estados de selecciond de inputs
  const [inputNombre, setInputNombre] = useState("");
  const [region, setRegion] = useState(0);
  const [provincia, setProvincia] = useState(0);
  const [ciudad, setCiudad] = useState(0);

  //Estados de validacion
  const [nombreValid, setNombreValid] = useState(true);
  const [regionValid, setRegionValid] = useState(true);
  const [provinciaValid, setProvinciaValid] = useState(true);
  const [ciudadValid, setCiudadValid] = useState(true);

  //Variable de post resuelto
  const [isPost, setPostValid] = useState(false);

  //Ordenar en helpers
  //getDataRegiones
  const getRegiones = async () => {
    const resp = await fetch("http://127.0.0.1:8000/api/regiones");
    const data = await resp.json();
    setRegiones(data);
  };

  //getDataProvinciasByRegion
  const getProvincias = async (e) => {
    if (e.target.value !== 0) {
      setCiudades([]);
      setProvincias([]);
      const id = e.target.value;
      const resp = await fetch(
        "http://127.0.0.1:8000/api/provincias?id_region=" + id
      );
      const data = await resp.json();
      setProvincias(data);
    } else {
      setCiudades([]);
      setProvincias([]);
    }
  };

  //getDataCiudadesByProvincia
  const getCiudades = async (e) => {
    const id = e.target.value;
    const resp = await fetch(
      "http://127.0.0.1:8000/api/ciudades?id_provincia=" + id
    );
    const data = await resp.json();
    setCiudades(data);
  };

  //Obtener nombre de la calle
  const handleInput = (e) => {
    setInputNombre(e.target.value);
  };

  const handleChangeRegion = (e) => {
    setRegion(e.target.value);
  };

  const handleChangeProvincia = (e) => {
    setProvincia(e.target.value);
  };

  const handleChangeCiudad = (e) => {
    setCiudad(e.target.value);
  };

  //Mostrar modal
  const showModal = () => {
    setIsOpen(true);
  };

  //Esconder modal
  const hideModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valueNombre = e.target[0].value.trim();
    const valueRegion = e.target[1].value;
    const valueProvincia = e.target[2].value;
    const valueCiudad = e.target[3].value;

    //Validacion
    if (valueNombre.length <= 2) {
      return setNombreValid(false);
    }

    setNombreValid(true);

    if (valueRegion == "") {
      return setRegionValid(false);
    }
    setRegionValid(true);

    if (valueProvincia == "") {
      return setProvinciaValid(false);
    }
    setProvinciaValid(true);

    if (valueCiudad == "") {
      return setCiudadValid(false);
    }
    setCiudadValid(true);

    //Submit
    //evaluar los target del submit
    if (valueRegion !== "0" && valueProvincia !== "0" && valueCiudad !== "0") {
      saveCalle(
        inputNombre,
        parseInt(valueRegion),
        parseInt(valueProvincia),
        parseInt(valueCiudad)
      ).then(() => {
        setPostValid(true);
      });
    }
  };

  const resetSubmit = (e) => {
    setPostValid(false);
    setInputNombre("");
    setRegion("0");
    setProvincia("0");
    setCiudad("0");
  };

  useEffect(() => {
    getRegiones();
  }, []);

  return (
    <>
      <div className="optionsSection row justify-content-between">

        <button
          className="col-2 btn btn-primary"
          onClick={() => {
            showModal();
          }}
        >
          Ingresar calle
        </button>

        <Modal
          show={isOpen}
          onHide={hideModal}
          backdrop="static"
          keyboard={false}
        >
          {isPost && (
            <>
              <Modal.Header></Modal.Header>
              <Modal.Body>
                <div className="row justify-content-center">
                  <img
                    id="successLogo"
                    src={require("../img/success.png")}
                  ></img>
                  <h3 className="text-center">Calle Ingresada correctamente</h3>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  onClick={(e) => {
                    hideModal();
                    resetSubmit();
                  }}
                  type="button"
                  className="btn btn-success"
                >
                  Cerrar
                </button>
              </Modal.Footer>
            </>
          )}

          {!isPost && (
            <form id="formCalle" onSubmit={handleSubmit}>
              <Modal.Header>
                <Modal.Title>
                  <h5 className="modal-title">Ingresar Calle</h5>
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="input-group mb-3">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Nombre
                  </span>
                  <input
                    onChange={(e) => {
                      handleInput(e);
                    }}
                    value={inputNombre}
                    type="text"
                    className={`form-control ${!nombreValid && "is-invalid"} ${
                      nombreValid && ""
                    }`}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  ></input>
                  <div className="invalid-feedback">
                    Ingrese una calle mayor a 2 caracteres
                  </div>
                </div>
                {
                  //Region
                }
                <div className="input-group mb-3">
                  <label className="input-group-text">Region</label>
                  <select
                    defaultValue={region}
                    onChange={(e) => {
                      getProvincias(e);
                      handleChangeRegion(e);
                    }}
                    className={`form-select ${!regionValid && "is-invalid"} ${
                      regionValid && ""
                    }`}
                    id="inputGroupSelect01"
                  >
                    <option key={0} value={""}>
                      Seleccionar region
                    </option>
                    {dataRegiones?.map((region) => {
                      return (
                        <option key={region.id_region} value={region.id_region}>
                          {region.nombre_region}
                        </option>
                      );
                    })}
                  </select>
                  <div className="invalid-feedback">Ingrese una region</div>
                </div>

                {
                  //Provincia
                }
                <div className="input-group mb-3">
                  <label className="input-group-text">Provincia</label>
                  <select
                    defaultValue={provincia}
                    onChange={(e) => {
                      getCiudades(e);
                      handleChangeProvincia(e);
                    }}
                    className={`form-select ${
                      !provinciaValid && "is-invalid"
                    } ${provinciaValid && ""}`}
                    id="inputGroupSelect01"
                  >
                    <option key={0} value={""}>
                      Seleccionar provincia
                    </option>
                    {dataProvincia?.map((prov) => {
                      return (
                        <option
                          key={prov.id_provincia}
                          value={prov.id_provincia}
                        >
                          {prov.nombre_provincia}
                        </option>
                      );
                    })}
                  </select>
                  <div className="invalid-feedback">Ingrese una provincia</div>
                </div>

                {
                  //Ciudad
                }
                <div className="input-group mb-3">
                  <label className="input-group-text">Ciudad</label>
                  <select
                    itemID="selectCiudad"
                    className={`form-select ${!ciudadValid && "is-invalid"} ${
                      ciudadValid && ""
                    }`}
                    defaultValue={ciudad}
                    onChange={(e) => {
                      handleChangeCiudad(e);
                    }}
                  >
                    <option key={0} value={""}>
                      Seleccionar ciudad
                    </option>
                    {dataCiudad?.map((ciu) => {
                      return (
                        <option key={ciu.id_ciudad} value={ciu.id_ciudad}>
                          {ciu.nombre_ciudad}
                        </option>
                      );
                    })}
                  </select>
                  <div className="invalid-feedback">Ingrese una ciudad</div>
                </div>
              </Modal.Body>

              <Modal.Footer className="justify-content-center">
                <input
                  onClick={() => {
                    hideModal();
                  }}
                  type="submit"
                  className="btn btn-danger col-4"
                  value="Salir"
                />
                <input
                  type="submit"
                  className="btn btn-success col-4"
                  value="Guardar"
                />
              </Modal.Footer>
            </form>
          )}
        </Modal>

        <div className="col-5">
        <SearchForm getCalles={props.getCalles} setCalles={props.setCalles} setInputForm={props.setInputForm}  />
        </div>
        
     
       

      </div>
    </>
  );
};
