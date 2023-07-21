import React from "react";
import useTitle from "../hooks/useTitle";
import { useState } from "react";
import {
  passwordRecoveryMail,
  verifyVerificationCode,
} from "./OlvideContraseña";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const OlvideMiContraseña = () => {
  useTitle("Olvide mi contraseña");

  const [showEmailForm, setShowEmailForm] = useState(true);
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handlePasswordRecoveryMail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setEmailError(
        "Formato de mail invalido o mail invalido: Debe cumplir con el formato: xxx@xxx.com y ser un mail valido"
      );
      return;
    }

    setShowEmailForm(false);
    setShowCodeForm(true);
    setEmailError("");

    try {
      await passwordRecoveryMail(email);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error,
      });
      navigate("/login");
    }
    setIsLoading(false);
  };

  const handleVerifyVerificationCode = async (e) => {
    e.preventDefault();
    try {
      let response = await verifyVerificationCode(
        email,
        verificationCode,
        newPassword
      );
      console.log(response);
      Swal.fire({
        icon: "success",
        text: "Hemos enviado un mail al correo proporcionado, revisar por favor",
      });
      setTimeout(navigate("/login"), 3000);
    } catch (error) {
      console.log(error);
      setVerificationCodeError(
        "El codigo que ha introducido es incorrecto, vuelva a ingresar uno válido"
      );
    }
  };

  return (
    <div
      className="card p-4 col-5 position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center"
      style={{ marginBottom: "200px" }}
    >
      {showEmailForm && (
        <>
          <h2 className="text-center mb-4" htmlFor="email">
            Recuperar contraseña
          </h2>
          <form onSubmit={handlePasswordRecoveryMail}>
            <div className="form-group">
              <label htmlFor="email" className="mb-2">
                Necesitamos que nos proporcione de su email para la recuperación
                de su contraseña.
              </label>
              <br />
              <input
                type="email"
                className={`form-control ${emailError ? "is-invalid" : ""}`}
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese su email"
                autoComplete="off"
                required
              />
              {emailError && (
                <div className="invalid-feedback">{emailError}</div>
              )}
            </div>
            <br />
            {isLoading ? (
              <button class="btn btn-primary" type="button" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                {""} Cargando...
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#F47024",
                  color: "white",
                  border: "1px solid #F47024",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  fontSize: "1.0em",
                  height: "auto",
                  width: "auto",
                }}
              >
                Recuperar contraseña
              </button>
            )}
          </form>
        </>
      )}
      {showCodeForm && (
        <>
          <div className="">
            <h4>
              Ingresa el Código de Verificación que te hemos enviado a tu email,
              luego ingresa una nueva contraseña para reestablecerla.
            </h4>
            <form
              onSubmit={handleVerifyVerificationCode}
              className="col-6  justify-content-center align-items-center"
            >
              <br />
              <div className="mb-3">
                <label htmlFor="code" className="form-label">
                  Código:
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    verificationCodeError ? "is-invalid" : ""
                  }`}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  id="code"
                  required
                  autoComplete="off"
                />
                {verificationCodeError && (
                  <div className="invalid-feedback">
                    {verificationCodeError}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="code" className="form-label">
                  Nueva Contraseña:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="code"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#F47024",
                  color: "white",
                  border: "1px solid #F47024",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  fontSize: "1.0em",
                  height: "auto",
                  width: "auto",
                }}
              >
                Verificar Código
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default OlvideMiContraseña;
