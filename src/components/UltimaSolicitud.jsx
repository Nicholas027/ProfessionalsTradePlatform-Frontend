import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import api from "../app/api/api";
import { NavLink } from "react-router-dom";

const MisSolicitudes = () => {
  const { email } = useAuth();
  const [ultimaSolicitud, setUltimaSolicitud] = useState(null);
  const [fechaActual, setFechaActual] = useState(
    new Date().toISOString().split("T")[0]
  );

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchUltimaSolicitud = async () => {
      try {
        const response = await api.get(`/auth/getInfo/${email}`);

        const misSolicitudes = response.data.misSolicitudes;
        const ultimaSolicitud = misSolicitudes[misSolicitudes.length - 1];
        setUltimaSolicitud(ultimaSolicitud);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUltimaSolicitud();
  }, [email]);

  return (
    <>
      <div
        style={{
          marginBottom: "600px",
          marginLeft: "140px",
          fontFamily: "Lexend",
          fontWeight: "300",
        }}
        className="div-ultima-solicitud"
      >
        <div>
          <h3
            style={{
              textAlign: "left",
              marginLeft: "1.5vw",
              marginTop: "-8px",
            }}
          >
            <br></br>
            Historial de Solicitudes de Trabajo: <b>Última Solicitud</b><br></br>
          </h3>
        </div>
        <br></br>
        {ultimaSolicitud ? (
          <div
            className="col-md-3"
            style={{ marginLeft: "1.5vw", marginBottom: "20px" }}
          >
            <div className="card" style={{ width: "800px" }}>
              <div className="card-header bg-light">
                {" "}
                <h5 className="card-title mt-2">
                  <b>Profesional:</b> {ultimaSolicitud.profesional} -{" "}
                  {ultimaSolicitud.profesion}
                </h5>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <b>Descripcion del trabajo:</b> {ultimaSolicitud.descripcion}
                </p>
                <>
                  {ultimaSolicitud.fecha.length > 1 ? (
                    <p>
                      <b>Fechas elegidas por usted:</b> desde{" "}
                      {ultimaSolicitud.fecha[0]} hasta{" "}
                      {ultimaSolicitud.fecha[ultimaSolicitud.fecha.length - 1]}
                    </p>
                  ) : (
                    <p>
                      <b>Fecha:</b> {ultimaSolicitud.fecha[0]}
                    </p>
                  )}
                </>
                <p className="card-text">
                  <b>Horario:</b> {ultimaSolicitud.horario}
                </p>
                <div>
                  <b>Estado:</b>{" "}
                  {ultimaSolicitud.aceptado === null && (
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
                    </>
                  )}
                  {ultimaSolicitud.aceptado === true &&
                    ultimaSolicitud.propAceptada === null && (
                      <>
                        <span style={{ color: "#007bff" }}>
                          <b>
                            Aceptado por el profesional (en espera a que usted
                            acepte su propuesta)
                          </b>{" "}
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
                          <b>Presupuesto:</b> ${ultimaSolicitud.presupuesto}
                        </p>
                        <p className="mt-2">
                          <b>Fecha elegida por el profesional:</b>{" "}
                          {ultimaSolicitud.fechaElegida}
                        </p>
                        <p className="mt-2">
                          <b>Comentarios:</b> {ultimaSolicitud.comentario}
                        </p>
                      </>
                    )}
                  {ultimaSolicitud.aceptado === true &&
                    ultimaSolicitud.propAceptada === true &&
                    fechaActual <= ultimaSolicitud.fechaElegida && (
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
                          <b>Presupuesto:</b> ${ultimaSolicitud.presupuesto}
                        </p>
                        <p className="mt-2">
                          <b>Fecha elegida por el profesional:</b>{" "}
                          {ultimaSolicitud.fechaElegida}
                        </p>
                        <p className="mt-2">
                          <b>Comentarios:</b> {ultimaSolicitud.comentario}
                        </p>
                        <p className="mt-2">
                          <b>
                            Puedes comunicarte con él mediante su numero de
                            celular:
                          </b>{" "}
                          {ultimaSolicitud.numeroProfesional}
                        </p>
                      </>
                    )}
                  {ultimaSolicitud.aceptado === true &&
                    ultimaSolicitud.propAceptada === true &&
                    fechaActual > ultimaSolicitud.fechaElegida && (
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
                          to={`/dash/professionals/${ultimaSolicitud.profesion}/${ultimaSolicitud.profesionalId}/${ultimaSolicitud._id}/calificacion`}
                          style={{ textDecoration: "none" }}
                        >
                          - Si lo deseas puedes comentar y calificar sus
                          servicios aquí!
                        </NavLink>
                        <p className="mt-2">
                          <b>Presupuesto:</b> ${ultimaSolicitud.presupuesto}
                        </p>
                        <p className="mt-2">
                          <b>Fecha elegida por el profesional:</b>{" "}
                          {ultimaSolicitud.fechaElegida}
                        </p>
                        <p className="mt-2">
                          <b>Comentarios:</b> {ultimaSolicitud.comentario}
                        </p>
                      </>
                    )}
                  {ultimaSolicitud.aceptado === false && (
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
                        to={`/dash/professionals/${ultimaSolicitud.profesion}/${ultimaSolicitud.profesionalId}`}
                        style={{ textDecoration: "none" }}
                      >
                        - Si lo deseas puedes volver a contactarlo aquí!
                      </NavLink>
                    </>
                  )}
                </div>
                <hr />
                <div className="text-center">
                  <b>Recuerda</b> que puedes monitorear todas tus solicitudes en{" "}
                  <a
                    href="/dash/misSolicitudes"
                    style={{ textDecoration: "none" }}
                  >
                    "Mis Solicitudes"
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p style={{ marginLeft: "30px" }}>
            <i>No tienes solicitudes aún.</i>
          </p>
        )}
      </div>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};

export default MisSolicitudes;
