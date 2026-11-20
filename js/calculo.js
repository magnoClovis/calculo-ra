const NOTA_APROBADO = 5;

// items es una lista de { w: peso, g: nota }. Lo que no sea válido llega como NaN
function calcular(items) {
  let totalW = 0;
  items.forEach(function (it) {
    if (isFinite(it.w) && it.w > 0) totalW += it.w;
  });
  if (totalW === 0) return null;

  let evalW = 0;
  let acum = 0;
  let nEval = 0;
  items.forEach(function (it) {
    const pesoOk = isFinite(it.w) && it.w > 0;
    const notaOk = isFinite(it.g) && it.g >= 0 && it.g <= 10;
    if (pesoOk && notaOk) {
      evalW += it.w;
      acum += it.g * it.w / totalW;
      nEval++;
    }
  });

  const resto = (totalW - evalW) / totalW;

  return {
    totalW: totalW,
    evalW: evalW,
    acum: acum,
    nEval: nEval,
    todo: nEval > 0 && resto < 0.000001,
    media: evalW > 0 ? acum / (evalW / totalW) : NaN,
    necesario: resto > 0.000001 ? (NOTA_APROBADO - acum) / resto : NaN
  };
}
