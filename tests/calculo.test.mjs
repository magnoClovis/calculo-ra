import test from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import vm from "node:vm";

// los scripts de js/ no son modulos, asi que los cargo en un contexto comun
const contexto = vm.createContext({});
["formato", "calculo", "validacion"].forEach(function (nombre) {
  const ruta = new URL("../js/" + nombre + ".js", import.meta.url);
  vm.runInContext(readFileSync(ruta, "utf8"), contexto);
});
const { calcular, parse, fmt, validarFila } = contexto;

function casi(a, b) {
  assert.ok(Math.abs(a - b) < 0.0001, a + " deberia ser " + b);
}

test("nota final con todos los trabajos", function () {
  const r = calcular([{ w: 50, g: 10 }, { w: 50, g: 5 }]);
  casi(r.acum, 7.5);
  assert.strictEqual(r.todo, true);
});

test("nota parcial y lo que hace falta para aprobar", function () {
  const r = calcular([{ w: 30, g: 8 }, { w: 30, g: 6 }, { w: 40, g: NaN }]);
  casi(r.acum, 4.2);
  casi(r.media, 7);
  casi(r.necesario, 2);
  assert.strictEqual(r.todo, false);
});

test("sin pesos no hay resultado", function () {
  assert.strictEqual(calcular([{ w: NaN, g: 5 }]), null);
});

test("si los pesos no suman 100 se reparte sobre lo que haya", function () {
  casi(calcular([{ w: 20, g: 10 }, { w: 20, g: 0 }]).acum, 5);
});

test("una nota fuera de rango no cuenta", function () {
  const r = calcular([{ w: 50, g: 11 }, { w: 50, g: 6 }]);
  assert.strictEqual(r.nEval, 1);
});

test("parse acepta coma y punto", function () {
  assert.strictEqual(parse("7,5"), 7.5);
  assert.strictEqual(parse("7.5"), 7.5);
  assert.ok(isNaN(parse("")));
});

test("fmt usa coma", function () {
  assert.strictEqual(fmt(7.456, 2), "7,46");
  assert.strictEqual(fmt(NaN, 2), "-");
});

test("validarFila detecta valores fuera de rango", function () {
  assert.strictEqual(validarFila({ w: "120", g: "" }).malW, true);
  assert.strictEqual(validarFila({ w: "30", g: "11" }).malG, true);
  assert.strictEqual(validarFila({ w: "30", g: "7,5" }).malG, false);
  assert.strictEqual(validarFila({ w: "", g: "" }).malW, false);
  assert.strictEqual(validarFila({ w: "abc", g: "" }).malW, true);
});
