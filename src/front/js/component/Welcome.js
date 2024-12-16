import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "../../styles/welcome.css";

const Welcome = () => {
  return (
    <div className="fondo-inicio">
      <Container className="contenedor-inicio">
        <h1 className="titulo-inicio">PROYECTO AUTENTICATE</h1>
        
        <p className="texto-destacado">
          registro
        </p>
        <hr className="linea-divisoria" />
        <p>
          ¡Regístrate!
        </p>
        <p className="botones-inicio">
          <Link className="boton-inicio boton-registro" to="/signup" role="button">
            REGÍSTRATE
          </Link>
          <Link className="boton-inicio boton-sesion" to="/login" role="button">
            INICIAR SESIÓN
          </Link>
        </p>
      </Container>
    </div>
  );
};

export default Welcome;