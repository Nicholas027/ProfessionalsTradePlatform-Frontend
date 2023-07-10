import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../app/api/api";
import Swal from "sweetalert2";

const MisSolicitudes = () => {
  const { nombre, apellido, email } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [userId, setUserId] = useState();
  const [fechaActual, setFechaActual] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await api.get(`/auth/getInfo/${email}`);
        console.log(response);
        setSolicitudes(response.data.misSolicitudes);
        setUserId(response.data._id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSolicitudes();
  }, [email]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentFechaActual = new Date().toISOString().split("T")[0];
      if (currentFechaActual !== fechaActual) {
        setFechaActual(currentFechaActual);
      }
    }, 1000 * 60); // Actualiza la fecha cada minuto

    return () => {
      clearInterval(interval);
    };
  }, [fechaActual]);

  const cancelarSolicitud = (id, profesionalId) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estas seguro de cancelar esta solicitud?",
      text: "Esta solicitud será cancelada y eliminada de tu registro de solicitudes",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "No, cancelar",
      denyButtonText: `Si, cancelar solicitud`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        eliminarSolicitud(id, profesionalId);
        Swal.fire("Solicitud eliminada correctamente!", "", "success");
        setTimeout(() => window.location.reload(), 2000);
      }
    });
  };

  const cancelarPropuesta = (id, profesionalId) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estas seguro de cancelar esta propuesta?",
      text: "Esta propuesta será cancelada y eliminada de tu registro de solicitudes, la misma accion será notificada al respectivo profesional contactado",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "No, cancelar",
      denyButtonText: `Si, cancelar propuesta`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        eliminarPropuesta(id, profesionalId);
        Swal.fire("Solicitud eliminada correctamente!", "", "success");
        setTimeout(() => window.location.reload(), 2000);
      }
    });
  };

  const borrarSolicitudCompletada = (id, profesionalId) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estas seguro de eliminar esta solicitud?",
      text: "Esta solicitud será eliminada de tu registro de solicitudes",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "No, cancelar",
      denyButtonText: `Si, eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        eliminarSolicitudLista(id, profesionalId);
        Swal.fire("Solicitud eliminada correctamente!", "", "success");
        setTimeout(() => window.location.reload(), 2000);
      }
    });
  };

  const eliminarSolicitud = async (id, profesionalId) => {
    try {
      const response = await api
        .post(`/auth/deleteSoli/${id}`, {
          userId: userId,
          professionalId: profesionalId,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarPropuesta = async (id, profesionalId) => {
    try {
      const response = await api
        .post(`/auth/deleteProp/${id}`, {
          userId: userId,
          professionalId: profesionalId,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarSolicitudLista = async (id, profesionalId) => {
    try {
      const response = await api
        .post(`/auth/deleteSoliCompleted/${id}`, {
          userId: userId,
          professionalId: profesionalId,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const aceptarPropuesta = async (id, profesionalId) => {
    try {
      const response = await api
        .post(`/auth/acceptProp/${id}`, {
          userId: userId,
          professionalId: profesionalId,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Propuesta Aceptada con Exito!",
      }).then(setTimeout(() => window.location.reload(), 2000));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          marginBottom: "600px",
          marginLeft: "140px",
          fontFamily: "Lexend",
          fontWeight: "300",
        }}
        className="p-4 div-mis-solicitudes"
      >
        <h4 className="mb-3">
          Tus solicitudes ({solicitudes.length > 0 ? solicitudes.length : 0}
          ):{" "}
          <b>
            {nombre} {apellido}
          </b>
        </h4>

        {solicitudes.length > 0 ? (
          solicitudes.map((solicitud) => (
            <div
              className="card mb-3"
              style={{ width: "800px" }}
              key={solicitud._id}
            >
              <div className="card-header bg-light">
                {" "}
                <h5 className="card-title mt-2">
                  <b>Profesional:</b> {solicitud.profesional} -{" "}
                  {solicitud.profesion}
                </h5>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <b>Descripcion del trabajo:</b> {solicitud.descripcion}
                </p>
                <>
                  {solicitud.fecha.length > 1 ? (
                    <p>
                      <b>Fechas elegidas por usted:</b> desde{" "}
                      {solicitud.fecha[0]} hasta{" "}
                      {solicitud.fecha[solicitud.fecha.length - 1]}
                    </p>
                  ) : (
                    <p>
                      <b>Fecha:</b> {solicitud.fecha[0]}
                    </p>
                  )}
                </>
                <p className="card-text">
                  <b>Horario:</b> {solicitud.horario}
                </p>
                <div>
                  <b>Estado:</b>{" "}
                  {solicitud.aceptado === null && (
                    <>
                      <span style={{ color: "#FA7C1F" }}>
                        <b>En espera</b>{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-hourglass"
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#FA7C1F"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M6.5 7h11" />
                          <path d="M6.5 17h11" />
                          <path d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
                          <path d="M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1z" />
                        </svg>
                      </span>
                      <br />

                      <div
                        className="btn btn-danger mt-3"
                        onClick={() =>
                          cancelarSolicitud(
                            solicitud._id,
                            solicitud.profesionalId
                          )
                        }
                      >
                        Cancelar solicitud
                      </div>
                    </>
                  )}
                  {solicitud.aceptado === true &&
                    solicitud.propAceptada === null && (
                      <>
                        <span style={{ color: "#007bff" }}>
                          <b>Aceptado por el profesional</b>{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-calendar-check"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#007bff"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6" />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                            <path d="M4 11h16" />
                            <path d="M15 19l2 2l4 -4" />
                          </svg>
                        </span>{" "}
                        <p className="mt-2">
                          <b>Presupuesto:</b> ${solicitud.presupuesto}
                        </p>
                        <p className="mt-2">
                          <b>Fecha elegida por el profesional:</b>{" "}
                          {solicitud.fechaElegida}
                        </p>
                        <p className="mt-2">
                          <b>Comentarios:</b> {solicitud.comentario}
                        </p>
                        <div
                          className="btn btn-success"
                          onClick={() =>
                            aceptarPropuesta(
                              solicitud._id,
                              solicitud.profesionalId
                            )
                          }
                        >
                          Aceptar propuesta
                        </div>
                        <div
                          className="btn btn-danger"
                          style={{ marginLeft: "10px" }}
                          onClick={() =>
                            cancelarPropuesta(
                              solicitud._id,
                              solicitud.profesionalId
                            )
                          }
                        >
                          Cancelar propuesta
                        </div>
                      </>
                    )}
                  {solicitud.aceptado === true &&
                    solicitud.propAceptada === true &&
                    fechaActual <= solicitud.fechaElegida && (
                      <>
                        <span style={{ color: "#00b341" }}>
                          <b>Confirmada</b>{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-checkbox"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M9 11l3 3l8 -8"></path>
                            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"></path>
                          </svg>
                        </span>{" "}
                        <p className="mt-2">
                          <b>Presupuesto:</b> ${solicitud.presupuesto}
                        </p>
                        <p className="mt-2">
                          <b>Fecha elegida por el profesional:</b>{" "}
                          {solicitud.fechaElegida}
                        </p>
                        <p className="mt-2">
                          <b>Comentarios:</b> {solicitud.comentario}
                        </p>
                        <p className="mt-2">
                          <b>
                            Puedes comunicarte con él mediante su numero de
                            celular:
                          </b>{" "}
                          {solicitud.numeroProfesional}
                        </p>
                      </>
                    )}
                  {solicitud.aceptado === true &&
                    solicitud.propAceptada === true &&
                    fechaActual > solicitud.fechaElegida && (
                      <>
                        <span style={{ color: "#00b341" }}>
                          <b>Trabajo Realizado</b>{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-checkbox"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M9 11l3 3l8 -8"></path>
                            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"></path>
                          </svg>
                        </span>{" "}
                        <NavLink
                          to={`/dash/professionals/${solicitud.profesion}/${solicitud.profesionalId}/${solicitud._id}/calificacion`}
                          style={{ textDecoration: "none" }}
                        >
                          - Si lo deseas puedes comentar y calificar sus
                          servicios aquí!
                        </NavLink>
                        <p className="mt-2">
                          <b>Presupuesto:</b> ${solicitud.presupuesto}
                        </p>
                        <p className="mt-2">
                          <b>Fecha elegida por el profesional:</b>{" "}
                          {solicitud.fechaElegida}
                        </p>
                        <p className="mt-2">
                          <b>Comentarios:</b> {solicitud.comentario}
                        </p>
                        <div
                          className="btn btn-danger"
                          onClick={() =>
                            borrarSolicitudCompletada(
                              solicitud._id,
                              solicitud.profesionalId
                            )
                          }
                        >
                          Eliminar{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginBottom: "5px" }}
                            class="icon icon-tabler icon-tabler-trash"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M4 7l16 0"></path>
                            <path d="M10 11l0 6"></path>
                            <path d="M14 11l0 6"></path>
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                          </svg>
                        </div>
                      </>
                    )}
                  {solicitud.aceptado === false && (
                    <>
                      <span style={{ color: "#ff2825" }}>
                        <b>Rechazado por el profesional</b>{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-briefcase-off"
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#ff2825"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M11 7h8a2 2 0 0 1 2 2v8m-1.166 2.818a1.993 1.993 0 0 1 -.834 .182h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" />
                          <path d="M8.185 4.158a2 2 0 0 1 1.815 -1.158h4a2 2 0 0 1 2 2v2" />
                          <path d="M12 12v.01" />
                          <path d="M3 13a20 20 0 0 0 11.905 1.928m3.263 -.763a20 20 0 0 0 2.832 -1.165" />
                          <path d="M3 3l18 18" />
                        </svg>
                      </span>{" "}
                      <NavLink
                        to={`/dash/professionals/${solicitud.profesion}/${solicitud.profesionalId}`}
                        style={{ textDecoration: "none" }}
                      >
                        - Si lo deseas puedes volver a contactarlo aquí!
                      </NavLink>
                      <div
                        className="btn btn-danger mt-3"
                        onClick={() =>
                          borrarSolicitudCompletada(
                            solicitud._id,
                            solicitud.profesionalId
                          )
                        }
                      >
                        Eliminar{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginBottom: "5px" }}
                          class="icon icon-tabler icon-tabler-trash"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M4 7l16 0"></path>
                          <path d="M10 11l0 6"></path>
                          <path d="M14 11l0 6"></path>
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>
            <i>No tienes solicitudes aún.</i>
          </p>
        )}
      </div>
    </>
  );
};

export default MisSolicitudes;
