function parse(valor) {
  valor = String(valor).trim().replace(",", ".");
  if (valor === "") return NaN;
  return Number(valor);
}

function fmt(n, decimales) {
  if (!isFinite(n)) return "-";
  return n.toFixed(decimales).replace(".", ",");
}
