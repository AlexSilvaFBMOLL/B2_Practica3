// Función de validación de formulario
function validar() {
  // Declaración de variables
  let formulario = document.getElementById("contacto")
  let nombre = document.getElementById("nombre")
  let nombreError = document.getElementById("nombreError")
  let email = document.getElementById("email")
  let emailError = document.getElementById("emailError")
  let mensaje = document.getElementById("mensaje")
  let mensajeError = document.getElementById("mensajeError")
  let botonEnviar = document.getElementById("enviar")
  let mensajeEnviado = document.getElementById("mensajeEnviado")
  let flag = true
  // Comprobación nombre: Caracteres alfabéticos separados por 0 o 1 espacio
  if (!/^([a-zA-ZÀ-ÖØ-öø-ÿªº\-]\s{0,1})+$/.test(nombre.value)) {
    nombre.className = "invalid"
    flag = false
    if(/  /.test(nombre.value)) { // Si se han usado dos espacios juntos se pone un mensaje
      nombreError.innerHTML = "Solo puedes usar caracteres alfabéticos con un espacio entre palabras."
    } else { // Sino se pone otro
      nombreError.innerHTML = "Solo puedes usar caracteres alfabéticos."
    }
  } else { // Si cumple con la validación se elimina la clase de error, si hay, y se oculta el texto de error
    nombre.className = ""
    nombreError.innerHTML = ""
  }
  // Comprobación email: forma típica de un email
  if (!/^[\.\w\-]+@([\w\-]+\.)+[\w\-]{2,4}$/.test(email.value)) {
    email.className = "invalid"
    flag = false
    emailError.innerHTML = "El formato del correo electrónico no es correcto."
  } else { // Si cumple con la validación se elimina la clase de error, si hay, y se oculta el texto de error
    email.className = ""
    emailError.innerHTML = ""
  }
  // Comprobación mensaje: Caracteres alfanuméricos y algunos utilizados normalmente, limitando cuáles se pueden usar.
  // Al no hacer nada con el contenido del formulario, se podría omitir esta comprobación.
  if (!/^([\wÀ-ÖØ-öø-ÿªº\.\,!?¡¿\n@\-\+:;]\s{0,1})+$/.test(mensaje.value)) {
    mensaje.className = "invalid"
    flag = false
    if(/  /.test(mensaje.value)) { // Si se han usado dos espacios juntos se pone un mensaje
      mensajeError.innerHTML = "Solo puedes usar un espacio entre palabras."
    } else { // Sino se pone otro
      mensajeError.innerHTML = "Hay caracteres no válidos en el mensaje."
    }
  } else { // Si cumple con la validación se elimina la clase de error, si hay, y se oculta el texto de error
    mensaje.className = ""
    mensajeError.innerHTML = ""
  }

  if (flag == true) {// Si no se ha producido ningún error de validación se oculta el botón de envío y se deshabilitan los campos del formulario, además de resetear los valores de éste y mostrar un mensaje informando de que se ha enviado correctamente
    mensajeEnviado.innerHTML = "Formulario enviado correctamente"
    botonEnviar.hidden = true
    formulario.reset()
    nombre.disabled = true
    email.disabled = true
    mensaje.disabled = true
  }
}

// Función para cambiar el tamaño del textarea que contiene el mensaje.
function resize() {
  textArea = document.getElementById("mensaje")
  textArea.rows = 2
  textArea.rows = (textArea.scrollHeight / 19)
}