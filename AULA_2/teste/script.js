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

const nome_input = document.getElementById("inp_nome")
const cargo_input = document.getElementById("inp_cargo")
const color_input = document.getElementById("inp_color")
const nome_card = document.getElementById("nome_card")
const cargo_card = document.getElementById("cargo_card")
const card = document.getElementById("card")

nome_input.addEventListener("input", () =>{
    nome_card.innerText = nome_input.value || "Seu Nome";
});

cargo_input.addEventListener("input", () =>{
    cargo_card.innerText = cargo_input.value || "Seu Cargo";
});

color_input.addEventListener("input", () =>{
    card.style.setProperty("--card-color", color_input.value);
});

