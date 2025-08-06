const lista = document.getElementById("listaTareas");
const agregarBtn = document.getElementById("agregarBtn");
const ordenarBtn = document.getElementById("ordenarBtn");
const nuevaTarea = document.getElementById("nuevaTarea");
const buscarTarea = document.getElementById("buscarTarea");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function mostrarTareas(filtro = "") {
    lista.innerHTML = "";
    tareas
        .filter(t => t.toLowerCase().includes(filtro.toLowerCase()))
        .forEach((t, i) => {
            const li = document.createElement("li");

            // Texto de la tarea
            const span = document.createElement("span");
            span.textContent = t;
            span.style.marginRight = "10px";
            span.addEventListener("dblclick", () => {
                const editado = prompt("Edita la tarea:", t);
                if (editado) {
                    tareas[i] = editado;
                    guardarTareas();
                    mostrarTareas(filtro);
                }
            });

            // Botón de borrar tarea
            const btnBorrar = document.createElement("button");
            btnBorrar.textContent = "❌";
            btnBorrar.style.marginLeft = "5px";
            btnBorrar.onclick = () => {
                if (confirm("¿Seguro que quieres eliminar esta tarea?")) {
                    tareas.splice(i, 1);
                    guardarTareas();
                    mostrarTareas(filtro);
                }
            };

            li.appendChild(span);
            li.appendChild(btnBorrar);
            lista.appendChild(li);
        });
}

agregarBtn.addEventListener("click", () => {
    if (nuevaTarea.value.trim() !== "") {
        tareas.push(nuevaTarea.value.trim());
        nuevaTarea.value = "";
        guardarTareas();
        mostrarTareas();
    }
});

ordenarBtn.addEventListener("click", () => {
    tareas.sort((a, b) => a.localeCompare(b));
    guardarTareas();
    mostrarTareas();
});

buscarTarea.addEventListener("input", (e) => {
    mostrarTareas(e.target.value);
});

mostrarTareas();
