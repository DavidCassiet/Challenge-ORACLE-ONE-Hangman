const customAlert = (param) => {
  let title, html, text, icon, iconColor, color, padding, background;

  if (param === 1) {
    html =
      '<h1 class="win-title">¡Ganaste, Felicidades!<h1> <p class="alert-text">Tremendo IQ.</p>';
    color = "black";
    padding = "30px 0";
    background = "rgb(234, 255, 229)";
  } else if (param === 2) {
    html = `
    <h1 class="lose-title">¡Fin del juego!<h1> 
    <p class="alert-text">La palabra era: <b>${word}</b></p>
    `;
    color = "black";
    padding = "30px 0";
    background = "rgb(255, 227, 227)";
  } else {
    if (param === 3) {
      text = "Solo palabras entre 4 y 16 letras.";
    } else if (param === 4) {
      text = "La palabra ya se encuentra en juego.";
    } else if (param === 5) {
      text = "Solo se puede ingresar una palabra.";
    } else if (param === 6) {
      text = "Caracteres inválidos.";
    }
    html = `
    <h1 class="lose-title">Inválido<h1> 
    <p class="alert-text">${text}</p>
    `;
    icon = "error";
    iconColor = "rgb(190, 0, 0)";
    color = "white";
    background = "rgb(182, 157, 255)";
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
    buttonsStyling: false,
    customClass: {
      confirmButton: "alert-button",
    },
  });
};
