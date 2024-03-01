// Función que muestra y oculta secciones de comentarios. Oculta el formulario de comentar y todos los comentarios
function comments(element) { // El elemento es el botón de mostrar/ocultar
  let seccion = element.parentElement // El padre del botón de mostrar/ocultar: el elemento section
  let hijos = seccion.children // Todos los hijos de la section
  for(i=1; i < hijos.length; i++) { // Empieza en 1, para no ocultar el botón de mostrar/ocultar, y recorre todos los elementos hijos del section
    let hijo = hijos[i] // declara el elemento hijo
    if (!hijo.style.visibility || hijo.style.visibility == "collapse") { // Si no tiene el estilo visibility o está oulto, lo muestra
      hijo.style.visibility = "visible"
    } else { // Sino, si está visible, lo oculta
      hijo.style.visibility = "collapse"
    }
  }
}

// Función que valida los comentarios a enviar. Una vez validados se añaden en su sección correspondiente
function comentar(id) { // Se pasa como parámetro la id del formulario desde el que se ha realizado la petición
  let form = document.getElementById(id) // Se declara el elemento formulario con esta ID
  let user = form.children[0] // El primer hijo del formulario es el nombre de usuario introducido, el segundo es su small de errores
  let comment = form.children[2] // El tercero es el comentario introducido y el cuarto su small de errores
  let flag = true // Una variable de control
  if (!/^([\wÀ-ÖØ-öø-ÿªº\.\-]\s{0,1})+$/.test(user.value)) { // Acepta caracteres alfanuméricos, puntos y guiones en el nombre. Separados por un espacio.
    user.classList.add("invalid") // Se añade la clase invalido si no cumple con la expresión regular
    flag = false // Se pone en falso la variable de control
    if(user.value == '' || user.value == null) { // Si se ha dejado en blanco
      user.nextElementSibling.textContent = "No puedes dejar este campo en blanco." // El hermano siguiente del usuario es el small
    } else if(/  /.test(user.value)) { // Si se han usado dos espacios juntos se pone un mensaje
      user.nextElementSibling.textContent = "Solo puedes usar caracteres alfanuméricos con un espacio entre palabras."
    } else { // Sino se pone otro
      user.nextElementSibling.textContent = "Solo puedes usar caracteres alfanuméricos."
    }
  } else { // Si cumple con el regex, se quita la clase invalid (si tuviera) y se vacía el small de errores
    user.classList.remove("invalid") // Remover la clase invalid del input de usuario
    user.nextElementSibling.textContent = "" // Vaciar el hermano del input: el small de errores
  }
  if (!/^([\wÀ-ÖØ-öø-ÿªº\.\,!?¡¿\n@\+:;\-]\s{0,1})+$/.test(comment.value)) { // Parecido al nombre de usuario, pero permite más caracteres
    comment.classList.add("invalid") 
    flag = false
    if(comment.value == '' || comment.value == null) {
      comment.nextElementSibling.textContent = "No puedes dejar este campo en blanco."
    } else if(/  /.test(comment.value)) { // Si se han usado dos espacios juntos se pone un mensaje
      comment.nextElementSibling.textContent = "Solo puedes usar caracteres alfanuméricos con un espacio entre palabras."
    } else { // Sino se pone otro
      comment.nextElementSibling.textContent = "Solo puedes usar caracteres alfanuméricos."
    }
  } else {
    comment.classList.remove("invalid")
    comment.nextElementSibling.textContent = ""
  }
  // Si la variable de control es falsa, se termina aquí el programa, sino se continúa con la publicación del comentario
  if (flag == true) {// Si no se ha producido ningún error de validación se oculta el botón de envío y se deshabilitan los campos del formulario, además de resetear los valores de éste y mostrar un mensaje informando de que se ha enviado correctamente
    if(confirm("¿Estás seguro de comentar esto?")) { // Confirmar si se desea enviar el formulario
      // DIV: contenedor del comentario y del nombre de usuario
      let div = document.createElement("div") // Se crea un div
      div.classList.add("comentario") // Se le añade la clase comentario
      div.style.visibility = "visible" // Se hace visible, pues al haber hecho el comentario el bloque de comentarios está visible sí o sí
      // H4: nombre de usuario
      let h4 = document.createElement("h4") // Se crea un encabezado de nivel 4
      h4.textContent = user.value.trim() // Se pone el nombre de usuario quitando los espacios al principio y al final
      div.appendChild(h4) // Se añade al div
      // SPAN: comentario
      let span = document.createElement("span") // Se crea el span
      span.textContent = `${comment.value.trim()}` // Se añade el comentario quitando los espacios del principio y del final, además de ponerlo en una string, para que no nos inserten código (aunque el programa no acepta "<" ni ">")
      div.appendChild(span) // Se añade al div
      form.parentElement.appendChild(div) // Se añade todo esto al padre del formulario: la section de comentarios. Se añade al final, por lo que los comentarios serán en orden de escritura siendo el más reciente el último

      // GUARDAR EL COMENTARIO AL REINICIAR
      let commentId = 0 // variable de control del número de comentarios que hay
      do {
        if (!localStorage.getItem(`${id}-${commentId}`)) { // Si no existe un comentario con ese ID, se crea y se termina el bucle
          localStorage.setItem(`${id}-${commentId}`,`{"user":"${user.value.trim()}", "comment":"${comment.value.trim()}"}`) // Se crea el localStorage que tiene de nombre el id que se ha pasado como parámetro a la función (el id del formulario) y seguido de un guión el número de comentario. Como contenido se le pasa una string simulando un objeto, para luego convertirlo en este. Este "objeto" tiene como atributos el nombre de usuario y el comentario debidamente arreglados.
          break // Se rompe el bucle
        } else { // Si se encuentra un comentario con ese ID, se añade 1 a la variable de comentarios y se continua con el bucle
          commentId++ 
          continue
        } 
      } while (true); // While true, para cerrar el bucle desde dentro con el break.

      form.reset() // Borrar los valores de los campos
      resize(comment) // Para actualizar el tamaño del textarea
    }
  }
}

// Función para cambiar el tamaño del textarea que contiene el comentario.
function resize(textArea) { // Se pasa como parámetro el textarea
  textArea.rows = 1 // Se le asigna el tamaño de 1 fila por si falla la siguiente línea
  textArea.rows = (textArea.scrollHeight / 17) // Se asigna la fila dividiendo el tamaño de scrollarea por el tamaño de la fuente
}

// EJECUTAR CADA VEZ QUE SE ABRE LA PÁGINA
// Para generar los comentarios guardados previamente por el usuario
let cajasComentarios = document.getElementsByClassName("comentar-form") // Se obtiene un array con todos los formularios de comentarios, para trabajar con su ID
for (let i = 0; i < cajasComentarios.length; i++) { // Por cada caja de comentarios se realiza lo siguiente:
  let form = cajasComentarios[i] // Primero se declara cuál es el formulario con el que trabajaremos
  let commentId = 0 // Variable de control para saber la cantidad de comentarios que hay
  do {
    let possibleStoredComment = localStorage.getItem(`${form.id}-${commentId}`) // Se obtiene como variable un posible comentario, si no existe ese item se asignará valor nulo, sino se obtendrá el "objeto" comentario
    if (possibleStoredComment) { // Si existe, se crea el comentario en sí
      let storedComment = JSON.parse(possibleStoredComment) // Se convierte el "objeto" en un objeto como tal, gracias a JSON
      let user = storedComment.user // Se obtiene el nombre de usuario
      let comment = storedComment.comment // Se obtiene el comentario
      // A partir de aquí se repite lo de la función que crea los comentarios, no se pone en una función aparte para que nadie pueda llamarla al editar el documento HTML
      let div = document.createElement("div")
      div.classList.add("comentario")
      let h4 = document.createElement("h4")
      h4.textContent = user
      div.appendChild(h4)
      let span = document.createElement("span")
      span.textContent = comment
      div.appendChild(span)
      form.parentElement.appendChild(div)
      // Una vez generado el elemento de comentario se añade al formulario y se pasa al siguiente posible comentario
      commentId++
      continue
    } else { // Si el posible comentario no existe, se cierra el bucle
      break
    }
  } while (true);
}