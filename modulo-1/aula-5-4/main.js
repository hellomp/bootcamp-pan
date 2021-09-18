let box = document.getElementById("box");

function setPos(x, y) {
  box.style.top = y + "px";
  box.style.left = x + "px";
}

box.addEventListener("mousedown", (evt) => {
  box.classList.add("dragging");
  document.addEventListener("mousemove", drag);
});

document.addEventListener("mouseup", (evt) => {
  box.classList.remove("dragging");
  document.removeEventListener("mousemove", drag);
});

function drag(evt) {
  let x = evt.clientX;
  let y = evt.clientY;
  setPos(x, y);
}
