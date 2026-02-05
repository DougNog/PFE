function converter() {
  let c = Number(document.getElementById("celsius").value);
  let f = c * 1.8 + 32;

  document.getElementById("resultado").innerText =
    "Fahrenheit: " + f.toFixed(1);

  let div = document.getElementById("div_ex1");

  if (f < 80) {
    div.classList.add("frio");
    div.classList.remove("quente");
  } else {
    div.classList.add("quente");
    div.classList.remove("frio");
  }
}
