const form = document.getElementById("form-atividade");
const imgAprovado = '<img src = "./images/aprovado.png" alt="Emoji celebrando" />'
const imgReprovado = '<img src = "./images/reprovado.png" alt="Emoji decepcionado" />'
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima:"))

let linhas = ''; //create a constant that'll be used in the HTML to keep the information given by the user on the inputs

form.addEventListener('submit', function(e) { //every time the event "submit" is triggered these actions will be performed
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
})

function adicionaLinha () { //a function that create lines inside a table on the HTML with the values of the inputs given
    const inputNomeAtividade = document.getElementById("nome-atividade");
    const inputNotaAtividade = document.getElementById("nota-atividade");

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value) //add the value of the input "nome-atividade" in the array "atividades"
    notas.push(parseFloat(inputNotaAtividade.value)); //add the value of the input "nota-atividade" in the array "notas"

    let linha = '<tr>';
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`
    linha += '</tr>';

    linhas += linha;
    }

    inputNomeAtividade.value = ''; //it cleans the form
    inputNotaAtividade.value = '';
}

function atualizaTabela () { //a function that adds the lines and columns created by the informations given by the user in the inputs in the "tbody" element of the HTML
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {

    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }    
    return somaDasNotas / notas.length;
}