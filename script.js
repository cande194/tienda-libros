//variables para almacenar libros y carrito
let libros = [];
let carrito = [];

//elementos del DOM
const titulo_input=document.getElementById('titulo');
const precio_input=document.getElementById('precio');
const boton_agregar=document.getElementById('agregar_libro');
const seccion_libros=document.getElementById('libros_disponibles');
const seccion_carrito=document.getElementById('carrito');
const total_carrito=document.getElementById('total');

//funcion para agregar un nuevo libro
function agregarLibro(){
    const titulo=titulo_input.value.trim();
    const precio=parseFloat(precio_input.value);
    
    if (!titulo || isNaN(precio) || precio <= 0){
        alert('Debe ingresar un titulo y precio valido');
        return;
    }
    
    libros.push({titulo, precio});
    mostrarLibrosDisponibles();
    
    titulo_input.value='';
    precio_input.value='';
}

//funcion para mostrar libros disponibles
function mostrarLibrosDisponibles(){
    seccion_libros.innerHTML='';
    
    libros.forEach((libro,index)=>{
        const libroDiv=document.createElement('div');
        libroDiv.innerHTML=`
            ${libro.titulo}
            Precio: $${libro.precio.toFixed(2)}
            <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
        `;
        seccion_libros.appendChild(libroDiv);
    });
}

//funcion para agregar libro al carrito
function agregarAlCarrito(index){
    if (index >= 0 && index < libros.length){
        carrito.push(libros[index]);
        mostrarCarrito();
    }
}

//funcion para mostrar carrito
function mostrarCarrito(){
    seccion_carrito.innerHTML='';
    
    if (carrito.length===0){
        seccion_carrito.textContent='El carrito está vacio';
        total_carrito.textContent='0';
        return;
    }
    
    let total=0;
    carrito.forEach((libro, index)=>{
        const item=document.createElement('div');
        item.innerHTML=`
            ● ${libro.titulo} - $${libro.precio.toFixed(2)}
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        seccion_carrito.appendChild(item);
        total+=libro.precio;
    });
    
    total_carrito.textContent=total.toFixed(2);
}

//funcion para eliminar del carrito
function eliminarDelCarrito(index){
    if (index >= 0 && index < carrito.length){
        carrito.splice(index,1);
        mostrarCarrito();
    }
}

boton_agregar.addEventListener('click',agregarLibro);

mostrarCarrito();