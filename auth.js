import { cargarUsuarios, guardarUsuarios } from "./storage.js";

const correo = document.getElementById('correo');
const contrasena = document.getElementById("contrasena");
const nombre = document.getElementById("nombre");
const btnInicioSesion = document.getElementById('inicioSesion');
const btnCrearCuenta = document.getElementById('crearCuenta');


export function registrarUsuarios(){

    btnCrearCuenta.addEventListener('click', () =>{
        nombre = Input.value;
        contrasena = Input.value;
        correo = Input.value
    })
}

export function iniciarSesion(){

}

export function cerrarSesion(){

}

export function usuarioActual(){

}

