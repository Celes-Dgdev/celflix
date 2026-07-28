// Importamos las funciones que manejan LocalStorage.
// cargarUsuarios() -> obtiene todos los usuarios registrados.
// guardarUsuarios() -> guarda la lista de usuarios.
// cargarSesion() -> obtiene el usuario que tiene la sesión iniciada.
// guardarSesion() -> guarda el usuario que inició sesión.
import { cargarUsuarios, guardarUsuarios, cargarSesion, guardarSesion } from "./storage.js";

// ======================================================
// OBTENEMOS LOS ELEMENTOS DEL HTML
// ======================================================

// Capturamos los inputs y botones para poder
// leer la información que escribe el usuario
// y reaccionar cuando haga clic.

const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");
const nombre = document.getElementById("nombre");

const btnInicioSesion = document.getElementById("inicioSesion");
const btnCrearCuenta = document.getElementById("crearCuenta");


// ======================================================
// REGISTRAR USUARIO
// ======================================================

// Esta función registra nuevos usuarios.
export function registrarUsuarios(){

    // Esperamos que el usuario haga clic
    // en el botón "Crear Cuenta".
    btnCrearCuenta.addEventListener("click", () => {

        // Guardamos lo que escribió el usuario
        // en variables.
        const nombreUsuario = nombre.value;
        const correoUsuario = correo.value;
        const contrasenaUsuario = contrasena.value;

        // Cargamos todos los usuarios registrados
        // desde LocalStorage.
        const usuarios = cargarUsuarios();

        // Agregamos un nuevo objeto al arreglo.
        usuarios.push({

            nombre: nombreUsuario,
            correo: correoUsuario,
            contrasena: contrasenaUsuario

        });

        // Guardamos nuevamente el arreglo actualizado.
        guardarUsuarios(usuarios);

        // Limpiamos los inputs para dejar listo
        // el formulario.
        nombre.value = "";
        correo.value = "";
        contrasena.value = "";

        // Avisamos que todo salió correctamente.
        alert("Usuario registrado correctamente");

    });

}


// ======================================================
// INICIAR SESIÓN
// ======================================================

// Esta función verifica si el usuario puede entrar.
export function iniciarSesion(mostrarApp){

    // Esperamos el clic del botón.
    btnInicioSesion.addEventListener("click", () => {

        // Obtenemos lo que escribió el usuario.
        const correoUsuario = correo.value;
        const contrasenaUsuario = contrasena.value;

        // Cargamos todos los usuarios registrados.
        const usuarios = cargarUsuarios();

        // Buscamos un usuario cuyo correo sea igual
        // al correo que escribió el usuario.
        // find() regresa el PRIMER usuario que encuentre.
        const usuario = usuarios.find(usuario => {

            return usuario.correo === correoUsuario;

        });

        // ======================================
        // VALIDAMOS SI EL USUARIO EXISTE
        // ======================================

        // Si find() no encontró nada,
        // usuario será undefined.
        if(!usuario){

            alert("Usuario no encontrado");

            // Detenemos la función.
            return;

        }

        // ======================================
        // VALIDAMOS LA CONTRASEÑA
        // ======================================

        // Comparamos la contraseña guardada
        // contra la que escribió el usuario.
        if(usuario.contrasena !== contrasenaUsuario){

            alert("Contraseña incorrecta");

            return;

        }

        // ======================================
        // SESIÓN CORRECTA
        // ======================================

        // Guardamos al usuario que inició sesión.
        // Ya no guardamos toda la lista,
        // solamente el usuario activo.
        guardarSesion(usuario);

        alert("Hola, soy Celes. Este es mi proyecto. ¡Bienvenido y disfrútalo!");

        // Llamamos la función que viene desde main.js
        // para mostrar la aplicación.
        mostrarApp(usuario);

    });

}