const canvas = document.getElementById("firma");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let dibujando = false;

function posicion(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
    y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
  };
}

function empezar(e) {
  dibujando = true;
  const p = posicion(e);
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
}

function dibujar(e) {
  if (!dibujando) return;
  const p = posicion(e);
  ctx.lineTo(p.x, p.y);
  ctx.stroke();
}

function terminar() {
  dibujando = false;
}

canvas.addEventListener("mousedown", empezar);
canvas.addEventListener("mousemove", dibujar);
canvas.addEventListener("mouseup", terminar);

canvas.addEventListener("touchstart", empezar);
canvas.addEventListener("touchmove", dibujar);
canvas.addEventListener("touchend", terminar);

function limpiar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function guardar() {
  const imagen = canvas.toDataURL("image/png");

  const fecha = new Date().toISOString().slice(0,19).replace(/[:T]/g, "-");

  const link = document.createElement("a");
  link.href = imagen;
  link.download = `firma-${fecha}.png`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
