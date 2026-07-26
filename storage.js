export function guardarUsuarios(usuarios){
localStorage.setItem(
    'usuarios',
    JSON.stringify(usuarios)
    
);
}

export function cargarUsuarios(){
 const usuarios = JSON.parse(localStorage.getItem('usuarios'))||[];
console.log(usuarios)
 return usuarios;
}

export function guardarSesion(usuario){

    localStorage.setItem('usuarioActivo', JSON.stringify(usuario))
    
console.log('us guardado')
}

export function cargarSesion(){

    const usuario = JSON.parse(
        localStorage.getItem("usuarioActivo")
    );
console.log('us cargado')
    return usuario;
}