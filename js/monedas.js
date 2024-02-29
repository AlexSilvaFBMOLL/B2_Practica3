function showValorar(elemento) {
  let valorarButton = elemento.lastElementChild
  valorarButton.style.display = "inline-block"
}

function hideValorar(elemento) {
  let valorarButton = elemento.lastElementChild
  valorarButton.style.display = "none"
}

function valorar(elemento, valorInherito) {
  let valor
  if (!valorInherito) {
    valor = elemento.previousElementSibling.value
  } else {
    valor = valorInherito
  }
  let valorFlag = valor
  let noFlag = 10 - valor
  let div = elemento.parentElement.parentElement
  let article = elemento.parentElement.parentElement.parentElement.parentElement
  if (valor >= 0 && valor <= 10) {
    if (valor % 2 != 0) {
      div.innerHTML = ""
      while (valorFlag > 1) {
        div.innerHTML += `<img src="media/svg/Star.svg" alt="★">`
        valorFlag = valorFlag - 2
      }
      div.innerHTML += `<img src="media/svg/HalfStar.svg" alt="★">`
      while (noFlag > 1) {
        div.innerHTML += `<img src="media/svg/NoStar.svg" alt="★">`
        noFlag = noFlag - 2
      }
      div.innerHTML += `<div class="valorar">
                          <input type="text" inputmode="numeric" onkeydown="return /[0-9]|Arrow|Backspace|Delete/.test(event.key)">
                          <button onclick="valorar(this)">Valorar</button>
                        </div>`
    } else {
      div.innerHTML = ""
      while (valorFlag > 0) {
        div.innerHTML += `<img src="media/svg/Star.svg" alt="★">`
        valorFlag = valorFlag - 2
      }
      while (noFlag > 1) {
        div.innerHTML += `<img src="media/svg/NoStar.svg" alt="★">`
        noFlag = noFlag - 2
      }
      div.innerHTML += `<div class="valorar">
                          <input type="text" inputmode="numeric" onkeydown="return /[0-9]|Arrow|Backspace|Delete/.test(event.key)">
                          <button onclick="valorar(this)">Valorar</button>
                        </div>`
    }
    localStorage.setItem(article.id, valor)
    
  } else {
    elemento.previousElementSibling.style.backgroundColor = "#F68E84"
  }
}

let estrellas = document.getElementsByClassName("valorar")
let valorados = document.getElementsByTagName("article")
for (let i=0; i < estrellas.length; i++) {
  valorar(estrellas[i].lastElementChild,localStorage.getItem(valorados[i].id))
}