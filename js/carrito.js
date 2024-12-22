let carrito = [];
// Inicializamos el contador del carrito
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;


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


 // Función para actualizar el contador en el navbar
function actualizarContadorCarrito() {
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) {
        cartCountSpan.textContent = cartCount; // Mostrar el contador en el navbar
    }
}

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
    const aux = document.getAnimations('cart-count');

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
    aux = cartCount;
}


// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem ('cart-count', cartCount);
}

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    const contador = JSON.parse(localStorage.getItem('cart-count'));
    if (carritoGuardado) {
        carrito = carritoGuardado;
        cartCount = contador;
        actualizarCarrito();
    }
}

// Función para limpiar el carrito
function limpiarCarrito() {
    carrito = []; // Vaciar el carrito
    localStorage.removeItem('carrito'); // Limpiar el carrito de localStorage
    localStorage.removeItem ('cart-count')
    actualizarCarrito(); // Actualizar la vista del carrito
}

document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito(); // Llama a cargarCarrito cuando el DOM esté listo
});



// Al cargar la página, actualizar el contador en el navbar
window.onload = function() {
    actualizarContadorCarrito(); // Asegura que el contador se actualice en el navbar
};


// Función para expandir o colapsar la tarjeta
function expandirTarjeta(elemento) {
    // Evitar que el clic en el botón "Agregar al Carrito" expanda la tarjeta
    if (event.target.tagName === 'BUTTON') {
        return;
    }

    // Si la tarjeta ya está expandida, la contraemos
    if (elemento.classList.contains('expandida')) {
        elemento.classList.remove('expandida');
    } else {
        // Si no está expandida, la expandimos
        elemento.classList.add('expandida');
    }
}