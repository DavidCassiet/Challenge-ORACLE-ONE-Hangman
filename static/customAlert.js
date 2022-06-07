const customAlert = (param) => {
  let title, html, text, icon, iconColor, color, padding, background;

  if (param === 1) {
    html =
      '<h1 class="win-title">¡Ganaste, Felicidades!<h1> <p class="alert-text">Tremendo IQ.</p>';
    color = "black";
    padding = "40px 0";
    background = "rgb(225, 255, 215)";
  } else if (param === 2) {
    html = `
    <h1 class="lose-title">¡Fin del juego!<h1> 
    <p class="alert-text">La palabra era: <b>${word}</b></p>
    `;
    color = "black";
    padding = "40px 0";
    background = "rgb(255, 215, 215)";
  } else {
    if (param === 3) {
      text = "Solo se permiten palabras entre 4 y 16 letras.";
    } else if (param === 4) {
      text = "La palabra ya se encuentra en juego.";
    } else if (param === 5) {
      text = "Solo se puede ingresar una palabra.";
    } else if (param === 6) {
      text = "Caracteres inválidos.";
    }
    title = "Inválido";
    icon = "error";
    iconColor = "rgb(160, 0, 0)";
    color = "white";
    background = "rgb(172, 109, 206)";
  }

  Swal.fire({
    title: title,
    html: html,
    text: text,
    icon: icon,
    iconColor: iconColor,
    confirmButtonText: "OK",
    background: background,
    color: color,
    padding: padding,
  });
};
