const youWon = () => {
  Swal.fire({
    title: "¡Ganaste, felicidades!",
    text: "Que craaaa.",
    icon: "success",
    confirmButtonText: "OK",
    background: "rgb(224, 246, 255)",
  });
};

const youLost = () => {
  Swal.fire({
    title: "¡Perdiste!",
    text: "Mejor suerte la próxima.",
    icon: "error",
    confirmButtonText: "OK",
    background: "rgb(224, 246, 255)",
  });
};

const invalid = () => {
  Swal.fire({
    title: "Invalido",
    text: "Solo se permiten palabras entre 4 y 16 caracteres.",
    icon: "error",
    confirmButtonText: "OK",
    background: "rgb(224, 246, 255)",
  });
};
