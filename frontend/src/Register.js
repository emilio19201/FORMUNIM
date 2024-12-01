import { useState } from "react";
import axios from "axios";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";  
import { useNavigate } from "react-router-dom";  
import Swal from "sweetalert2";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      Swal.fire("Registrando usuario...");
      Swal.showLoading();
      const response = await axios.post('http://localhost:4000/register', { email, password });
      Swal.fire(response.data.msg, "", "success");

      navigate("/cuestionarios");  
    } catch (error) {
      console.log(error.message);
      Swal.fire('Error', 'Hubo un problema al registrar el usuario', 'error');
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#f7f9fc" }}>
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Card.Title className="text-center mb-4" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333333" }}>
                Registrate
              </Card.Title>
              
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Introduce tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Introduce tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button 
                  type="submit" 
                  variant="success" 
                  className="w-100 mt-3 py-2"
                  style={{ fontSize: "1.1rem", backgroundColor: "#28a745", border: "none", borderRadius: "5px" }}
                >
                  Registrar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
