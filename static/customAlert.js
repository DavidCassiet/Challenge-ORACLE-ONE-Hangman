const customAlert = (param) => {
  let title,
    text,
    icon,
    iconColor,
    color,
    padding,
    background,
    className,
    timer,
    show = true;

  if (param === 1) {
    title = "¡Ganaste, Felicidades!";
    text = "Tremendo IQ.";
    className = "green-title";
    color = "black";
    padding = "30px 0";
    background = "rgb(212, 251, 202)";
  } else if (param === 2) {
    title = "¡Fin del juego!";
    text = `La palabra era: <b>${word}</b>`;
    className = "red-title";
    color = "black";
    padding = "30px 0";
    background = "rgb(255, 227, 227)";
  } else {
    if (param === 3) {
      title = "Añadida correctamente";
      text = "";
      className = "green-title";
      icon = "success";
      iconColor = "rgb(0, 230, 0)";
      timer = 1500;
      show = false;
    } else {
      if (param === 4) {
        text = "Solo palabras entre 4 y 16 letras.";
      } else if (param === 5) {
        text = "La palabra ya se encuentra en juego.";
      } else if (param === 6) {
        text = "Solo se puede ingresar una palabra.";
      } else if (param === 7) {
        text = "Caracteres inválidos.";
      }
      title = "Inválido";
      className = "red-title";
      icon = "error";
      iconColor = "rgb(230, 0, 0)";
    }
    color = "white";
    background = "rgb(182, 157, 255)";
  }

  Swal.fire({
    html: `
      <h1 class=${className}>${title}<h1>
      <p class="alert-text">${text}</p>
    `,
    icon: icon,
    iconColor: iconColor,
    confirmButtonText: "OK",
    background: background,
    color: color,
    padding: padding,
    timer: timer,
    buttonsStyling: false,
    showConfirmButton: show,
    customClass: {
      confirmButton: "alert-button",
    },
  });
};
