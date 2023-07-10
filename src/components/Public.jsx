import React from "react";
import { UserContext } from "../features/context/UserProvider";
import useTitle from "../hooks/useTitle";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import toast, { Toaster } from "react-hot-toast";

const Public = () => {
  useTitle("Datazo.com");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const alertLogged = (e) => {
    e.preventDefault();
    if (user === false) {
      return toast((t) => (
        <span>
          Regístrate o inicia sesión para acceder al catálogo de profesionales
          de oficio y disfrutar de nuestra plataforma.{" "}
          <a href="/signup">¡Regístrate ahora en pocos minutos!</a>
        </span>
      )).then(navigate("/"));
    }
  };

  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <section className="head mt-3">
        <div
          style={{ position: "relative", maxWidth: "100%", overflow: "hidden" }}
        >
          <img
            src="https://i.ibb.co/6RDMpWy/Head.jpg"
            style={{ width: "100%", height: "auto" }}
            alt="datazoForYou"
          />
          <div
            style={{
              position: "absolute",
              top: "59%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              width: "100%",
            }}
          >
            <h2
              style={{ color: "#fff", fontSize: "3.6vw", fontWeight: "bold" }}
            >
              ¿Estabas buscando un profesional<br></br>
              de confianza para tu hogar?
            </h2>
          </div>
          <div
            style={{
              position: "absolute",
              top: "72%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              width: "100%",
            }}
          >
            <h2
              style={{ color: "#fff", fontSize: "2.5vw", fontWeight: "bold" }}
            >
              ¡Tenemos un datazo para vos!
            </h2>
          </div>
        </div>
      </section>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <section
        className="text-center"
        style={{ textAlign: "center", marginTop: "10px" }}
      >
        <div>
          <h2 style={{ color: "#494C4F", fontWeight: "bold" }}>
            ¿QUÉ NECESITAS?
          </h2>
        </div>
      </section>
      <br></br>
      <br></br>

      <div className="categories-container" onClick={alertLogged}>
        <Link to={`/dash/professionals/Plomero`}>
          <a href="#plomeros" style={{ margin: "1.5vw" }}>
            <img src="https://i.ibb.co/9NvChV2/1.jpg" alt="Plomeros" />
          </a>
        </Link>
        <Link to={`/dash/professionals/Gasista`}>
          {" "}
          <a href="#gasistas" style={{ margin: "1.5vw" }}>
            <img src="https://i.ibb.co/C0CxB25/2.jpg" alt="Gasistas" />
          </a>
        </Link>
        <Link to={`/dash/professionals/Pintor`}>
          <a href="#pintores" style={{ margin: "1.5vw" }}>
            <img src="https://i.ibb.co/4KSr9G0/3.jpg" alt="Pintores" />
          </a>
        </Link>
        <Link to={`/dash/professionals/Carpintero`}>
          {" "}
          <a href="#carpinteros" style={{ margin: "1.5vw" }}>
            <img src="https://i.ibb.co/B3cryBp/4.jpg" alt="Carpinteros" />
          </a>
        </Link>
        <Link to={`/dash/professionals/Electricista`}>
          {" "}
          <a href="#electricistas" style={{ margin: "1.5vw" }}>
            <img src="https://i.ibb.co/bBxL0gt/5.jpg" alt="Electricistas" />
          </a>
        </Link>
        <Link to={`/dash/professionals/Albañil`}>
          <a href="#albaniles" style={{ margin: "1.5vw" }}>
            <img src="https://i.ibb.co/pvN31p3/6.jpg" alt="Alba-iles" />
          </a>
        </Link>
      </div>

      <br></br>

      <br></br>
      <section
        className="text-center"
        style={{ textAlign: "center", marginTop: "10px" }}
      >
        <div>
          <h2 style={{ color: "#494C4F", fontWeight: "bold" }}>
            ¿SOS PROFESIONAL?
          </h2>
        </div>
        <div>
          <h5 style={{ color: "#494C4F", textAlign: "center" }}>
            <br></br>
            Querés encontrar nuevos clientes y ganar dinero extra,<br></br>
            además de elegir cuándo y cómo trabajar? Sé parte de la red<br></br>
            de Datazo hoy, sin costo
          </h5>
        </div>
        <br></br>

        <button
          className="btn-ver-categorias"
          style={{
            backgroundColor: "#F47024",
            color: "#F47024",
            border: "1px solid #F47024",
            borderRadius: "25px",
            padding: "8px 25px",
            fontSize: "1.1em",
            height: "auto",
            width: "auto",
          }}
        >
          <a
            href="/workWithUs"
            style={{
              textDecoration: "none",
              color: "white",
              fontFamily: "Inter",
              fontWeight: "600",
            }}
          >
            Quiero ser parte
          </a>
        </button>
        <br />
      </section>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <section
        className="text-center"
        style={{ textAlign: "center", marginTop: "10px" }}
      >
        <div>
          <h2 style={{ color: "#494C4F", fontWeight: "bold" }}>
            ¿QUIÉNES SOMOS?
          </h2>
        </div>
        <div>
          <h5 style={{ color: "#494C4F", textAlign: "center" }}>
            <br></br>
            Datazo es un proyecto universitario impulsado por alumnos de la
            <br></br>
            facultad de ingeniería de la universidad UNSTA de Tucumán. Este
            <br></br>
            surge para facilitarte la búsqueda de profesionales en servicios de
            <br></br>
            mantenimiento y reparaciones para solucionar problemas cotidianos
            <br></br>
            del hogar, a través de una plataforma intuitiva y confiable, que
            <br></br>
            conecte a usuarios con expertos en el campo.
          </h5>
        </div>
        <br></br>

        <button
          className="btn-ver-categorias"
          style={{
            backgroundColor: "white",
            color: "#F47024",
            border: "3px solid #F47024",
            borderRadius: "8px",
            padding: "8px 25px",
            fontSize: "1.1em",
            height: "auto",
            width: "auto",
          }}
        >
          <a
            href="#  | | | | | | | | | |  "
            style={{
              textDecoration: "none",
              color: "#F47024",
              fontFamily: "Inter",
              fontWeight: "600",
            }}
          >
            Más información
          </a>
        </button>
        <br />
      </section>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};
export default Public;
