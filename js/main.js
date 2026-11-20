function redibujar() {
  mostrarNumero(obtenerFilas().length);
  dibujarFilas();
  actualizar();
}

function cambiarNumero(n) {
  fijarNumero(n);
  redibujar();
}

document.getElementById("filas").addEventListener("input", function (e) {
  const i = e.target.dataset.i;
  if (i === undefined) return;
  actualizarCampo(Number(i), e.target.dataset.k, e.target.value);
  actualizar();
});

document.getElementById("mas").addEventListener("click", function () {
  cambiarNumero(obtenerFilas().length + 1);
});

document.getElementById("menos").addEventListener("click", function () {
  cambiarNumero(obtenerFilas().length - 1);
});

document.getElementById("num").addEventListener("change", function (e) {
  const n = parseInt(e.target.value, 10);
  if (isNaN(n)) {
    mostrarNumero(obtenerFilas().length);
    return;
  }
  cambiarNumero(n);
});

document.getElementById("repartir").addEventListener("click", function () {
  repartirPesos();
  redibujar();
});

document.getElementById("limpiar").addEventListener("click", function () {
  reiniciar();
  redibujar();
});

reiniciar();
redibujar();
iniciarTituloOla();
iniciarChispas();
