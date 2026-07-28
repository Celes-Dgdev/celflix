// creamos el archivo en el documento correspondiente
const contenedor = document.getElementById('contenedorPeliculas');


export function renderPeliculas(peliculas){

const html = peliculas.map(pelicula => {

    // variable para crear el poster pach de la peli

    const imagen = ` https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;

    //map necesita que regresemos algo por cada elemento.
    //regresamos una tarjeta por cada vuelta que de map

    return`
    
    <div class="card" data-id="${pelicula.id}" style="cursor:pointer;">

    <img src = "${imagen}" alt = "${pelicula.title}">

    <h2>${pelicula.title}</h2>

    <p>⭐ ${pelicula.vote_average}</p>

    <p>📅 ${pelicula.release_date}</p>

  </div>
    `
}).join("");

//son join('' tendremos solo el arreglo de texto incluidas las etiquetas
//pero inner no quiere solo el arreglo asi que transformamamos el areglo 
// a un bloque de html para que javascrip lo pueda lleer 
// y no que solo en texto con join('').

contenedor.innerHTML = html;

};
export function mostrarDetalles(pelicula, trailer, plataformas){
    const modal = document.getElementById("modal");

    modal.innerHTML = `
        <div class="detalle">

<img
    src="https://image.tmdb.org/t/p/original${pelicula.backdrop_path}"
    alt="${pelicula.title}">

            <h2>${pelicula.title}</h2>

            <p>${pelicula.overview}</p>

            <p>⭐ ${pelicula.vote_average}</p>

            <p>📅 ${pelicula.release_date}</p>

            <button id = 'verTrailer'>  ▶ Ver tráiler </button>

            <button id = 'dondeVer'>  ▶ Disponibles en: </button>


            <button id="cerrarModal">✖</button>
    

        </div>
        `;
        // ponemos el btn trailer ese esta en ver trailer en ui.js

const btnTrailer = document.getElementById('verTrailer');

btnTrailer.addEventListener('click', () =>{
window.open (`https://www.youtube.com/watch?v=${trailer.key}`)
})

// boton para cerrar el modal donde le pponemos su const para que vincule a html pero ese esta directo 
// en iinerhtml en ui.js

    const btncerrar = document.getElementById('cerrarModal');

        btncerrar.addEventListener('click', () =>{
            
            //ocultamos el modal con none 
            modal.style.display = 'none';

            modal.innerHTML = '';
        })


        //ponemos el estilo el modal con displey flex para cando se muestre aparexca co ese
        //estylo mientras que en css este modal esta oculto con none.
        modal.style.display = "flex";
        
            const btndondeVer = document.getElementById('dondeVer');
            
            const mexico = plataformas.results?.MX;
     
        btndondeVer.addEventListener('click', () =>{

                    if(!mexico){
    btndondeVer.textContent = "❌ No disponible en México";
    btndondeVer.disabled = true;
                        return;
}

            window.open(mexico.link)

        })

    
    }

    
