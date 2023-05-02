//Agregar una accion (EventListener) para el evento "DOMContentLoaded" y hasta que este cargado todo el documento entonces se ejecuta este evento.
//Seleccionar los elementos de la interfaz con query selector. Email, asunto y mensaje
document.addEventListener("DOMContentLoaded", () => {
  const campos = { email: "", cc: "", asunto: "", mensaje: "" };

  const emailInput = document.querySelector("#email");
  const asuntoInput = document.querySelector("#asunto");
  const mensajeInput = document.querySelector("#mensaje");
  const conCopia = document.querySelector("#cc");
  const inputEnviar = document.querySelector("#formulario button[type=submit]");
  const formulario = document.querySelector("#formulario");
  const btnReiniciar = document.querySelector("#formulario button[type=reset]");
  const spinner = document.querySelector("#spinner"); //Agregar eventlistener para cada querySelector que se registre un evento que ayude a validar el formulario:
  //blur: si el usuario no agrego correctamente la informacion,
  //al cambiar de input al siguiente se dispara este evento

  emailInput.addEventListener("input", validarInputs);
  asuntoInput.addEventListener("input", validarInputs);
  mensajeInput.addEventListener("input", validarInputs);
  conCopia.addEventListener("input", validarCC);

  formulario.addEventListener("submit", enviarEmail);

  btnReiniciar.addEventListener("click", (e) => {
    if (e) {
      e.preventDefault();
    }
    //Limpias los campos para reiniciar los valores del array de campos
    reiniciarObjeto();
    //PAra que se deshabilite el boton de email hay que volver llamar la funcion
    comporbarEmail();
    validarCC();
  });

  function validarCC(e) {
    if (e.target.id === "cc" && !validarEmail(e.target.value)) {
      mostrarAlerta(e.target.parentElement, "Email Erroneo");
      return;
    }
    eliminarAlerta(e.target.parentElement);
    //E.target.name tiene que coincidir con el nombre del objeto para que sea igual el name de campos(del objeto)al target del valor.
    campos[e.target.name] = e.target.value.trim().toLowerCase();
    //console.log(campos);
    comporbarEmail();
  }

  function enviarEmail(e) {
    e.preventDefault();
    spinner.classList.add("flex");
    spinner.classList.remove("hidden");
    setTimeout(() => {
      spinner.classList.add("hidden");
      spinner.classList.remove("flex");
      reiniciarObjeto();

      const envioCorrecto = document.createElement("P");
      envioCorrecto.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      envioCorrecto.textContent = "ENVIO DE CORREO EXITOSO";
      formulario.appendChild(envioCorrecto);

      setTimeout(() => {
        envioCorrecto.classList.add("hidden");
      }, 2000);
    }, 1000);
  }

  //HAcer una funcion reutilizable para los tres campos de los listeners
  function validarInputs(e) {
    //validar si el campo esta vacio con un if
    if (e.target.value.trim() === "") {
      mostrarAlerta(
        e.target.parentElement,
        `Error al ingresar el campo ${e.target.id}`
      );
      campos[e.target.name] = "";
      comporbarEmail();

      return;
    }
    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta(e.target.parentElement, "Email Erroneo");
      campos[e.target.name] = "";
      comporbarEmail();
      return;
    }
    eliminarAlerta(e.target.parentElement);
    //E.target.name tiene que coincidir con el nombre del objeto para que sea igual el name de campos(del objeto)al target del valor.
    campos[e.target.name] = e.target.value.trim().toLowerCase();
    //console.log(campos);

    comporbarEmail();
  }

  //Hacer una funcion para mostrar un Alerta en caso que no se haya ingresado input valido
  function mostrarAlerta(referencia, mensaje) {
    eliminarAlerta(referencia);
    //Generar alert con HTML: createElement etiqueta HTML (P). Agregar un textContent que diga "Hubo error"
    const error = document.createElement("P");
    error.textContent = mensaje;
    //Hacer el selector de formulario
    //Inyectar el error al formulario con appendChuld (Agrega nuevo elemento al ya existente)
    //agregar clase al error (bg-red-600 text-white, p-2, texxt-center)
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");
    referencia.appendChild(error);
  }

  function eliminarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    console.log(resultado);
    return resultado;
  }

  function comporbarEmail() {
    //El metodo Object.values() retorna un array del valor de los objetos.
    //Con includes se esta verificando que todos los campos estan llenos, ya que si contiene un espacio vacio retorna true,
    //en este caso usaremos false para activar el boton de enviar
    //Usar If para comprobar los valores
    if (Object.values(campos).includes("")) {
      console.log(campos);
      inputEnviar.classList.add("opacity-50");
      inputEnviar.disabled = true;
      return;
    }
    inputEnviar.classList.remove("opacity-50");
    inputEnviar.disabled = false;
  }

  function reiniciarObjeto() {
    campos.email = "";
    campos.asunto = "";
    campos.mensaje = "";
    campos.cc = "";
    formulario.reset();
  }
});
