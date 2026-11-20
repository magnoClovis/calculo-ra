const contenedor = document.getElementById("filas");
const listaAvisos = document.getElementById("avisos");
const elNota = document.getElementById("nota");
const elCarga = document.getElementById("carga");
const elEtiqueta = document.getElementById("etq");
const elMensaje = document.getElementById("mensaje");
const elDetalles = document.getElementById("detalles");
const inputNum = document.getElementById("num");

function mostrarNumero(n) {
  inputNum.value = n;
}

function dibujarFilas() {
  contenedor.innerHTML = "";
  const filas = obtenerFilas();

  for (let i = 0; i < filas.length; i++) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "trabajo";
    tarjeta.innerHTML = `
      <h3>Trabajo ${i + 1}</h3>
      <div class="campos">
        <div>
          <label for="n${i}">Nombre (opcional)</label>
          <input type="text" id="n${i}" data-i="${i}" data-k="nombre" maxlength="40" autocomplete="off">
        </div>
        <div>
          <label for="w${i}">Peso en el RA (%)</label>
          <input type="text" id="w${i}" data-i="${i}" data-k="w" inputmode="decimal" placeholder="ej. 30" autocomplete="off">
        </div>
        <div>
          <label for="g${i}">Tu nota (0 a 10)</label>
          <input type="text" id="g${i}" data-i="${i}" data-k="g" inputmode="decimal" placeholder="ej. 7,5" autocomplete="off">
        </div>
      </div>`;
    contenedor.appendChild(tarjeta);

    // los valores van por .value y no dentro del html, asi no se cuela lo que escriba el alumno
    document.getElementById("n" + i).value = filas[i].nombre;
    document.getElementById("w" + i).value = filas[i].w;
    document.getElementById("g" + i).value = filas[i].g;
  }
}

function marcarErrores() {
  const filas = obtenerFilas();
  let pesoMalo = false;
  let notaMala = false;

  for (let i = 0; i < filas.length; i++) {
    const v = validarFila(filas[i]);
    document.getElementById("w" + i).classList.toggle("mal", v.malW);
    document.getElementById("g" + i).classList.toggle("mal", v.malG);
    if (v.malW) pesoMalo = true;
    if (v.malG) notaMala = true;
  }
  return { pesoMalo: pesoMalo, notaMala: notaMala };
}

function pintarAvisos(avisos) {
  listaAvisos.innerHTML = "";
  avisos.forEach(function (a) {
    const li = document.createElement("li");
    if (a.error) li.className = "error";
    li.textContent = "⚠️ " + a.texto;
    listaAvisos.appendChild(li);
  });
}

function detalle(etiqueta, valor) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const b = document.createElement("b");
  span.textContent = etiqueta;
  b.textContent = valor;
  li.appendChild(span);
  li.appendChild(b);
  elDetalles.appendChild(li);
}

function pintarVacio() {
  elNota.className = "nota quieta";
  elNota.textContent = "¡Rellena los huecos!";
  elCarga.style.width = "0";
  elEtiqueta.textContent = "TU NOTA DEL RA";
  elMensaje.textContent = "Aquí aparecerá la magia ✨";
}

function pintarResultado(r) {
  elNota.className = "nota";
  elNota.textContent = fmt(r.acum, 2);
  elCarga.style.width = Math.min(100, r.acum * 10) + "%";

  if (r.todo) {
    elEtiqueta.textContent = "TU NOTA DEL RA";
    elMensaje.textContent = mensajeFinal(r.acum);
  } else {
    elEtiqueta.textContent = "LLEVAS HASTA AHORA";
    elMensaje.textContent = "Todavía faltan trabajos por entrar 🕒";
  }

  detalle("Peso ya evaluado", fmt(r.evalW / r.totalW * 100, 1) + "%");

  if (r.todo) {
    detalle("Estado", r.acum >= NOTA_APROBADO ? "Aprobado ✅" : "Suspenso ❌");
    return;
  }

  detalle("Tu media con lo evaluado", fmt(r.media, 2));
  if (r.necesario <= 0) {
    detalle("Para aprobar (5)", "¡Ya lo tienes! 🎉");
  } else if (r.necesario > 10) {
    detalle("Nota necesaria en lo que falta", "más de 10 😬");
  } else {
    detalle("Nota necesaria en lo que falta para un 5", fmt(r.necesario, 2));
  }
}

function actualizar() {
  const errores = marcarErrores();
  const r = calcular(aItems(obtenerFilas()));

  const avisos = [];
  if (errores.pesoMalo) {
    avisos.push({ error: true, texto: "Hay un peso que no es válido. Tiene que ser un número entre 1 y 100." });
  }
  if (errores.notaMala) {
    avisos.push({ error: true, texto: "Hay una nota que no es válida. Tiene que ser un número entre 0 y 10." });
  }
  if (r && Math.abs(r.totalW - 100) > 0.011) {
    avisos.push({ error: false, texto: "Los pesos suman " + fmt(r.totalW, 2) + "% y deberían sumar 100%. Calculo igualmente con lo que has puesto." });
  }
  pintarAvisos(avisos);

  elDetalles.innerHTML = "";
  if (r === null || r.nEval === 0) {
    pintarVacio();
  } else {
    pintarResultado(r);
  }
}
