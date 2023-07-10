/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import WorkWithUs from "../components/WorkWithUs";
import React from "react";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("WorkWithUs component", () => {
  it("Debe de mostrar el componente", async () => {
    const view = render(
      <BrowserRouter>
        <WorkWithUs />
      </BrowserRouter>
    );

    expect(view).toMatchSnapshot();
  });
  it("debe enviar el formulario y redirigir a la página de inicio después de 3 segundos", () => {
    const navigateMock = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigateMock);
    jest.spyOn(global, "setTimeout").mockImplementation((cb) => cb());

    const { getByText } = render(
      <BrowserRouter>
        <WorkWithUs />
      </BrowserRouter>
    );

    const submitButton = getByText("Enviar");
    fireEvent.click(submitButton);

    expect(global.setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      3000
    );
    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("debe mostrar un mensaje de éxito tras el submit del formulario", () => {
    const { getByText } = render(
      <BrowserRouter>
        <WorkWithUs />
      </BrowserRouter>
    );
    const submitButton = getByText("Enviar");
    fireEvent.click(submitButton);

    expect(
      getByText(
        "En breve nuestro equipo lo estará contactando para validar los datos ingresados, esté atento a su buzón de mail"
      )
    ).toBeInTheDocument();
  });

  it("debe mostrar un error por los campos obligatorios", async () => {
    // Arrange
    render(
      <BrowserRouter>
        <WorkWithUs />
      </BrowserRouter>
    );

    const submitButton = screen.getByText("Enviar");

    // Act
    fireEvent.click(submitButton);

    // Assert
    expect(
      screen.getByPlaceholderText("Ingrese su nombre")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ingrese su apellido")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Ingrese su número de celular:")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ingrese su email")).toBeInTheDocument();
  });
});
