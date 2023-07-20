import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import useTitle from "../hooks/useTitle";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import useAuth from "../hooks/useAuth";
import api from "../app/api/api";
import ContactRegister from "./ContactRegister";
import { Modal, Box } from "@mui/material";

const CVDocument = ({ professional }) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 11,
      paddingTop: 30,
      paddingLeft: 60,
      paddingRight: 60,
      paddingBottom: 30,
      backgroundColor: "#f0f0f0",
    },
    section: {
      marginBottom: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
      color: "#FA7C1F",
      marginTop: 6,
    },
    titleCurr: {
      fontSize: 17,
      fontWeight: "bold",
      textDecoration: "underline",
      color: "#FA7C1F",
    },
    titleCurrContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    subtitle: {
      fontSize: 14,
      marginBottom: 5,
      marginTop: 5,
    },
    text: {
      fontSize: 10,
    },
    container: {
      flexDirection: "row",
      marginTop: 10,
    },
    image: {
      width: 200,
      height: 200,
      marginRight: 10,
    },
    content: {
      flex: 1,
    },
    divider: {
      borderBottom: "1 solid #E5E5E5",
      marginTop: 10,
      marginBottom: 10,
    },
    logoContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    logoImage: {
      width: "20%",
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 5,
      color: "#FA7C1F",
    },
  });
  const logoPath = "https://i.ibb.co/zHb5yQS/logo.png";
  const briefCase = "https://i.ibb.co/C9VZx07/maletin.png";
  const graduationCap = "https://i.ibb.co/8mf02sQ/mortarboard.png";
  const skillIco = "https://i.ibb.co/tJ3NfKr/skills.png";
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleCurrContainer}>
          <Text style={styles.titleCurr}>Curriculum Vitae</Text>
        </View>

        <View style={styles.container}>
          <Image src={professional.foto} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.subtitle}>
              {professional.nombre} {professional.apellido} &nbsp; - &nbsp;
              <Text style={styles.title}>{professional.profesion}</Text>
            </Text>

            <Text style={styles.subtitle}>
              {professional.zona} - Yerba Buena
            </Text>
          </View>
        </View>
        <Text>{"\n"}</Text>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image src={briefCase} style={styles.icon} />
            <Text style={styles.title}>Experiencia Laboral:</Text>
          </View>
          {professional.expLaboral &&
            professional.expLaboral.map((exp) => {
              return (
                <View key={exp._id}>
                  <Text style={styles.subtitle}>{exp.empresa}</Text>
                  <Text style={styles.text}>{exp.cargo}</Text>
                  <Text style={styles.text}>{exp.periodo}</Text>
                  <Text>{"\n"}</Text>
                </View>
              );
            })}
        </View>

        <View style={styles.divider} />
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image src={graduationCap} style={styles.icon} />
            <Text style={styles.title}>Educación:</Text>
          </View>

          {professional.educacion &&
            professional.educacion.map((edu) => {
              return (
                <View key={edu._id}>
                  <Text style={styles.subtitle}>{edu.institucion}</Text>
                  <Text style={styles.text}>{edu.titulo}</Text>
                  <Text style={styles.text}>{edu.periodo}</Text>
                </View>
              );
            })}
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image src={skillIco} style={styles.icon} />
            <Text style={styles.title}>Habilidades:</Text>
          </View>

          {professional.educacion &&
            professional.habilidades.map((skill) => {
              return (
                <View key={skill._id}>
                  <Text style={styles.subtitle}>{skill.habilidad}</Text>
                </View>
              );
            })}
        </View>
        <View style={styles.logoContainer}>
          <Image src={logoPath} style={styles.logoImage} />
          <Text style={styles.text}>
            Copyright © 2023 Datazo | Proyecto Final UNSTA - Teléfono: 381 -
            5111111 Dirección: Av Perón 2085
          </Text>
        </View>
      </Page>
    </Document>
  );
};

const ProfessionalDetails = () => {
  const [professional, setProfessional] = useState({});
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [showPDF, setShowPDF] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { nombre, apellido, email } = useAuth();

  const mostrarPDF = () => {
    setShowPDF(true);
  };

  const ocultarPDF = () => {
    setShowPDF(false);
  };
  const { alt, id } = useParams();
  useTitle("Perfil Profesional");

  useEffect(() => {
    api.get(`/professionals/${id}`).then((response) => {
      setProfessional(response.data);
    });
  }, [id]);
  //GET de profesionales cuando el componente se renderice
  useEffect(() => {
    const fetchProfessionals = async () => {
      const response = await api.get("/professionals");
      setProfessionals(response.data.professional);
    };

    fetchProfessionals();
  }, []);

  //Filtro para hacer coincidir la ocupacion del profesional y el alt
  useEffect(() => {
    const filtered = professionals.filter(
      (professional) =>
        professional.profesion === alt && professional._id !== id
    );
    setFilteredProfessionals(filtered);
  }, [alt, id, professionals]);

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

  const rating = Math.round(professional.calificacion * 2) / 2;

  return (
    <>
      <div
        className="col-md-4 position-absolute top-50 end-0 translate-middle-y perfiles-similares"
        style={{ marginLeft: "50px", marginRight: "20px" }}
      >
        <h6
          className="mb-3"
          style={{ fontFamily: "Lexend", fontWeight: "400" }}
        >
          Otros perfiles similares:
        </h6>

        {filteredProfessionals.length > 0 ? (
          filteredProfessionals.slice(0, 3).map((professional) => (
            <div className="col-12 mb-5" key={professional.id}>
              <div className="card-body">
                <div className="d-flex align-items-center">
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
                      style={{ fontFamily: "Lexend", fontWeight: "200" }}
                    >
                      Disponible desde{" "}
                      {new Date(professional.disponible).toLocaleDateString()}
                    </p>
                    <p className="card-text">
                      {renderStars(professional.calificacion)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>
            <i>No hay perfiles similares aún</i>
          </p>
        )}
      </div>
      <div
        className="row mt-0 position-relative profile-container"
        style={{ height: "100%", width: "60%" }}
      >
        <div className="col-md-8 offset-md-2 ">
          <div
            className="card  d-flex flex-column border-0"
            style={{ height: "100%" }}
          >
            <h2
              style={{
                fontFamily: "Lexend",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              Perfil Profesional
            </h2>
            <img
              src={professional.foto}
              className="mt-2 rounded-circle"
              alt="Foto Perfil"
              style={{ width: "150px", height: "150px" }}
            />

            <div className="mt-3">
              <div className="d-flex justify-content-between ">
                <h4 style={{ fontFamily: "Lexend", fontSize: "400" }}>
                  {professional.nombre} {professional.apellido}
                </h4>

                <div className="d-flex " style={{ fontFamily: "Lexend" }}>
                  <h4 className="card-text mr-2 text-muted">
                    {professional.profesion}
                    {"\u00A0"}
                    {"\u00A0"}
                    {renderStars(rating)}
                    {"\u00A0"}
                    {professional.calificacion}/5
                  </h4>
                </div>
              </div>
              <h6
                className="card-text"
                style={{ fontFamily: "Lexend", fontWeight: "200" }}
              >
                {professional.zona} - Yerba Buena
              </h6>
              <h6
                className="card-text"
                style={{ fontFamily: "Lexend", fontWeight: "200" }}
              >
                Disponible desde {professional.disponible}
              </h6>
              <br />
              <h6 className="card-text">
                <strong>Descripción:</strong>{" "}
                <p
                  style={{
                    fontFamily: "Lexend",
                    fontWeight: "200",
                    width: "40%",
                  }}
                >
                  {professional.referencias}
                </p>
              </h6>
              <h6 className="card-text">
                <strong>Curriculum Vitae:</strong>{" "}
                <p>
                  {showPDF ? (
                    <button
                      onClick={ocultarPDF}
                      style={{
                        background: "none",
                        border: "none",
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                        padding: 0,
                        fontFamily: "Lexend",
                        fontSize: "400",
                      }}
                    >
                      Ocultar PDF
                    </button>
                  ) : (
                    <button
                      onClick={mostrarPDF}
                      style={{
                        background: "none",
                        border: "none",
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                        padding: 0,
                        fontFamily: "Lexend",
                        fontSize: "400",
                      }}
                    >
                      Link PDF
                    </button>
                  )}
                </p>
                {showPDF && (
                  <PDFViewer
                    id="pdf-viewer"
                    style={{
                      height: "900px",
                      width: "900px",
                      display: "block",
                    }}
                  >
                    <CVDocument professional={professional} />
                  </PDFViewer>
                )}
              </h6>
              <div className="container d-flex justify-content-end">
                <button
                  onClick={handleOpen}
                  style={{
                    fontFamily: "Lexend",
                    fontWeight: "400",
                    color: "#ffff",
                    backgroundColor: "#FA7C1F",
                    borderRadius: "60px",
                  }}
                  className="btn btn-lg"
                >
                  Contactar
                </button>
              </div>{" "}
              <Modal
                open={open}
                onClose={handleClose}
                className="mt-4"
                style={{ zIndex: 995 }}
              >
                <Box>
                  <ContactRegister
                    nombreProf={professional.nombre}
                    apellidoProf={professional.apellido}
                    emailProf={professional.email}
                    emailCli={email}
                    nombreCli={nombre}
                    apellidoCli={apellido}
                    numeroProfesional={professional.contacto}
                    handleClose={handleClose}
                  />
                </Box>
              </Modal>
              {professional.comentarios && (
                <h5
                  className="card-text"
                  style={{
                    fontFamily: "Lexend",
                    fontSize: "bold",
                  }}
                >
                  <b>Comentarios:</b>{" "}
                  <span className="text-muted">
                    {professional.comentarios.length > 0
                      ? `(${professional.comentarios.length})`
                      : ""}
                  </span>
                </h5>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="row mt-0 position-relative profile-container-2"
        style={{ height: "60%" }}
      >
        <div className="col-md-6 offset-md-3">
          <div
            className="card card-body d-flex flex-column align-items-center border-0"
            style={{ height: "100%" }}
          >
            <img
              src={professional.foto}
              className="img-thumbnail mt-2 rounded-circle"
              alt="Foto Perfil"
              style={{
                width: "150px",
                height: "150px",
                justifyContent: "center",
              }}
            />

            <div className="card-body ">
              <h2
                className="card-title text-center"
                style={{ fontFamily: "Lexend", fontWeight: "400" }}
              >
                {professional.nombre} {professional.apellido}{" "}
              </h2>
              <hr />
              <h6
                className="card-text"
                style={{ fontFamily: "Lexend", fontWeight: "200" }}
              >
                {professional.zona} - Yerba Buena
              </h6>
              <h6
                className="card-text"
                style={{ fontFamily: "Lexend", fontWeight: "200" }}
              >
                {professional.profesion} {renderStars(rating)}
              </h6>

              <h6
                className="card-text"
                style={{ fontFamily: "Lexend", fontWeight: "200" }}
              >
                Disponible desde {professional.disponible}
              </h6>
              <h6 className="card-text" style={{ fontFamily: "Lexend" }}>
                <strong>Descripción:</strong>{" "}
                <p style={{ fontFamily: "Lexend", fontWeight: "200" }}>
                  {professional.referencias}
                </p>
              </h6>
              <h6 className="card-text" style={{ fontFamily: "Lexend" }}>
                <strong>Curriculum Vitae:</strong>
                <p>
                  <PDFDownloadLink
                    document={<CVDocument professional={professional} />}
                    fileName={
                      professional.nombre +
                      " " +
                      professional.apellido +
                      " - Curriculum Vitae"
                    }
                    target="_blank"
                  >
                    {({ loading }) =>
                      loading ? "Generando PDF..." : "Link PDF"
                    }
                  </PDFDownloadLink>
                </p>
                <PDFViewer style={{ display: "none" }}>
                  <CVDocument professional={professional} />
                </PDFViewer>
              </h6>
              <div className="container d-flex justify-content-end">
                <button
                  onClick={handleOpen}
                  style={{
                    fontFamily: "Lexend",
                    color: "#ffff",
                    backgroundColor: "#FA7C1F",
                  }}
                  className="btn btn-lg"
                >
                  Contactar
                </button>
              </div>
              {professional.comentarios && (
                <h5
                  className="card-text"
                  style={{
                    fontFamily: "Lexend",
                    fontSize: "bold",
                  }}
                >
                  <b>Comentarios:</b>{" "}
                  <span className="text-muted">
                    {professional.comentarios.length > 0
                      ? `(${professional.comentarios.length})`
                      : ""}
                  </span>
                </h5>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="row comments-container"
        style={{
          marginBottom: "400px",
          width: "60%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <div className="col-md-6 offset-md-2">
          {professional.comentarios &&
            professional.comentarios.map((comentario) => (
              <div
                className="card position-relative border-0 mt-3"
                key={comentario._id}
                style={{
                  marginBottom: "30px",
                }}
              >
                <div className="card-body d-flex">
                  <div className="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="40"
                      height="51"
                      fill="none"
                    >
                      <path fill="url(#a)" d="M0 0h51v51H0z" />
                      <defs>
                        <pattern
                          id="a"
                          width="1"
                          height="1"
                          patternContentUnits="objectBoundingBox"
                        >
                          <use xlinkHref="#b" transform="scale(.01111)" />
                        </pattern>
                        <image
                          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAESUlEQVR4nO2cy4scVRSHT2KMDzQq+EB84GuTrNSe9Dk9GRhQwbhRGfVfEIkLlyIo4wPEqAsfIdJT5/REg5tZiYrgY+NjOxglZkhAMImSRIfpvqdnxhg1JXdiMotEpDNVde7cuh/8oGGYqj4fp29V3aq6AIlEIpFIJBKJRCKRGIx8HNaq4IgKPueYPnBC+1Rwzgn+6XPqM+3zf1PGZzWjLf5/BtxNfVEZucYJveQYf1ahfJA4ocOO6UVtN662riNY8qlN65c6U2hhUMFnhWleM3rGb9O6rqDoZXSHY/x2xYLPEo7T3Ynmrdb1BYETRD/eFi55ubtne53WZqgz3Q7drUyuNMnL6c1PDt8JdWS+3bj+fA545xvHdKif4XVQN1To46okLwc/hDqh0ny0esmnx+zWw1AH8vHRdcp0wEq0Y5zJpx67AGJHMxwz6+Zl2Q9C7CjTJ9ai/fEBYmau3bjCMf1hLdoJHp/d3dwAsaIBDBtn0mk+BLGigq+aCz7d1YwvQ6xoGONz/OO0Y5wJpqOF9kKsaJmTR4OGaRZixQkeD6ajGX+HWHFCJwIaOk5ArCjTbEAd/SvEijL9aC34TJgOQKw4pq/DGTrwS4gVJ/hOQEPHDoiVvjSfDGjoeAJipcebh8wF/5sut+6CWMnHYa1jPGYt2QkdzXNYAzGjgu9bi1bGdyF2NICp0lrcYcnHR9c5piOmw0a7cSHUAWV63bCjX4O6MNfecrPFLS0/v9GdxFugTqigGIiegHo+QUqVdbXfV0+GboM64hi3Vyc64nuE/8cv7calKvhTBd186NiO0cugzjjBBxzTyRIln+xltNW6zuhP9xzjduv6giGf2rS+jLlqx/RVbS5OBnxcbE9hkoX29naOXGVdV5AsTDRvLEr0wi66wbqeoNGCRFvXETyaRCfRUaGpo5PoqNDU0Ul0NPS5dW9RHe23ZV1PuDN5jNOFXYIzTvttWtcVFLO7mxuc4BfFz3Xg57/x8OVQd/Ic1vjXlct8+d6vSqOMj0T/wMy56L/XulYZt1X5TsvSmkyM2/y+If4JI3xcGT86tfhUNYLPIfxvJ/iNMj7d2zV8O8SAvxnqGJ/yhZV5F2Vl4zj94ASf72XYgNWEZrjRCb2iQvutJerg2b/03TPcCMEe1DIcW/pJ2svKC+l0X0uGY8EcRHud1v1O6DtrMVqWcKY9vkYzwd3J0StVaNJahFYVpo6v2WLhqe/Ni5equxtnFjtDN1V2JqGCB62LVrPgwdIfLcvf3HpRofMRsjrjj0n55OjFpYlWwbesi9Rw8kYpkv0an5ZXdBpYHONfpVxZOqad1sVpcMG3C5Xs53Ud46J9YRRUvJN8ii4pTHRf6D7rojTQ9DvNewoT7Vcoty5IA41jfKEw0Sr0mXVBGm4+LUx0zHMZusL4ldyLE13hOs+6yuJf2yhSdDrjkP/s6MXCRCcSiUQikUgkEokEGPAPays2YOcrkm8AAAAASUVORK5CYII="
                          id="b"
                          width="70"
                          height="70"
                        />
                      </defs>
                    </svg>
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <h5
                      className="card-title mb-1"
                      style={{
                        fontFamily: "Inter",
                        fontWeight: "500",
                      }}
                    >
                      {comentario.nombrePersona}{" "}
                      {renderStars(comentario.calificacionComentario)}
                    </h5>
                    <p
                      style={{
                        fontFamily: "Inter",
                        fontWeight: "300",
                      }}
                    >
                      {comentario.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProfessionalDetails;
