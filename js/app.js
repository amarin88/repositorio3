let articulosCompra = JSON.parse(localStorage.getItem("carrito")) || [];

const listaProductos = document.querySelector('#lista_productos');

const contenedorCarrito = document.querySelector('#lista_carrito tbody');

const btnVaciarCarrito = document.querySelector('#vaciar_carrito');

const carrito = document.querySelector('#carrito');

const valorTotal = document.querySelector('#total_pagar')

const contenidolistaProductos = document.getElementById("lista_productos")


document.addEventListener('DOMContentLoaded', () => {
    dibujarCarritoHTML();
    obtenerProductos();
});

const obtenerProductos = async () => {
    try {
    const respuesta = await fetch("productos.json");
    const data = await respuesta.json();
    mostrarProductos(data);
}   catch (error) {
    console.error("Error al obtener los productos:", error);
}
};



function mostrarProductos(data) {
    data.forEach((dato) => {
    let contenido = document.createElement("div");
    contenido.className = "col w-30 mb-3";
    contenido.style = "width: 18rem";
    contenido.innerHTML = `
        
        <div class="card h-100 text-center" id="card">
        <img class="card-img-top" id="img_producto" src="${dato.img}" alt="">
        <div class="card-body">
        <h5 class="card-title">${dato.nombre}</h5>
        <p class="card-text">$${dato.precio}</p>
        <button onClick={productoAgregado} type="button" class="btn btn-primary" id="${dato.id}">Agregar al Carrito</button>
        </div>
        
    `;

    contenidolistaProductos.appendChild(contenido);      
    const btnComprar = document.getElementById(`${dato.id}`)
    btnComprar.addEventListener('click', ()=> {
        agregarAlCarrito(data,dato.id)
    })
    });
};


const agregarAlCarrito = (data,id) =>{
    const producto = data.find((producto) => producto.id === id);
    const productoEnCarrito = articulosCompra.find((producto) => producto.id === id);
    if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
    } else{
    articulosCompra.push(producto);
    }
    dibujarCarritoHTML();
}

function dibujarCarritoHTML(){
    
    total = 0;
    limpiarCarrito();
    
    articulosCompra.forEach(data => {
        
        const lista = document.createElement('tr')
        
        lista.innerHTML = `
        
        
        <td><img id = "img_producto_carrito" src="${data.img}" width="48" height="24" /></td>
        <td>${data.nombre}</td>
        <td>$${data.precio}</td>
        <td>${data.cantidad}</td>
        <td>
        <button type="button" class="btn btn-danger btn-sm" data-id="${data.id}" id="eliminar-${data.id}">x</button>
        </td>
        `;

        

        contenedorCarrito.appendChild(lista);
        const btnEliminar = document.getElementById(`eliminar-${data.id}`);
        btnEliminar.addEventListener('click',eliminarDelCarrito);
        btnVaciarCarrito.addEventListener('click', vaciarCarrito);
    
        total = calcularTotal()
    });

    valorTotal.innerText = `$ ${total}`
    
    sincronizarStorage();
};

function calcularTotal(){

    const total = articulosCompra.reduce((acc,ite) => acc + ite.precio * ite.cantidad, 0)
    return total
};


const eliminarDelCarrito = (e) => {
    const id = e.target.dataset.id
    const indice = articulosCompra.findIndex ((producto) => producto.id === parseInt(id));
    articulosCompra.splice(indice, 1);

    dibujarCarritoHTML();
};

function limpiarCarrito(){
    
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
};

function vaciarCarrito(){
    
    while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
};

    articulosCompra=[];
    total = 0;
    valorTotal.innerText = "$ 0";
    sincronizarStorage();
};

function sincronizarStorage(){
    
    localStorage.setItem('carrito', JSON.stringify(articulosCompra))
};

toast.success('Successfully toasted!')

