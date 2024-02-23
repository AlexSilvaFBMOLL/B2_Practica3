function validar() {
  // Declaración de variables
  let formulario = document.getElementById("contacto")
  let nombre = document.getElementById("nombre")
  let nombreError = document.getElementById("nombreError")
  let email = document.getElementById("email")
  let emailError = document.getElementById("emailError")
  let mensaje = document.getElementById("mensaje")
  let mensajeError = document.getElementById("mensajeError")
  let flag = true
  // Comprobación nombre: Caracteres alfabéticos separados por 0 o 1 espacio
  if (!/^([a-zA-ZÀ-ÖØ-öø-ÿªº]\s{0,1})+$/.test(nombre.value)) {
    nombre.className = "invalid"
    flag = false
    nombreError.innerHTML = "El nombre es inválido"
  } else {
    nombre.className = ""
    nombreError.innerHTML = ""
  }
  // Comprobación email: forma típica de un email
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    email.className = "invalid"
    flag = false
    emailError.innerHTML = "Revise el correo electrónico"
  } else {
    email.className = ""
    emailError.innerHTML = ""
  }
  // Comprobación mensaje: Caracteres alfanuméricos, puntos y guiones. Separados por 0 o 1 espacio
  if (!/^([A-Za-zÀ-ÖØ-öø-ÿªº0-9\.-]\s{0,1})+$/.test(mensaje.value)) {
    mensaje.className = "invalid"
    flag = false
    mensajeError.innerHTML = "El contenido del mensaje es inválido"
  } else {
    mensaje.className = ""
    mensajeError.innerHTML = ""
  }

  if (flag == true) {
    formulario.submit()
  }
}