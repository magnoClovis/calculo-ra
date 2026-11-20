function iniciarTituloOla() {
  const h1 = document.getElementById("titulo");
  const texto = h1.textContent;
  h1.textContent = "";

  for (let i = 0; i < texto.length; i++) {
    const letra = document.createElement("span");
    letra.setAttribute("aria-hidden", "true");
    letra.textContent = texto[i] === " " ? " " : texto[i];
    letra.style.animationDelay = i * 0.09 + "s";
    h1.appendChild(letra);
  }
}

const glifos = ["✦", "✧", "★", "✨", "♥", "❖"];
const colores = ["#ff4fc3", "#ffe14a", "#9b5cff", "#1b9bff", "#ffffff", "#3fae29"];

function alAzar(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function iniciarChispas() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let ultima = 0;
  window.addEventListener("pointermove", function (e) {
    const ahora = Date.now();
    if (ahora - ultima < 45) return; // si no, salen demasiadas
    ultima = ahora;

    const chispa = document.createElement("span");
    chispa.className = "chispa";
    chispa.textContent = alAzar(glifos);
    chispa.style.color = alAzar(colores);
    chispa.style.left = e.clientX - 8 + "px";
    chispa.style.top = e.clientY - 8 + "px";
    document.body.appendChild(chispa);
    setTimeout(function () { chispa.remove(); }, 950);
  });
}
