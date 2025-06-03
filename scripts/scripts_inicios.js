document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const campos = {
    nombre: document.getElementById("nombre_completo"),
    rut: document.getElementById("rut"),
    fecha: document.getElementById("fecha_nacimiento"),
    cv: document.getElementById("cv"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    repetir: document.getElementById("repetir_password")
  };

  function mostrarError(input, msg) {
    input.classList.add("is-invalid");
    let e = input.parentElement.querySelector(".invalid-feedback");
    if (!e) {
      e = document.createElement("div");
      e.className = "invalid-feedback";
      input.parentElement.appendChild(e);
    }
    e.innerText = msg;
  }

  function limpiarError(input) {
    input.classList.remove("is-invalid");
    let e = input.parentElement.querySelector(".invalid-feedback");
    if (e) e.remove();
  }

  form.addEventListener("submit", function(e) {
    let valido = true;
    Object.values(campos).forEach(limpiarError);

    if (!campos.nombre.value.trim()) {
      mostrarError(campos.nombre, "El nombre es requerido.");
      valido = false;
    }
  
    if(!/^\d{7,8}-[\dkK]$/.test(campos.rut.value.trim())) {
      mostrarError(campos.rut, "RUT inválido. Ej: 12345678-9");
      valido = false;
    }
  
    if (campos.fecha.value && !/^\d{4}-\d{2}-\d{2}$/.test(campos.fecha.value)) {
      mostrarError(campos.fecha, "Fecha inválida.");
      valido = false;
    }
    if (campos.cv.value) {
      let ext = campos.cv.value.split('.').pop().toLowerCase();
      if (!["pdf", "docx"].includes(ext)) {
        mostrarError(campos.cv, "Solo PDF o DOCX.");
        valido = false;
      }
    }
    if(!/^[\w\.-]+@[\w\.-]+\.\w+$/.test(campos.email.value.trim())) {
      mostrarError(campos.email, "Email inválido.");
      valido = false;
    }
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,12}$/.test(campos.password.value)) {
      mostrarError(campos.password, "6-12, mayúscula, minúscula y número.");
      valido = false;
    }
    if(campos.password.value !== campos.repetir.value || !campos.repetir.value) {
      mostrarError(campos.repetir, "Las contraseñas no coinciden.");
      valido = false;
    }
    if(!valido) e.preventDefault();
    else alert("Formulario enviado correctamente.");
    
  });
});