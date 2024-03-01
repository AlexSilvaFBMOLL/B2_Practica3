function visionar(elemento) {
  // Crear DIV con clase visor
  let div = document.createElement("div") // Crear div
  div.classList.add("visor") // Asignarle clase visor
  // Crear SPAN con clase cerrar y contenido "⨯" (un símbolo ASCII de una cruz) y añadirlo al div
  let span = document.createElement("span") // Crear span
  span.classList.add("cerrar") // Asignarle clase cerrar
  span.innerText = "⨯" // Ponerle como texto el símbolo de una cruz
  span.setAttribute("onclick","cerrar()") // Cuando se pulse, se llama a la función cerrar()
  div.appendChild(span) // Añadirlo al div
  // Crear IMG con clase imagen-visor y src la imagen HD del elemento clickeado y añadirla al div
  // Si no existe la imagen en alta resolución se mostrará la que haya en la página web -- Mediante el atributo onerror
  let img = document.createElement("img") // Crear img
  img.classList.add("imagen-visor") // Asignarle clase imagen-visor
  img.src = elemento.src.replace(".png","-full.png") // Asignarle src la de la imagen HD que se ha pulsado
  img.setAttribute("onerror", `this.src = "${elemento.src}"`) // Asignarle un fallback por si no hay imagen HD -- hace que se cargue la propia imagen pulsada
  div.appendChild(img) // Añadirla al div
  // Añadir el DIV y sus elementos dentro del section con las imágenes
  elemento.parentElement.appendChild(div)
}

// Elimina el primer objeto con clase visor. Al solo poder haber uno abierto al mismo tiempo, elimina este.
function cerrar() {
  document.getElementsByClassName("visor")[0].remove()
}