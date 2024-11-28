const menus = [
    { nombre: "Inicio", url: "index.html" },
    { nombre: "Contacto", url: "contacto.html" },
    { nombre: "Carrito", url: "carrito.html" },
];

function cargarmenu() {
    let enlaces = document.getElementById("ulmenu");
    if (enlaces) {
        for (const menu of menus) {
            let lista = document.createElement("li");
            lista.innerHTML = `<a href="${menu.url}">${menu.nombre}</a>`;
            enlaces.appendChild(lista);
        }
    } else {
        console.error("No se encontró el elemento 'ulmenu'");
    }
}

cargarmenu();


let productocarritos = JSON.parse(localStorage.getItem("carrito")) || [];

function cargarCarrito() {
    let enlaces = document.getElementById("tablacarrito");
    enlaces.innerHTML = ""; 

    if (productocarritos.length > 0) {
       
        let productosAgrupados = {};

        productocarritos.forEach(producto => {
            producto.cantidad = parseInt(producto.cantidad, 10); // Convertir a número

            if (productosAgrupados[producto.id]) {
                productosAgrupados[producto.id].cantidad += producto.cantidad;
            } else {
                productosAgrupados[producto.id] = { ...producto }; // Copia del producto
            }
        });

      
        for (const id in productosAgrupados) {
            let productocarrito = productosAgrupados[id];
            let lista = document.createElement("tr");
            lista.id = `producto-${productocarrito.id}`;
            lista.innerHTML = `
                <td><img src="${productocarrito.urlImagen}" width="50"></td>
                <td>${productocarrito.cantidad}</td>
                <td>${productocarrito.nombre}</td>
                <td>$${productocarrito.precio}</td>
                <td>$${productocarrito.cantidad * productocarrito.precio}</td>
                <td><button onclick="eliminarProducto(${productocarrito.id})">Eliminar</button></td>

                `;
            enlaces.appendChild(lista);
        }

        
        let total = 0;
        let cantidadTotal = 0;

        for (const id in productosAgrupados) {
            let producto = productosAgrupados[id];
            total += producto.cantidad * producto.precio;
            cantidadTotal += producto.cantidad;
        }

       
        let totalFila = document.createElement("tr");
        totalFila.innerHTML = `
        <td colspan="5" style="text-align: right;">Total Final: $${total}</td>
        <td>
            <button onclick="fin()">Ir a pagar</button>
        </td>
        `;
        enlaces.appendChild(totalFila);


       
        actualizarCarrito(cantidadTotal);

    } else {
        let mensaje = document.createElement("tr");
        mensaje.innerHTML = "<td colspan='6'>No hay productos en el carrito</td>";
        enlaces.appendChild(mensaje);

     
        actualizarCarrito(0);
    }
}



cargarCarrito();


function actualizarCarrito(totalProductos) {
    totalProductos = parseInt(totalProductos, 10); 

    const cantidadCarritoElement = document.getElementById("cantidad-carrito");
    if (cantidadCarritoElement) {
        cantidadCarritoElement.textContent = totalProductos;
    }
}

function eliminarProducto(id) {
    let nodo = document.getElementById(`producto-${id}`);
    if (nodo) {
        nodo.remove();
    }

    productocarritos = productocarritos.filter(producto => producto.id !== id);

    localStorage.setItem("carrito", JSON.stringify(productocarritos));

    cargarCarrito();
}

function fin() {
    alert("compra finalizada");
}


