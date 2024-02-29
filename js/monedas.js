// Muestra el último hijo del elemento que se pase como parámetro
// Este elemento que se pasa por parámetro es el contenedor de las estrellas
function showValorar(elemento) {
  let valorarButton = elemento.lastElementChild
  valorarButton.style.display = "inline-block"
}
// Ocultar el elemento anteriormente descrito
function hideValorar(elemento) {
  let valorarButton = elemento.lastElementChild
  valorarButton.style.display = "none"
}

// La función que genera las estrellas de valoración de cada elemento numismático
// Tiene como parámetros un elemento, el botón de valorar, y un valor, la puntuación que queremos asignar
function valorar(elemento, valor) {
  let valorFlag = valor // Una copia del valor, para asignar las estrellas
  let noFlag = 10 - valor // Para asignar las estrellas vacías
  let div = elemento.parentElement.parentElement // El padre del padre del botón, es decir, el div que contiene las estrellas
  let article = elemento.parentElement.parentElement.parentElement.parentElement // El padre del padre del padre del padre del botón, es decir, el artículo que contiene el ID de la moneda a valorar
  if (valor >= 0 && valor <= 10) { // Si el valor está entre 0 y 10 se ejecuta la función. Si es null, el código lo considera igual a 0
    div.innerHTML = ""
    if (valor % 2 != 0) { // Si el valor es impar, se genera una media estrella
      while (valorFlag > 1) { // Al ser impar, el valor más bajo será 1
        div.innerHTML += `<img src="media/svg/Star.svg" alt="★">` // Se generan estrellas enteras
        valorFlag = valorFlag - 2 // Se resta 2 al valor, pues cada estrella está compuesta de 2 medias partes
      }
      div.innerHTML += `<img src="media/svg/HalfStar.svg" alt="★">` // Se genera una media estrella
    } else {
      while (valorFlag > 0) { // Al ser par, el valor más bajo será 0
        div.innerHTML += `<img src="media/svg/Star.svg" alt="★">`
        valorFlag = valorFlag - 2
        // No se genera la media estrella
      }
    }
    while (noFlag > 1) { // Las estrellas restantes, independientemente de si es par o inpar el valor se compara con 1
      div.innerHTML += `<img src="media/svg/NoStar.svg" alt="★">` // Se genera la estrella vacía
      noFlag = noFlag - 2 // Se resta 2 al valor
    }
    // Una vez generadas las estrellas, se añade debajo el mismo div con el botón de valorar, para poder re-valorar en cualquier momento.
    div.innerHTML += `<div class="valorar">
                          <input type="text" placeholder="Valoración del 0 al 10" inputmode="numeric" onkeydown="return /[0-9]|Arrow|Backspace|Delete/.test(event.key)">
                          <button onclick="confirmarValoracion(this)">Valorar</button>
                        </div>`
    // Se guarda en localStorage un item que tiene de nombre el id del artículo y como valor las estrellas que tiene, para que cada vez que se cargue el documento se asignen de nuevo.
    localStorage.setItem(article.id, valor)
    
  } else { // Sino está el valor entre 0 y 10, se pone de color rojo el input
    elemento.previousElementSibling.style.backgroundColor = "#F68E84"
  }
}

// Esta función es la que se llamará cuando el usuario desee valorar. Muestra un mensaje de confirmación antes de activar la petición a la función de valorar.
function confirmarValoracion(elemento) {
  let valor = elemento.previousElementSibling.value
  if (confirm(`¿Desea enviar esta valoración de ${valor} estrellas?`)) {
    valorar(elemento, valor)
  }
}

// Cada vez que se carga el script, se genera un array con los contenedores de las estrellas y otro con los artículos que hay.
let estrellas = document.getElementsByClassName("valorar")
let valorados = document.getElementsByTagName("article")
// Para cada contenedor de estrellas que haya, se realiza lo siguiente:
// Se pasa como parámetro a la función de valorar el último hijo del contenedor de valorar, es decir, el botón. Esto tiene el mismo efecto que haber pulsado el botón y pasarse a sí mismo como parámetro.
// Además, se pasa un valor inhérito, el valor del item guardado al ser ejecutada la función por el usuario.
for (let i=0; i < estrellas.length; i++) {
  valorar(estrellas[i].lastElementChild,localStorage.getItem(valorados[i].id)) // Llama directamente a la función de valorar, saltándose la confirmación.
}
// NOTA: Al cargarse la página se generan las estrellas siempre, por lo que en el HTML son elementos que no existen hasta que no se carge.
// NOTA: Al cargarse por primera vez una página, ningún valor estará guardado en localStorage, por lo que no se pasa como parámetro, significando que la función cogerá el valor 0, haciendo que todas las estrellas estén vacías.