import { API_KEY, BASE_URL } from "./config.js";

// ======================================================
// OBTENER PELÍCULAS POPULARES
// ======================================================

// Función asíncrona porque fetch tarda en responder.
// async nos permite usar await.
export async function obtenerPeliculas() {

    try {

        // Hacemos la petición a la API de TMDB.
        // BASE_URL viene de config.js
        // API_KEY es nuestra llave de acceso.
        const respuesta = await fetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-MX&page=1`
        );

        // Convertimos la respuesta JSON en un objeto de JavaScript.
        const datos = await respuesta.json();

        // La API devuelve mucha información.
        // Nosotros solo queremos el arreglo de películas.
        return datos.results;

    } catch (error) {

        // Si ocurre un error (internet, API caída, etc.)
        console.error(error);

        // Regresamos un arreglo vacío para que
        // la aplicación no se rompa.
        return [];

    }

}

// ======================================================
// OBTENER DETALLES DE UNA PELÍCULA
// ======================================================

// Recibe el id de la película que el usuario seleccionó.
export async function obtenerDetalles(id) {

    try {

        // Pedimos únicamente los datos de esa película.
        const respuesta = await fetch(
            `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-MX`
        );

        // Convertimos el JSON a objeto.
        const datos = await respuesta.json();

        // Regresamos toda la información.
        return datos;

    } catch (error) {

        console.error(error);

    }

}

// ======================================================
// OBTENER EL TRÁILER
// ======================================================

// Cada película puede tener muchos videos.
// Esta función busca únicamente el tráiler.
export async function obtenerTrailer(id){

    try{

        // Pedimos todos los videos de la película.
        const respuesta = await fetch(
            `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=es-MX`
        );

        // Convertimos el JSON.
        const datos = await respuesta.json();

        // results es un arreglo de videos.
        // find() recorre el arreglo y regresa
        // el primer elemento que cumpla la condición.
        const trailer = datos.results.find(video => {

            // Solo queremos el que sea tipo Trailer.
            return video.type === "Trailer";

        });

        // Regresamos únicamente el tráiler.
        return trailer;

    }catch(error){

        console.error(error);

    }

}

// ======================================================
// OBTENER PLATAFORMAS DE STREAMING
// ======================================================

// Devuelve en qué plataformas está disponible
// la película (Netflix, Prime Video, Disney+, etc.)
export async function obtenerPlataformas(id) {

    try{

        const respuesta = await fetch(
            `${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}&language=es-MX`
        );

        // Convertimos el JSON.
        const datos = await respuesta.json();

        // Regresamos toda la información.
        return datos;

    } catch (error){

        console.error(error);

    }

}