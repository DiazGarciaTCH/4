const productos = [
    { nombre: "Café Americano", precio: 20 },
    { nombre: "Latte", precio: 25 },
    { nombre: "Capuchino", precio: 30 },
    { nombre: "Té Verde", precio: 15 },
    { nombre: "Croissant", precio: 10 },
    { nombre: "Brownie", precio: 8 }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productosEl = document.getElementById("productos");
const carritoEl = document.getElementById("carrito");
const totalEl = document.getElementById("total");
const pagarBtn = document.getElementById("pagarBtn");
const pagoEl = document.getElementById("pago");

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarProductos() {
    productosEl.innerHTML = "";
    productos.forEach((p, i) => {
        const div = document.createElement("div");
        div.textContent = `${p.nombre} - $${p.precio}`;
        const btn = document.createElement("button");
        btn.textContent = "Agregar";
        btn.onclick = () => {
            carrito.push(p);
            guardarCarrito();
            mostrarCarrito();
        };
        div.appendChild(btn);
        productosEl.appendChild(div);
    });
}

function mostrarCarrito() {
    carritoEl.innerHTML = "";
    let total = carrito.reduce((acc, p) => acc + p.precio, 0);
    if (total > 100) total *= 0.9; // 10% descuento
    carrito.forEach((p, i) => {
        const li = document.createElement("li");
        li.textContent = `${p.nombre} - $${p.precio}`;
        const btn = document.createElement("button");
        btn.textContent = "Quitar";
        btn.onclick = () => {
            carrito.splice(i, 1);
            guardarCarrito();
            mostrarCarrito();
        };
        li.appendChild(btn);
        carritoEl.appendChild(li);
    });
    totalEl.textContent = total.toFixed(2);
}

pagarBtn.onclick = () => {
    pagoEl.style.display = "block";
};

document.getElementById("confirmarPago").onclick = () => {
    alert("Pago confirmado ✅");
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
    pagoEl.style.display = "none";
};
mostrarProductos();
mostrarCarrito();
