import { obtenerPeliculas, obtenerDetalles, obtenerTrailer, obtenerPlataformas } from "./api.js";
import { renderPeliculas, mostrarDetalles } from "./ui.js";
const contenedor = document.getElementById("contenedorPeliculas");
const inputBuscar = document.getElementById('buscar')
let peliculasGlobal = [];

async function iniciarApp(){

peliculasGlobal = await obtenerPeliculas();

renderPeliculas(peliculasGlobal)
};

iniciarApp();

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

})
