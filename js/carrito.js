let carrito = [];
// Inicializamos el contador del carrito
let cartCount = 0;


//cargar productos en la pagina principal
/*Cargar los productos dinámicamente desde el archivo productos.html */
fetch('./main/productos.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('productos-container').innerHTML = data;
        })
    .catch(error => {
            console.error('Error cargando los productos:', error);
        }); 

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    const producto = {
        nombre: nombre,
        precio: precio,
        cantidad: 1
    }
    cartCount++;

    // Actualizamos el contador en el navbar
    document.getElementById("cart-count").textContent = cartCount;

    // Mostrar el popup de notificación
    const popupNotification = document.getElementById("popup-notification");
    popupNotification.classList.add("show");

    // Ocultamos el popup después de 2 segundos
    setTimeout(function() {
        popupNotification.classList.remove("show");
    }, 1000);
    // Verificar si el producto ya está en el carrito
    const index = carrito.findIndex(item => item.nombre === nombre);
    if (index > -1) {
        carrito[index].cantidad += 1; // Incrementar cantidad si ya existe
    } else {
        carrito.push(producto); // Agregar nuevo producto
    }

    actualizarCarrito();
    guardarCarrito(); // Guardar en localStorage
}

// Función para actualizar el carrito en la interfaz
function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    const totalElement = document.getElementById('total');

    if (!carritoItems || !totalElement) {
        console.error("Elementos del carrito no encontrados");
        return; // Sal de la función si los elementos no existen
    }

    carritoItems.innerHTML = ''; // Limpiar la tabla antes de actualizar
    let total = 0;

    carrito.forEach((item) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.precio}$</td>
            <td>${item.cantidad}</td>
            <td>${(item.precio * item.cantidad).toFixed(2)}$</td>
        `;
        carritoItems.appendChild(fila);
        total += item.precio * item.cantidad;
    });

    totalElement.textContent = total.toFixed(2);
}


// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
        carrito = carritoGuardado;
        actualizarCarrito();
    }
}

// Función para limpiar el carrito
function limpiarCarrito() {
    carrito = []; // Vaciar el carrito
    localStorage.removeItem('carrito'); // Limpiar el carrito de localStorage
    actualizarCarrito(); // Actualizar la vista del carrito
}

document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito(); // Llama a cargarCarrito cuando el DOM esté listo
});




// // Función para agregar un producto al carrito
// document.getElementById("add-to-cart-btn").addEventListener("click", function() {
//   // Incrementamos el contador del carrito
//   cartCount++;

//   // Actualizamos el contador en el carrito
//   document.getElementById("cart-count").textContent = cartCount;

//   // Mostramos el mensaje de notificación
//   const notification = document.getElementById("notification");
//   notification.style.display = "block";

//   // Ocultamos la notificación después de 2 segundos
//   setTimeout(function() {
//     notification.style.display = "none";
//   }, 2000);
// });

// Cargar el carrito al iniciar la página
window.onload = cargarCarrito;
