import React, { useState } from "react";

const PreguntasFrecuentes = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const questions = [
    "¿Cómo funciona este sitio web?",
    "¿Cómo puedo encontrar un profesional adecuado para mi necesidad?",
    "¿Cómo puedo contactar a un profesional?",
    "¿Qué información puedo encontrar en los perfiles de los profesionales?",
    "¿Cómo puedo asegurarme de que un profesional sea confiable y competente?",
    "¿Cuál es el costo de contratar a un profesional a través de este sitio?",
    "¿Qué debo hacer si no estoy satisfecho con el servicio recibido?",
    "¿Cómo puedo cancelar una cita con un profesional?",
    "¿Cómo puedo dejar una reseña para un profesional?",
    "¿Cómo puedo comunicarme con el equipo de soporte técnico?",
  ];

  const answers = [
    "Nuestro sitio web es una plataforma donde profesionales como plomeros, gasistas, pintores, carpinteros, electricistas y albañiles pueden publicarse y ofrecer sus servicios a los usuarios. Los profesionales se registran, crean un perfil, luego los usuarios pueden buscarlos y contactarlos para contratar sus servicios.",
    "Debajo de la pregunta -¿QUÉ NECESITAS?- vas a poder ver las categorías de profesionales, haciendo click en alguna aparecerán los profesionales con su nombre, disponibilidad y su calificación promedio.",
    "Para contactar a un profesional, simplemente visita su perfil y encontrarás el botón -Contactar-, haz click en el mismo y luego debes rellenar el formulario proporcionado, el profesional recibe un correo con la información de tu pedido.",
    "En los perfiles de los profesionales, encontrarás información detallada sobre su experiencia, habilidades, certificaciones, reseñas de clientes anteriores como así también una calificación promedio. En su perfil Datazo te proporciona acceso para ver su Curriculum Vitae en el cual tendrás toda la información sobre él como su experiencia laboral, educación y habilidades.",
    "En nuestro sitio web, fomentamos la confianza y la transparencia. Puedes verificar la confiabilidad y competencia de un profesional revisando las reseñas y calificaciones dejadas por otros clientes. Además, algunos profesionales pueden haber pasado por un proceso de verificación antes de ser publicados en nuestra plataforma.",
    "El costo de contratar a un profesional puede variar según el tipo de servicio y el profesional específico. Los profesionales harán un presupuesto estimativo según la tarea especificada en el formulario de registro de trabajo, y este presupuesto te llegará en una solicitud.",
    "Si no estás satisfecho con el servicio recibido, te recomendamos comunicarte directamente con el profesional para abordar el problema. Si no puedes resolverlo de manera satisfactoria, contáctanos a través de nuestro equipo de atención al cliente y estaremos encantados de ayudarte a resolver cualquier problema.",
    "Si necesitas cancelar una cita con un profesional, Datazo te permite hacerlo desde la sección -Mis Solicitudes-, una vez allí dentro vas a poder ver tus solicitudes con los datos correspondientes y debajo aparece el botón -Cancelar-.",
    "Para dejar una reseña a un profesional, simplemente te llegará un correo con la opción de dejar una reseña. Puedes calificar su servicio y dejar un comentario detallando tu experiencia. Asegúrate de seguir nuestras pautas de reseñas y ser honesto y constructivo en tu retroalimentación.",
    "Si necesitas ayuda adicional o tienes alguna pregunta, puedes comunicarte con nuestro equipo de soporte técnico enviando un correo electrónico a datazosoporte@outlook.com o llamando a nuestro número de atención al cliente al 381 - 5111111. Estaremos encantados de asistirte en todo lo que necesites.",
  ];

  return (
    <div
      className="faq-container"
      style={{ marginBottom: "150px", fontFamily: "Inter" }}
    >
      <br></br>
      <br></br>
      <h3>Preguntas frecuentes</h3>
      {questions.map((question, index) => (
        <>
          <br></br>
          <div className="faq-item" key={index}>
            <button
              className="question-btn"
              onClick={() => toggleDropdown(index)}
            >
              {question}
              <span
                className={openIndex === index ? "arrow-up" : "arrow-down"}
              ></span>
            </button>
            {openIndex === index && <p className="answer">{answers[index]}</p>}
          </div>
        </>
      ))}
    </div>
  );
};

export default PreguntasFrecuentes;
