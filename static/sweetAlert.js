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
