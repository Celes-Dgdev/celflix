import { cargarUsuarios, guardarUsuarios, cargarSesion, guardarSesion} from "./storage.js";

const correo = document.getElementById('correo');
const contrasena = document.getElementById("contrasena");
const nombre = document.getElementById("nombre");
const btnInicioSesion = document.getElementById('inicioSesion');
const btnCrearCuenta = document.getElementById('crearCuenta');


export function registrarUsuarios(){
btnCrearCuenta.addEventListener("click", () => {


    const nombreUsuario = nombre.value;
    const correoUsuario = correo.value;
    const contrasenaUsuario = contrasena.value;

    

    const usuarios = cargarUsuarios();


    usuarios.push({
        nombre: nombreUsuario,
        correo: correoUsuario,
contrasena: contrasenaUsuario
    });


    guardarUsuarios(usuarios);


    nombre.value = "";
    correo.value = "";
    contrasena.value = "";

    alert("Usuario registrado correctamente");
});
}
// imiciar secion
export function iniciarSesion(mostrarApp) {

    btnInicioSesion.addEventListener("click", () => {

        const correoUsuario = correo.value;
const contrasenaUsuario = contrasena.value;


const usuarios = cargarUsuarios();


const usuario = usuarios.find(usuario => (usuario.correo === correoUsuario));

//validamos si existe usuario en caso que no no se rompe 
if(!usuario){
    //si ni existe entones regesa
     alert("Contraseña incorrecta");
    return;
}
 //una vs comprivado que existe podemos comparar

if( usuario.contrasena !== contrasenaUsuario ){
    alert ('contrasena no  valida ');
    return;
}
guardarSesion(usuario);

alert(" Hola, soy Celes, este es mi proyecto... bienbenido y disfrutalo!!");

mostrarApp(usuario)
    });

}
