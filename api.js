import { API_KEY, BASE_URL } from "./config.js";

export async function obtenerPeliculas() {

    try {

        const respuesta = await fetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-MX&page=1`
        );

        const datos = await respuesta.json();

        return datos.results;

    } catch (error) {

        console.error(error);

        return [];

    }

}

export async function obtenerDetalles(id) {

    try {

        const respuesta = await fetch(
            `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-MX`
        );

        const datos = await respuesta.json();

        return datos;

    } catch (error) {

        console.error(error);

    }

}

    export async function obtenerTrailer(id){
        try{
    const respuesta = await fetch(
         `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=es-MX`
        
       );

    const datos = await respuesta.json();

    // aqui ponemos el find() para que aparezca el trailer
    const trailer = datos.results.find(video => {
  return video.type === 'Trailer';
    })

    return trailer;

        }catch(error){
            console.error(error)
        }
    }

export async function obtenerPlataformas(id) {
    try{
        const respuesta = await fetch(
             `${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}&language=es-MX`
        )
        const datos = await respuesta.json();

        return datos;

    } catch (error){
        console.error(error)
    }
}
