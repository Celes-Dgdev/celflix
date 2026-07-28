// ======================================================
// GUARDAR TODOS LOS USUARIOS REGISTRADOS
// ======================================================

// Recibe un arreglo de usuarios.
// Ejemplo:
// [
//   {nombre:"Celes", correo:"a@gmail.com", contrasena:"123"}
// ]
//
// Después convierte el arreglo a texto JSON
// para poder guardarlo dentro de LocalStorage.

export function guardarUsuarios(usuarios){

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

}



// ======================================================
// CARGAR USUARIOS REGISTRADOS
// ======================================================

// Obtiene la lista completa de usuarios
// guardados en LocalStorage.

export function cargarUsuarios(){

    // LocalStorage solo guarda texto.
    // JSON.parse convierte ese texto nuevamente
    // en un arreglo/objeto de JavaScript.
//
// Si no existe "usuarios",
// regresamos un arreglo vacío [] para evitar errores.

    const usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];


    console.log(usuarios);


    return usuarios;

}



// ======================================================
// GUARDAR USUARIO ACTIVO (SESIÓN)
// ======================================================

// Guarda solamente el usuario que inició sesión.
//
// Diferencia:
// guardarUsuarios()
// -> guarda TODOS los usuarios registrados.
//
// guardarSesion()
// -> guarda SOLO el usuario que está usando la aplicación.

export function guardarSesion(usuario){


    localStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuario)
    );


    console.log("Usuario guardado");

}



// ======================================================
// CARGAR USUARIO ACTIVO
// ======================================================

// Revisa si alguien ya inició sesión.
//
// Cuando vuelves a abrir la página,
// esta función permite saber si mostrar:
// LOGIN
// o
// APLICACIÓN

export function cargarSesion(){


    const usuario = JSON.parse(

        localStorage.getItem("usuarioActivo")

    );


    console.log("Usuario cargado");


    return usuario;

}