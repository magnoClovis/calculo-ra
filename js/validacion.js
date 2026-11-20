function validarFila(fila) {
  const w = parse(fila.w);
  const g = parse(fila.g);
  const malW = fila.w.trim() !== "" && !(w > 0 && w <= 100);
  const malG = fila.g.trim() !== "" && !(g >= 0 && g <= 10);
  return { w: w, g: g, malW: malW, malG: malG };
}

function aItems(filas) {
  return filas.map(function (fila) {
    const v = validarFila(fila);
    return {
      w: v.malW ? NaN : v.w,
      g: v.malG ? NaN : v.g
    };
  });
}
