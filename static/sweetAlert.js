const gameAlert = (param) => {
  let title, text, icon, iconColor;

  if (param === 1) {
    title = "¡Ganaste, felicidades!";
    text = "Tremendo IQ.";
    icon = "success";
  } else if (param === 2) {
    title = "¡Perdiste!";
    text = "Mejor suerte la próxima.";
    icon = "error";
    iconColor = "rgb(170, 21, 21)";
  }

  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    iconColor: iconColor,
    confirmButtonText: "OK",
    background: "rgb(172, 109, 206)",
    color: "white",
  });
};

const errorAlert = (param) => {
  let text;
  if (param === 1) {
    text = "Solo se permiten palabras entre 4 y 16 letras.";
  } else if (param === 2) {
    text = "La palabra ya se encuentra en el juego.";
  } else if (param === 3) {
    text = "Solo se puede ingresar una palabra.";
  } else if (param === 4) {
    text = "Caracteres inválidos.";
  }
  Swal.fire({
    title: "Inválido",
    text: text,
    icon: "warning",
    iconColor: "rgb(255, 249, 129)",
    confirmButtonText: "OK",
    background: "rgb(172, 109, 206)",
    color: "white",
  });
};
