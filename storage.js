export function guardarUsuarios(usuarios){
localStorage.setItem(
    'usuarios',
    JSON.stringify(usuarios)
);
}

export function cargarUsuarios(){
 const usuarios = JSON.parse(localStorage.getItem('usuarios'))||[];

 return usuarios;
}

