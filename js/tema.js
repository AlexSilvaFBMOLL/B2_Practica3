// Comprueba el tema preferido por el usuario
const TEMA_CLARO = window.matchMedia('(prefers-color-scheme: light)').matches

// Si no existe, crear la variable local tema y agregar el valor que el usuario prefiere por defecto
// Además, si existe la variable se aplica el tema correspondiente, significando que al recargar la página se mantiene el tema si se ha cambiado
let tema = localStorage.getItem('tema')
if ((TEMA_CLARO && !tema) || tema == 'claro') {
  localStorage.setItem('tema', 'claro');
  document.documentElement.setAttribute('tema', 'claro');
} else if ((!TEMA_CLARO && !tema) || tema == 'oscuro') {
  localStorage.setItem('tema', 'oscuro');
  document.documentElement.setAttribute('tema', 'oscuro');
}

// Cambia el tema al llamarse la función.
function cambiarTema() {
  let tema = localStorage.getItem('tema')
  if (tema == 'claro') {
    localStorage.setItem('tema', 'oscuro');
    document.documentElement.setAttribute('tema', 'oscuro');
  } else {
    localStorage.setItem('tema', 'claro');
    document.documentElement.setAttribute('tema', 'claro');
  }
}