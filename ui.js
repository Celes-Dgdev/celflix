// ======================================================
// ELEMENTO PRINCIPAL DE LA INTERFAZ
// ======================================================

// Buscamos el contenedor donde aparecerán
// todas las tarjetas de películas.

const contenedor = document.getElementById("contenedorPeliculas");



// ======================================================
// RENDERIZAR PELÍCULAS
// ======================================================

// Esta función recibe un arreglo de películas
// y crea el HTML de cada tarjeta.

export function renderPeliculas(peliculas){


// map() recorre cada película del arreglo.
// Por cada película creamos una tarjeta HTML.

const html = peliculas.map(pelicula => {


    // TMDB no entrega la URL completa.
    // Solo manda el nombre del poster.
    //
    // Por eso construimos la dirección completa.

    const imagen =
    `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;



    // map() necesita que devolvamos algo
    // en cada vuelta.
    //
    // Aquí devolvemos una tarjeta por película.

    return `

    <div class="card" data-id="${pelicula.id}">

        <img 
        src="${imagen}" 
        alt="${pelicula.title}">


        <h2>${pelicula.title}</h2>


        <p>⭐ ${pelicula.vote_average}</p>


        <p>📅 ${pelicula.release_date}</p>


    </div>

    `;


}).join("");



// map devuelve un arreglo de textos.
//
// Ejemplo:
//
// [
// "<div>pelicula 1</div>",
// "<div>pelicula 2</div>"
// ]
//
// join("") une todo en un solo bloque de HTML.
//
// Después innerHTML convierte ese texto
// en elementos reales del DOM.

contenedor.innerHTML = html;


}




// ======================================================
// MOSTRAR DETALLES DE UNA PELÍCULA
// ======================================================


// Esta función abre el modal con información completa.

export function mostrarDetalles(
    pelicula,
    trailer,
    plataformas
){


const modal = document.getElementById("modal");



// Creamos dinámicamente el contenido del modal.
// innerHTML permite insertar HTML desde JavaScript.

modal.innerHTML = `


<div class="detalle">


<img
src="https://image.tmdb.org/t/p/original${pelicula.backdrop_path}"
alt="${pelicula.title}">


<h2>${pelicula.title}</h2>


<p>${pelicula.overview}</p>


<p>⭐ ${pelicula.vote_average}</p>


<p>📅 ${pelicula.release_date}</p>



<button id="verTrailer">
▶ Ver tráiler
</button>



<button id="dondeVer">
▶ Disponibles en:
</button>



<button id="cerrarModal">
✖
</button>



</div>

`;




// ======================================================
// BOTÓN TRAILER
// ======================================================


// Como el botón fue creado con innerHTML,
// todavía no existe en el DOM.
// Primero tenemos que buscarlo.

const btnTrailer =
document.getElementById("verTrailer");



// Cuando el usuario presiona,
// abrimos YouTube con el trailer.

btnTrailer.addEventListener("click",()=>{


window.open(
`https://www.youtube.com/watch?v=${trailer.key}`
);


});




// ======================================================
// CERRAR MODAL
// ======================================================


const btncerrar =
document.getElementById("cerrarModal");



btncerrar.addEventListener("click",()=>{


// Ocultamos el modal.

modal.style.display = "none";


// Limpiamos el contenido creado.

modal.innerHTML = "";


});



// Mostramos el modal.
// En CSS normalmente empieza con display:none.

modal.style.display = "flex";




// ======================================================
// PLATAFORMAS DISPONIBLES
// ======================================================


// TMDB devuelve las plataformas separadas
// por países.
//
// Nosotros buscamos México.

const btndondeVer =
document.getElementById("dondeVer");

const mexico = plataformas.results?.MX;



btndondeVer.addEventListener("click",()=>{



// Si no existe información de México.

if(!mexico){


btndondeVer.textContent =
"❌ No disponible en México";


btndondeVer.disabled = true;


return;

}



// Si existe,
// abrimos el enlace de plataformas.

window.open(mexico.link);


});


}