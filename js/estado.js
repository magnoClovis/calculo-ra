const MAX_TRABAJOS = 15;
const INICIALES = 3;

const filas = [];

function obtenerFilas() {
  return filas;
}

function fijarNumero(n) {
  if (n < 1) n = 1;
  if (n > MAX_TRABAJOS) n = MAX_TRABAJOS;
  while (filas.length < n) filas.push({ nombre: "", w: "", g: "" });
  while (filas.length > n) filas.pop();
}

function actualizarCampo(i, campo, valor) {
  filas[i][campo] = valor;
}

function repartirPesos() {
  const n = filas.length;
  const base = Math.floor(10000 / n) / 100;
  let suma = 0;
  for (let i = 0; i < n; i++) {
    let peso = base;
    if (i === n - 1) peso = Math.round((100 - suma) * 100) / 100; // la ultima se lleva lo que sobra
    suma += peso;
    filas[i].w = String(peso).replace(".", ",");
  }
}

function reiniciar() {
  filas.length = 0;
  fijarNumero(INICIALES);
}
