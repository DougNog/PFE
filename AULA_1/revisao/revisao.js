//!!--------------!!//
//!! EXERCICIO 1 !!//
//!!------------!!//

//* Verificador de Turno e Prioridade

// let hora = prompt("digite a hora de 0 a 23")

// let prioridade = prompt("digite a proiridade de 0 a 10")


// if (hora < 12 || hora <= 17 && prioridade >= 8) {
//     alert('TAREFA CRÍTICA/URGENTE')
// } else if (hora < 12 || hora <= 17 && prioridade >= 7 || prioridade < 9) {
//     alert('TAREFA IMPORTANTE')
// } else if (hora => 17) {
//     alert('TAREFA NÃO IMPORTANTE')
// } else if (hora > 23 || hora < 0 && prioridade > 10 || prioridade < 0) {
//     alert('Horário Inválido')
// } else {
//     alert('ERRO')
// }


//!!--------------!!//
//!! EXERCICIO 2 !!//
//!!------------!!//

//* Calculadora de Gastos Mensais

// let salario = Number(prompt("digite seu salario"))
// let aluguel = Number(prompt("digite seu gasto com aluguel"))
// let alimentacao = Number(prompt("digite seu gasto com alimentacao"))
// let lazer = Number(prompt("digite seu gasto com lazer"))
// let saldo_final = salario - (aluguel + alimentacao + lazer)


// if (saldo_final > 0) {
//     alert('Saldo Positivo')
// } else if (saldo_final == 0) {
//     alert('No Limite')
// } else if (saldo_final < 0) {
//     alert('Saldo Negativo')
// }

//!!--------------!!//
//!! EXERCICIO 3 !!//
//!!------------!!//

//* Formatador de Nomes para a Agenda

function limpar_nome_contato(nome) {
    let nome = prompt("insira seu nome")
    let nome_maiuscula = nome.toUpperCase()
    alert(nome_maiuscula)
}

limpar_nome_contato()