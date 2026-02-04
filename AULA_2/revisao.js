//!!--------------!!//
//!! EXERCICIO 1 !!//
//!!------------!!//

function converter() {
    let c = Number(document.getElementById("celsius").value)
    let f = c * 1.8 + 32

    document.getElementById("resultado").innerText =
        "Fahrenheit: " + f.toFixed(1)

    if (f < 80) {
        document.body.classList.add("frio")
        document.body.classList.remove("quente")
    } else {
        document.body.classList.add("quente")
        document.body.classList.remove("frio")
    }
}

//!!--------------!!//
//!! EXERCICIO 2 !!//
//!!------------!!//