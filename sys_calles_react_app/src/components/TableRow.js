import React from "react";
import Modal from "react-bootstrap/Modal";
import { deleteDataCalle } from "../helpers/deleteDataCalle";
import { updateCalle } from "../helpers/updateCalle";

export const TableRow = (props) => {
  const calle = props.calle;
  //Estado de modal
  const [isOpen, setIsOpen] = React.useState(false);
  //Estado de eliminacion
  const [isDeleted, setIsDeleted] = React.useState(false);
  //Estado de actualizacion
  const [isUpdated, setIsUpdated] = React.useState(false);
  //Opcion de modal
  const [modalOption, setModalOption] = React.useState(false);
  //inputCalle
  const [inputCalle, setInputCalle] = React.useState(calle.nombre);
  //Valida calle
  const [nombreValid, setNombreValid] = React.useState(true);
  //Variable de post resuelto
  const [isPost, setPostValid] = React.useState(false);

  //Mostrar modal
  const showModal = (numero) => {
    if (numero == 1) {
      setModalOption(false);
      setIsOpen(true);
    }
    if (numero == 2) {
      setModalOption(true);
      setIsOpen(true);
    }
  };

  //Esconder modal
  const hideModal = () => {
    setIsOpen(false);
  };

  //ELiminar calle
  const handleDelete = () => {
    deleteDataCalle(calle.id_calle).then((data) => {
      if (data.eliminada) {
        setIsDeleted(true);
      }
    });
  };

  //Update calle
  const handleSubmit = (e) => {
    e.preventDefault();
    let valueNombre = e.target[0].value.trim();

    if (valueNombre.length <= 2) {
      return setNombreValid(false);
    }

    updateCalle(calle.id_calle,valueNombre).then((data) => {
      if (data == true) {
        setPostValid(true);
        console.log("submit realizado");
      }
    });
  };

  const resetSubmit = (e) => {
    setPostValid(false);
    setInputCalle("");
   
  };

  return (
    <>
      <tr>
        <td>{calle.id_calle}</td>
        <td>{calle.nombre}</td>
        <td>{calle.ciudad}</td>
        <td>{calle.provincia}</td>
        <td>{calle.region}</td>
        <td>
          <div className="row justify-content-around">
            <button
              type="button"
              data={calle.id_calle}
              className="btn col-5 btn-primary"
              onClick={() => {
                showModal(1);
              }}
            >
              Editar
            </button>
            <button
              type="button"
              data={calle.id_calle}
              className="btn col-6 btn-danger"
              onClick={() => {
                showModal(2);
              }}
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>

      <Modal
        show={isOpen}
        onHide={hideModal}
        backdrop="static"
        keyboard={false}
      >
        {
          //Actualizar Calle
        }

        {!modalOption && (
          <>
            {isPost && (
              <>
                <Modal.Header></Modal.Header>
                <Modal.Body>
                  <div className="row justify-content-center">
                    <img
                      id="successLogo"
                      src={require("../img/success.png")}
                    ></img>
                    <h3 className="text-center">
                      Calle actualizada correctamente
                    </h3>
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
              <>
                <Modal.Header>
                  <h4>Editar calle "{calle.nombre}"</h4>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                  <Modal.Body>
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroup-sizing-default"
                          >
                            Calle
                          </span>
                        </div>
                        <input
                          type="text"
                          className={`form-control ${
                            !nombreValid && "is-invalid"
                          } ${nombreValid && ""}`}
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                        ></input>
                        <div className="invalid-feedback">
                          Ingrese una calle mayor a 2 caracteres
                        </div>
                      </div>
                      {
                        //region
                      }
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroup-sizing-default"
                          >
                            Region
                          </span>
                        </div>
                        <input
                          disabled
                          type="text"
                          className="form-control"
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          value={calle.region}
                        ></input>
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroup-sizing-default"
                          >
                            Provincia
                          </span>
                        </div>
                        <input
                          disabled
                          type="text"
                          className="form-control"
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          value={calle.provincia}
                        ></input>
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroup-sizing-default"
                          >
                            Ciudad
                          </span>
                        </div>
                        <input
                          disabled
                          type="text"
                          className="form-control"
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          value={calle.ciudad}
                        ></input>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <input
                      type="submit"
                      className="btn btn-success col-4"
                      value="Guardar"
                    />
                    <input
                      onClick={() => {
                        hideModal();
                      }}
                      type="submit"
                      className="btn btn-danger col-4"
                      value="Salir"
                    />
                  </Modal.Footer>
                </form>
              </>
            )}
          </>
        )}

        {
          //Borrar Calle
        }
        {modalOption && (
          <>
            {isDeleted && (
              <>
                <Modal.Body>
                  <div className="row justify-content-center">
                    <img
                      id="successLogo"
                      src={require("../img/success.png")}
                    ></img>
                    <h3 className="text-center">Calle eliminada</h3>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    onClick={(e) => {
                      hideModal();
                      props.getCalles();
                    }}
                    type="button"
                    className="btn btn-success"
                  >
                    Cerrar
                  </button>
                </Modal.Footer>
              </>
            )}

            {!isDeleted && (
              <>
                <Modal.Header>
                  <h4>¿Seguro que quiere eliminar calle "{calle.nombre}"?</h4>
                </Modal.Header>

                <Modal.Body>
                  <h5>Identificador: {calle.id_calle}</h5>
                  <h5>Region: {calle.region}</h5>
                  <h5>Provincia: {calle.provincia}</h5>
                  <h5>Ciudad: {calle.ciudad}</h5>
                </Modal.Body>

                <Modal.Footer>
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
                    value="Eliminar"
                    onClick={handleDelete}
                  />
                </Modal.Footer>
              </>
            )}
          </>
        )}
      </Modal>
    </>
  );
};
