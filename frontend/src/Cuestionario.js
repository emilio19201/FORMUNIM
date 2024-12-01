import { Container, Form, Card, Button } from 'react-bootstrap';
import '../src/App.js';
import { useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";          

function App() {

  const [respuestas, setRespuestas] = useState({
    pregunta1: null,
    pregunta2: null,
    pregunta3: null,
    pregunta4: null,
    pregunta5: null,
    pregunta6: null,
    pregunta7: null,
    pregunta8: null,
    pregunta9: null,
    pregunta10: null,
  });
  const [enable, setEnable] = useState(true);

  const onChange = (e) => {
    const { name, value } = e.target;
    setRespuestas((prev) => ({
      ...prev,
      [name]: Number(value),
    }));

    // Verificar si todas las preguntas están respondidas para habilitar el botón de enviar
    const allAnswered = Object.values({ ...respuestas, [name]: Number(value) }).every(val => val !== null);
    setEnable(!allAnswered);
  };

  const onSubmit = async () => {
    try {
      Swal.fire("Enviando tus respuestas");
      Swal.showLoading();
      await axios.post('http://localhost:4000/cuestionario', respuestas);
      Swal.fire("Respuestas enviadas con éxito", "", "success");
    } catch (error) {
      console.log(error.message);
      Swal.fire('Ocurrió un error al enviar las respuestas', "", "error");
    }
  };

  return (
    <Container className='Maincont'>
      <Card className='mt-5'>
        <Card.Body className='bodycont'>
          <Card.Title style={{ textAlign: 'center', marginTop: 30, marginBottom: 30, color: '#4A90E2', fontWeight: 'bold' }}>
            Cuestionario de Evaluación para Alumnos Recién Egresados
          </Card.Title>
          <Form>
            {[{
              label: "¿Qué tan clara es la explicación del maestro en clase?", name: "pregunta1"
            }, {
              label: "¿Cómo evalúas la preparación del maestro para cada clase?", name: "pregunta2"
            }, {
              label: "¿Qué tan accesible es el maestro para responder preguntas y aclarar dudas?", name: "pregunta3"
            }, {
              label: "¿Cómo valoras la puntualidad del maestro para empezar y terminar las clases?", name: "pregunta4"
            }, {
              label: "¿Qué tan adecuado es el ritmo de enseñanza para tu aprendizaje?", name: "pregunta5"
            }, {
              label: "¿Qué tan bien se relaciona el contenido de la materia con los temas que necesitas aprender?", name: "pregunta6"
            }, {
              label: "¿Cómo evalúas la organización del contenido en la materia?", name: "pregunta7"
            }, {
              label: "¿Qué tan útiles consideras los materiales y recursos proporcionados para la materia?", name: "pregunta8"
            }, {
              label: "¿Qué tan bien se ajustan las evaluaciones (exámenes, trabajos) a los temas enseñados?", name: "pregunta9"
            }, {
              label: "En general, ¿qué tan satisfecho estás con el desempeño del maestro y la calidad de la materia?", name: "pregunta10"
            }].map((pregunta, index) => (
              <Form.Group key={index} className='mb-4'>
                <Form.Label style={{ fontWeight: 'bold', fontSize: '16px' }}>{pregunta.label}</Form.Label>
                <div className='d-flex justify-content-between'>
                  {[1, 2, 3, 4].map(opcion => (
                    <Form.Check
                      key={opcion}
                      type="radio"
                      label={opcion}
                      name={pregunta.name}
                      value={opcion}
                      onChange={onChange}
                      checked={respuestas[pregunta.name] === opcion}
                      style={{ marginRight: '10px' }}
                    />
                  ))}
                </div>
              </Form.Group>
            ))}
            <div className='d-flex justify-content-center'>
              <Button
                disabled={enable}
                onClick={onSubmit}
                style={{
                  backgroundColor: '#4CAF50', 
                  borderColor: '#4CAF50', 
                  fontWeight: 'bold', 
                  padding: '10px 20px', 
                  marginRight: '20px', 
                  borderRadius: '5px'
                }}
              >
                Enviar
              </Button>
              <Button
                style={{
                  backgroundColor: '#f44336',
                  borderColor: '#f44336',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  borderRadius: '5px'
                }}
                type='reset'
                variant='danger'
                onClick={() => setRespuestas({
                  pregunta1: null, pregunta2: null, pregunta3: null, pregunta4: null,
                  pregunta5: null, pregunta6: null, pregunta7: null, pregunta8: null,
                  pregunta9: null, pregunta10: null,
                })}
              >
                Eliminar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
