import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import useTitle from "../hooks/useTitle";
import React from "react";
import api from "../app/api/api";
const Professionals = () => {
  const { alt } = useParams();
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  // eslint-disable-next-line
  const [sortBy, setSortBy] = useState("todos");
  useTitle("Buscar Profesionales");


  //GET de profesionales cuando el componente se renderice
  useEffect(() => {
    const fetchProfessionals = async () => {
      const response = await api.get("/professionals");
      setProfessionals(response.data.professional);
    };


    fetchProfessionals();
  }, []);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  //Filtro para hacer coincidir la ocupacion del profesional y el alt de la imagen
  useEffect(() => {
    const filtered = professionals.filter(
      (professional) => professional.profesion === alt
    );
    setFilteredProfessionals(filtered);
  }, [alt, professionals]);


  //Función para ordenar la lista de profesionales según la opción seleccionada en el dropdown
  const sortProfessionals = (sortOption) => {
    setSortBy(sortOption);
    let sortedProfessionals = [...filteredProfessionals];


    if (sortOption === "mejorCalificacion") {
      sortedProfessionals.sort((a, b) => b.calificacion - a.calificacion);
    } else if (sortOption === "fechaCercana") {
      sortedProfessionals.sort(
        (a, b) => new Date(a.disponible) - new Date(b.disponible)
      );
    } else if (sortOption === "todos") {
      sortedProfessionals = [...filteredProfessionals];
    }
    setFilteredProfessionals(sortedProfessionals);
  };


  function renderStars(numStars) {
    const fullStars = Math.floor(numStars);
    const halfStars = Math.round(numStars - fullStars);
    const emptyStars = 5 - fullStars - halfStars;


    const stars = [];


    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={`star-${i}`} />);
    }


    if (halfStars > 0) {
      stars.push(
        <FontAwesomeIcon
          icon={faStarHalfAlt}
          key="star-half"
          style={{ color: "#ffd700" }}
        />
      );
    }


    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          icon={faStar}
          key={`star-empty-${i}`}
          className="text-muted"
        />
      );
    }


    return stars;
  }


  return (
    <>
      {filteredProfessionals.length > 0 ? (
        <>
          <div style={{ marginBottom: "600px" }} id="professionals">
            <div className="row mb-3 p-2">
              <h3
                style={{
                  marginLeft: "150px",
                  fontFamily: "Lexend",
                  fontWeight: "700",
                  marginBottom: "10px",
                }}
              >
                Categoria: {alt}
              </h3>
              <div className="col-md-6" style={{ marginLeft: "150px" }}>
                <div className="dropdown">
                  <label>
                    <h5>
                      <b
                        style={{
                          fontFamily: "Lexend",
                          fontWeight: "400",
                        }}
                      >
                        Ordenar por
                      </b>
                    </h5>
                  </label>
                  &nbsp;
                  <button
                    className="btn btn-light dropdown-toggle"
                    style={{ color: "#FA7C1F" }}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <div
                    className="dropdown-menu btn-light"
                    style={{ backgroundColor: "white" }}
                  >
                    <button
                      className="dropdown-item"
                      onClick={() => sortProfessionals("todos")}
                    >
                      Todos los profesionales
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => sortProfessionals("mejorCalificacion")}
                    >
                      Los profesionales mejor calificados
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => sortProfessionals("fechaCercana")}
                    >
                      Fecha disponible
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "125px" }}>
              <div className="row">
                <div className="row">
                  {filteredProfessionals.map((professional) => (
                    <div
                      className="col-lg-4 col-md-6 col-sm-12 mb-5"
                      key={professional.id}
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                        <Link
                                to={`/dash/professionals/${alt}/${professional._id}`}
                                style={{
                                  color: "black",
                                  textDecoration: "none",
                                }}
                                className="linktoprof"
                              >
                          <img
                            src={professional.foto}
                            alt="FotoPerfil"
                            className="rounded-circle mr-3"
                            style={{
                              height: "70px",
                              width: "70px",
                              objectFit: "cover",
                              marginRight: "10px",
                              marginBottom: "20px",
                            }}
                          />
                          </Link>
                          <div>
                            <h5
                              className="card-title"
                              style={{
                                fontFamily: "Lexend",
                                fontWeight: "400",
                              }}
                            >
                              <Link
                                to={`/dash/professionals/${alt}/${professional._id}`}
                                style={{
                                  color: "black",
                                  textDecoration: "none",
                                }}
                                className="linktoprof"
                              >
                                {professional.nombre} {professional.apellido} -{" "}
                                {professional.profesion}
                              </Link>
                            </h5>
                            <p
                              className="card-text"
                              style={{
                                fontFamily: "Lexend",
                                fontWeight: "200",
                              }}
                            >
                              Disponible desde{" "}
                              {new Date(
                                professional.disponible
                              ).toLocaleDateString()}
                            </p>
                            <p className="card-text">
                              {renderStars(professional.calificacion)}{" "}
                              {professional.calificacion}/5
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container" style={{ marginBottom: "700px" }}>
          <div className="d-flex justify-content-center top-50 start-0 translate-middle-y">
            <div className="spinner-border" role="status"></div>
          </div>
        </div>
      )}
    </>
  );
};


export default Professionals;
