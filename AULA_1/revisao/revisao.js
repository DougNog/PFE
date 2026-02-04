//!!--------------!!//
//!! EXERCICIO 1 !!//
//!!------------!!//

//* Verificador de Turno e Prioridade

// let hora = Number(prompt("digite a hora de 0 a 23"))

// let prioridade = Number(prompt("digite a proiridade de 0 a 10"))

// if (hora < 12 || hora <= 17 && prioridade >= 8) {
//     alert('TAREFA CRÍTICA/URGENTE')
// } else if (prioridade >= 7 && prioridade < 9 && (hora >= 0 && hora <= 17)) {
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

// function limpar_nome_contato(nome) {
//     let nome_normal = prompt("insira seu nome")
//     let nome_sem_espaço = nome_normal.trim()
//     let nome_maiuscula = nome_sem_espaço.toUpperCase()
//     let conta_palavras = nome_maiuscula.split("")
//     alert("seu nome é " + nome_maiuscula)
//     alert("E tem " + conta_palavras.length + " letras")
// }

// limpar_nome_contato()

//!!--------------!!//
//!! EXERCICIO 4 !!//
//!!------------!!//

//* Contador de dias para envento

let entrada_data_usuario = prompt("Insira a data do evento (AAAA-MM-DD)")
let data_hoje = new Date()
let data_evento = new Date(entrada_data_usuario)
let diferenca_datas = data_evento - data_hoje
let dias = Math.ceil(diferenca_datas / (1000 * 60 * 60 * 24));

if (isNaN(data_evento)) {
    alert("Data invalida")
} else if (diferenca_datas < 0) {
    alert("O evento ja foi")
} else {
    alert("Faltam " + dias + " dias para o evento")
}

//!!--------------!!//
//!! EXERCICIO 5 !!//
//!!------------!!//

//* Varredura de compromissos (loops)

// let agenda_horarios = [8, 12, 25, 15, -2, 20]

// for (let n = 0; n < agenda_horarios.length; n++) {
//     let horario = agenda_horarios[n]

//     if (horario >= 0 && horario <= 23) {
//         alert("Seu compromisso foi agendado para as " + horario + "h")
//     } else {
//         alert("Atenção, o horario " + horario + "h é invalido")
//     }
// }

//!!---------------!!//
//!! DESAFIO EXTRA!!//
//!!-------------!!//

