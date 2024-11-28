// Definición de un array 'menus' que contiene los elementos de navegación con sus nombres y URLs
const menus = [
    { nombre: "Inicio", url: "index.html" },         
    { nombre: "Contacto", url: "contacto.html" },   
    { nombre: "Carrito", url: "carrito.html" },     
];


function cargarmenu() {
    let enlaces = document.getElementById("ulmenu");

    if (enlaces) {
        for (const menu of menus) {
            let lista = document.createElement("li"); // Crea un elemento <li> para cada menú
            lista.innerHTML = `<a href="${menu.url}">${menu.nombre}</a>`; // Crea un enlace <a> con la URL y el nombre
            enlaces.appendChild(lista); // Añade el <li> al contenedor "ulmenu"
        }
    } else {
        console.error("No se encontró el elemento 'ulmenu'"); // Mensaje de error si no se encuentra el contenedor
    }
}

cargarmenu();

let productodetalle = JSON.parse(localStorage.getItem("detalleproducto"));

function cargarproducto() {
    let enlaces = document.getElementById("boxproductos");

    let lista = document.createElement("div");
    lista.innerHTML = `
        <div class="boxdetalle">
            <div>
                <h3>${productodetalle.nombre}</h3> <!-- Muestra el nombre del producto -->
                <img src=${productodetalle.urlImagen} alt="" width="200"> <!-- Muestra la imagen del producto -->
            </div>
            <div class="boxdescripcion">
                <p class="precio">$ ${productodetalle.precio}</p> <!-- Muestra el precio -->
                <p>${productodetalle.descripcion}</p> <!-- Muestra la descripción -->
                <div class="boxcontador">
                    <button onclick="sumar()">+</button> <!-- Botón para sumar cantidad -->
                    <p id="contarproducto">0</p> <!-- Muestra la cantidad de productos seleccionados -->
                    <button onclick="restar()">-</button> <!-- Botón para restar cantidad -->
                </div>
                <button onclick="cargarcarrito()">Cargar al carrito</button> <!-- Botón para agregar al carrito -->
            </div>
        </div>
    `;
    // Añade el contenedor con los detalles del producto al contenedor "boxproductos"
    enlaces.appendChild(lista);
}

// Llama a la función para cargar el producto al cargar la página
cargarproducto();

// Variable para llevar el control de la cantidad de productos seleccionados
let contador = 0;

// Función para sumar la cantidad de productos
function sumar() {
    let nstock = productodetalle.stock; // Obtiene el stock máximo del producto
    if (contador < nstock) { // Si no hemos alcanzado el máximo, incrementa la cantidad
        contador = contador + 1;
        document.getElementById("contarproducto").innerHTML = contador; // Actualiza el contador en la página
    } else {
        alert("Stock máximo de producto"); // Muestra alerta si se supera el stock
    }
}

// Función para restar la cantidad de productos
function restar() {
    if (contador > 0) { // Si la cantidad es mayor que 0, decrementa la cantidad
        contador = contador - 1;
        document.getElementById("contarproducto").innerHTML = contador; // Actualiza el contador en la página
    }
}

// Función para agregar el producto al carrito
function cargarcarrito() {
    if (contador === 0) { // Si no se ha seleccionado cantidad, muestra alerta
        alert("Por favor, ingrese la cantidad de productos deseados.");
    } else {
        // Obtiene el carrito almacenado en localStorage, o un array vacío si no existe
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        
        // Obtiene la cantidad de productos seleccionados desde el contador en la página
        let cantidadproducto = parseInt(document.getElementById("contarproducto").innerHTML, 10);

        // Crea un objeto con los datos del producto a agregar al carrito
        let productoNuevo = {
            id: productodetalle.id,          // ID del producto
            nombre: productodetalle.nombre,  // Nombre del producto
            cantidad: cantidadproducto,      // Cantidad seleccionada
            precio: productodetalle.precio,  // Precio del producto
            urlImagen: productodetalle.urlImagen // URL de la imagen del producto
        };

        // Verifica si el producto ya existe en el carrito
        let encontrado = carrito.find(p => p.id === productoNuevo.id);
        if (encontrado) { // Si el producto ya está en el carrito, suma las cantidades
            encontrado.cantidad = parseInt(encontrado.cantidad, 10) + cantidadproducto;
        } else { // Si no está, lo agrega al carrito
            carrito.push(productoNuevo);
        }

        // Convierte el carrito a JSON y lo guarda en localStorage
        const enJSON = JSON.stringify(carrito);
        localStorage.setItem("carrito", enJSON);

        // Redirige a la página del carrito
        window.location.href = "carrito.html";
    }
}
