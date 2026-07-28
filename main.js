// Importamos funciones de la API.
// Estas funciones hacen las peticiones a TMDB.
import { obtenerPeliculas, obtenerDetalles, obtenerTrailer, obtenerPlataformas } from "./api.js";

// Importamos funciones encargadas de pintar información en HTML.
import { renderPeliculas, mostrarDetalles } from "./ui.js";

// Importamos las funciones de autenticación.
import { registrarUsuarios, iniciarSesion } from "./auth.js";

// Importamos la función que revisa si existe una sesión guardada.
import { cargarSesion } from "./storage.js";


// ======================================================
// ELEMENTOS DEL HTML
// ======================================================

// Barra superior donde aparece usuario y cerrar sesión.
const barraUsuario = document.getElementById("barraUsuario");

const contenedor = document.getElementById("contenedorPeliculas");

const inputBuscar = document.getElementById("buscar");

let peliculasGlobal = [];


// Perfil del usuario.
const perfilUsuario = document.getElementById("perfilUsuario");

// Botón cerrar sesión.
const btnCerrarSesion = document.getElementById("cerrarSesion");


// Pantallas principales.
const login = document.getElementById("login");
const app = document.getElementById("app");



// ======================================================
// CARGAR PELÍCULAS
// ======================================================

// Esta función se ejecuta solamente cuando
// el usuario ya inició sesión.
async function iniciarApp(){

    // Pedimos películas a la API.
    peliculasGlobal = await obtenerPeliculas();

    console.log(peliculasGlobal);

    // Mandamos las películas a la interfaz.
    renderPeliculas(peliculasGlobal);

}



// ======================================================
// MOSTRAR APLICACIÓN DESPUÉS DEL LOGIN
// ======================================================

// Esta función viene como callback desde auth.js.
// Se ejecuta cuando el usuario pone correo y contraseña correctos.

function mostrarApp(usuario){

    // Ocultamos formulario login.
    login.style.display = "none";


    // Mostramos aplicación.
    app.style.display = "block";


    // Mostramos barra del usuario.
    barraUsuario.style.display = "flex";


    // Personalizamos el mensaje.
    perfilUsuario.textContent =
    `Bienvenido ${usuario.nombre}`;


    // Mostramos botón cerrar sesión.
    btnCerrarSesion.style.display = "block";


    // Cargamos películas.
    iniciarApp();

}



// ======================================================
// VERIFICAR SI YA EXISTE SESIÓN
// ======================================================

// Esta función se ejecuta al abrir la página.

function verificarSesion(){

    // Revisamos LocalStorage.
    const usuarioActivo = cargarSesion();


    // Si existe usuario...
    if(usuarioActivo){


        login.style.display = "none";

        app.style.display = "block";


        barraUsuario.style.display = "flex";


        perfilUsuario.textContent =
        `Bienvenido ${usuarioActivo.nombre}`;


        btnCerrarSesion.style.display = "block";


        iniciarApp();


    }else{


        // Si no hay sesión mostramos login.
        login.style.display = "block";

        app.style.display = "none";


        barraUsuario.style.display = "none";

        btnCerrarSesion.style.display = "none";


    }

}



// Ejecutamos la verificación al iniciar.
verificarSesion();


// Activamos registro e inicio de sesión.
registrarUsuarios();

iniciarSesion(mostrarApp);




// ======================================================
// BUSCADOR EN TIEMPO REAL
// ======================================================

inputBuscar.addEventListener("input",(e)=>{


    const texto = e.target.value.toLowerCase();


    // filter crea un nuevo arreglo
    // con las películas que coinciden.
    const peliculasFiltradas = peliculasGlobal.filter(pelicula=>{


        return pelicula.title
        .toLowerCase()
        .includes(texto);


    });


    renderPeliculas(peliculasFiltradas);


});




// ======================================================
// CLICK EN UNA PELÍCULA
// ======================================================


contenedor.addEventListener("click", async(e)=>{


    const card = e.target.closest(".card");


    // Si no dio click en una tarjeta salimos.
    if(!card)return;



    const id = card.dataset.id;


    // Pedimos información extra.
    const pelicula = await obtenerDetalles(id);

    const trailer = await obtenerTrailer(id);

    const plataformas = await obtenerPlataformas(id);



    // Mandamos todo al modal.
    mostrarDetalles(
        pelicula,
        trailer,
        plataformas
    );


});




// ======================================================
// CERRAR SESIÓN
// ======================================================


btnCerrarSesion.addEventListener("click",()=>{


    // Eliminamos usuario activo.
    localStorage.removeItem("usuarioActivo");


    // Ocultamos botón.
    btnCerrarSesion.style.display="none";


    // Recargamos para volver al login.
    location.reload();


});