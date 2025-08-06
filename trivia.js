const questions = [
    // HTML
    { pregunta: "¿Qué etiqueta se usa para el título de una página web?", opciones: ["<h1>", "<title>", "<head>"], respuesta: "<title>" },
    { pregunta: "¿Cuál es la etiqueta correcta para crear un enlace?", opciones: ["<link>", "<a>", "<href>"], respuesta: "<a>" },
    { pregunta: "¿Qué atributo se usa para mostrar texto alternativo en una imagen?", opciones: ["alt", "title", "src"], respuesta: "alt" },
    { pregunta: "¿Qué etiqueta HTML se usa para listas ordenadas?", opciones: ["<ul>", "<ol>", "<li>"], respuesta: "<ol>" },

    // CSS
    { pregunta: "¿Qué propiedad CSS cambia el color del texto?", opciones: ["font-color", "text-color", "color"], respuesta: "color" },
    { pregunta: "¿Cuál es la propiedad CSS para cambiar el fondo?", opciones: ["background-color", "color-background", "bgcolor"], respuesta: "background-color" },
    { pregunta: "¿Qué unidad CSS es relativa al tamaño de la fuente del elemento?", opciones: ["px", "em", "%"], respuesta: "em" },
    { pregunta: "¿Qué propiedad CSS se usa para cambiar el tamaño del texto?", opciones: ["font-size", "text-size", "size"], respuesta: "font-size" }
];

let indice = 0, puntaje = 0, tiempo = 10, temporizador;
let historial = JSON.parse(localStorage.getItem("historialTrivia")) || [];

const preguntaEl = document.getElementById("pregunta");
const opcionesEl = document.getElementById("opciones");
const feedbackEl = document.getElementById("feedback");
const tiempoEl = document.getElementById("tiempo");
const puntajeEl = document.getElementById("puntaje");
const historialEl = document.getElementById("historial");

function mostrarPregunta() {
    if (indice >= questions.length) {
        historial.push(puntaje);
        localStorage.setItem("historialTrivia", JSON.stringify(historial));
        alert(`Fin del juego. Puntaje: ${puntaje}`);
        mostrarHistorial();
        return;
    }
    tiempo = 10;
    preguntaEl.textContent = questions[indice].pregunta;
    opcionesEl.innerHTML = "";
    feedbackEl.textContent = "";
    questions[indice].opciones.forEach(op => {
        const btn = document.createElement("button");
        btn.textContent = op;
        btn.onclick = () => {
            if (op === questions[indice].respuesta) {
                puntaje++;
                feedbackEl.textContent = "✅ Correcto!";
            } else {
                feedbackEl.textContent = "❌ Incorrecto!";
            }
            puntajeEl.textContent = puntaje;
            clearInterval(temporizador);
            setTimeout(() => {
                indice++;
                mostrarPregunta();
            }, 1000);
        };
        opcionesEl.appendChild(btn);
    });
    puntajeEl.textContent = puntaje;
    iniciarTemporizador();
}

function iniciarTemporizador() {
    tiempoEl.textContent = tiempo;
    temporizador = setInterval(() => {
        tiempo--;
        tiempoEl.textContent = tiempo;
        if (tiempo === 0) {
            clearInterval(temporizador);
            indice++;
            mostrarPregunta();
        }
    }, 1000);
}

function mostrarHistorial() {
    historialEl.innerHTML = "";
    historial.forEach((p, i) => {
        const li = document.createElement("li");
        li.textContent = `Intento ${i + 1}: ${p} puntos`;
        historialEl.appendChild(li);
    });
}

mostrarHistorial();
mostrarPregunta();
