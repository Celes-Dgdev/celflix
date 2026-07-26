import { cargarUsuarios, guardarUsuarios } from "./storage.js";

const correo = document.getElementById('correo');
const contrasena = document.getElementById("contrasena");
const nombre = document.getElementById("nombre");
const btnInicioSesion = document.getElementById('inicioSesion');
const btnCrearCuenta = document.getElementById('crearCuenta');


export function registrarUsuarios(){
btnCrearCuenta.addEventListener("click", () => {

    console.log("1. Entré al click");

    const nombreUsuario = nombre.value;
    const correoUsuario = correo.value;
    const contrasenaUsuario = contrasena.value;

    console.log("2. Leí los inputs");

    const usuarios = cargarUsuarios();

    console.log("3. Cargué usuarios", usuarios);

    usuarios.push({
        nombre: nombreUsuario,
        correo: correoUsuario,
        password: contrasenaUsuario
    });

    console.log("4. Hice push", usuarios);

    guardarUsuarios(usuarios);

    console.log("5. Guardé usuarios");

    nombre.value = "";
    correo.value = "";
    contrasena.value = "";

    alert("Usuario registrado correctamente");
});
}
