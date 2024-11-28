
const menus = [
    {nombre: "Inicio", url: "index.html"},          
    {nombre: "Contacto", url: "contacto.html"},    
    {nombre: "Carrito", url: "carrito.html"},       
];


function cargarmenu() {
   
    let enlaces = document.getElementById("ulmenu");

    
    for (const menu of menus) {
        let lista = document.createElement("li"); 
        lista.innerHTML = `<a href=${menu.url}>${menu.nombre}</a>`;
        
        enlaces.appendChild(lista);
    }
}

cargarmenu();
