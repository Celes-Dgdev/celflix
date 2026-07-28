import { obtenerPeliculas, obtenerDetalles, obtenerTrailer, obtenerPlataformas } from "./api.js";
import { renderPeliculas, mostrarDetalles } from "./ui.js";
import { registrarUsuarios, iniciarSesion } from "./auth.js";
import { cargarSesion } from "./storage.js";

const barraUsuario = document.getElementById("barraUsuario");
const contenedor = document.getElementById("contenedorPeliculas");
const inputBuscar = document.getElementById('buscar')
let peliculasGlobal = [];

//para entrar
const perfilUsuario = document.getElementById("perfilUsuario");
const btnCerrarSesion = document.getElementById("cerrarSesion");
//detectamos secion si el user entro para poderle mostrar la paguina
const login = document.getElementById("login");
const app = document.getElementById("app");

// si si, mostramos estilos

async function iniciarApp(){

peliculasGlobal = await obtenerPeliculas();
    console.log(peliculasGlobal);
    renderPeliculas(peliculasGlobal)
};


//cramos funcion 
function mostrarApp(usuario){

    login.style.display = "none";
    app.style.display = "block";


    barraUsuario.style.display = "flex";


    perfilUsuario.textContent =
    `Bienvenido ${usuario.nombre}`;
    

    btnCerrarSesion.style.display = "block";

    iniciarApp();

}
function verificarSesion(){

    const usuarioActivo = cargarSesion();

    if(usuarioActivo){

        login.style.display = "none";
        app.style.display = "block";


    barraUsuario.style.display = "flex";


        perfilUsuario.textContent = 
`Bienvenido ${usuarioActivo.nombre}`;


    btnCerrarSesion.style.display = "block";

        iniciarApp();

    }else{

        login.style.display = "block";
        app.style.display = "none";
   btnCerrarSesion.style.display = "none";

    barraUsuario.style.display = "none";
    }
   
}

verificarSesion();
registrarUsuarios()
iniciarSesion(mostrarApp)

// function buscarPeliculas(){};

//agregamos el evento buscar al input
inputBuscar.addEventListener('input', (e) =>{

const texto = e.target.value.toLowerCase();

const peliculasFiltradas = peliculasGlobal.filter(pelicula =>{

    return pelicula.title.toLowerCase().includes(texto);
})
renderPeliculas(peliculasFiltradas);
});

contenedor.addEventListener('click', async (e) =>{
const card =e.target.closest('.card');

if (!card)return;
//despues de obtener la rpomesa de fetch ponemos las constantes en mainpara imprimir y comprovar
const id = card.dataset.id;
const pelicula = await obtenerDetalles(id);
const trailer = await obtenerTrailer(id);

const  plataformas = await obtenerPlataformas(id)


mostrarDetalles(pelicula, trailer, plataformas);

});

 btnCerrarSesion.addEventListener("click", () => {

    localStorage.removeItem("usuarioActivo");

    btnCerrarSesion.style.display = "none";

    location.reload();

});

