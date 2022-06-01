const gameAlert = (param) => {
  let title;
  let text;
  let icon;

  if (param === 1) {
    title = "¡Ganaste, felicidades!";
    text = "Que craaaa.";
    icon = "success";
  } else if (param === 2) {
    title = "¡Perdiste!";
    text = "Mejor suerte la próxima.";
    icon = "error";
  }

  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: "OK",
    background: "rgb(224, 246, 255)",
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
    text = "Caracteres invalidos.";
  }
  Swal.fire({
    title: "Invalido",
    text: text,
    icon: "error",
    confirmButtonText: "OK",
    background: "rgb(224, 246, 255)",
  });
};
