import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { Modal, Button, Card, Form } from "react-bootstrap";
import { useActions } from "../store/appContext.js"; // Importar las acciones correctamente
import "../../styles/usersignup.css";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nombre: "",
    apellido: "",
    ciudad: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Para manejar mensajes de error específicos

  const actions = useActions(); // Acceder a las acciones del contexto
  const navigate = useNavigate(); // Hook para redirección

  // Manejo de cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejo del registro del usuario
  const handleSignup = async () => {
    try {
      // Llamada a la acción de registro
      const response = await actions.usersignup(
        formData.email,
        formData.password,
        formData.nombre,
        formData.apellido,
        formData.ciudad
      );
  
      if (response.ok) {
        setShowSuccessModal(true); // Mostrar modal de éxito
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/login"); // Redireccionar al login después de 2 segundos
        }, 2000);
      } else {
        // Manejar error si el backend envía una respuesta no exitosa
        throw new Error(response.msg || "Error en el registro");
      }
    } catch (error) {
      console.error("Error Durante el Registro:", error.message);
      setErrorMessage(error.message || "Error inesperado durante el registro");
      setShowErrorModal(true); // Mostrar modal de error
    }
  };
  

  // Cerrar modal de error
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  return (
    <div className="usersignup-container mt-5">
      <Card className="usersignup-card">
        <Card.Body>
          <h2 className="usersignup-title">Registro</h2>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="usersignup-form-control"
                type="email"
                placeholder="Ingresa tu email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="usersignup-form-control"
                type="password"
                placeholder="Ingresa tu contraseña"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicFirstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                className="usersignup-form-control"
                type="text"
                placeholder="Ingresa tu nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                className="usersignup-form-control"
                type="text"
                placeholder="Ingresa tu apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCity">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                className="usersignup-form-control"
                type="text"
                placeholder="Ingresa tu ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button
              className="usersignup-button"
              variant="primary"
              type="button"
              onClick={handleSignup}
            >
              Registrar
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Modal de éxito */}
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        className="usersignup-modal-content"
      >
        <Modal.Header className="usersignup-modal-header success" closeButton>
          <Modal.Title>Éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body className="usersignup-modal-body">
          El usuario ha sido creado con éxito. Redirigiendo al login...
        </Modal.Body>
        <Modal.Footer className="usersignup-modal-footer">
          <Button
            className="btn-secondary"
            onClick={() => {
              setShowSuccessModal(false);
              navigate("/login");
            }}
          >
            Ir al login
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de error */}
      <Modal
        show={showErrorModal}
        onHide={handleCloseErrorModal}
        className="usersignup-modal-content"
      >
        <Modal.Header className="usersignup-modal-header error" closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body className="usersignup-modal-body">
          {errorMessage}
        </Modal.Body>
        <Modal.Footer className="usersignup-modal-footer">
          <Button
            className="btn-secondary"
            onClick={handleCloseErrorModal}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserSignup;
