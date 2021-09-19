let valorInput = document.getElementById("valor");
let prazoAnoInput = document.getElementById("prazo-ano");
let jurosAnoInput = document.getElementById("juros-ano");

let jurosList, jurosTotalList, amortizacao, prazoMes;

let prazoMesField = document.getElementById("prazo-mes");
let jurosMesField = document.getElementById("juros-mes");
let jurosAcumField = document.getElementById("juros-acum");

let tabela = document.getElementById("tabela");
let tabelaBody = document.getElementById("tabela-body");

document.addEventListener("input", () => {
  tabelaBody.remove();
  jurosList = [];
  jurosTotalList = [];
  prazoMes = calcPrazoMes(prazoAnoInput.valueAsNumber);
  jurosMes = calcJurosMes(jurosAnoInput.valueAsNumber);
  amortizacao = valorInput.valueAsNumber / prazoMes;
  prazoMesField.textContent = prazoMes;
  jurosMesField.textContent = jurosMes;
  jurosAcumField.textContent = calcJurosAcum(valorInput.valueAsNumber);
  createTable();
});

function calcPrazoMes(prazoAno) {
  return prazoAnoInput.value != "" ? prazoAno * 12 : "-";
}

function calcJurosMes(jurosAno) {
  return jurosAnoInput.value != ""
    ? (Math.pow(1 + jurosAno, 1 / 12) - 1).toFixed(8)
    : "-";
}

function calcJurosAcum(valor) {
  if (
    prazoAnoInput.value == "" ||
    jurosAnoInput.value == "" ||
    valorInput.value == ""
  ) {
    return "-";
  }
  let jurosAcumulado = 0;

  for (let i = 0; i < prazoMes; i++) {
    let saldoDevedor = valor - i * amortizacao;
    let juros = saldoDevedor * jurosMes;
    jurosList.push(juros);
    jurosTotalList.push(juros + amortizacao);
    jurosAcumulado += juros;
  }
  return jurosAcumulado.toFixed(2);
}

function createTable() {
  if (
    prazoAnoInput.value == "" ||
    jurosAnoInput.value == "" ||
    valorInput.value == ""
  ) {
    return "-";
  }
  tabelaBody = document.createElement("tbody");
  tabela.appendChild(tabelaBody);
  for (let i = 0; i < 10; i++) {
    let novaLinha = document.createElement("tr");
    tabelaBody.appendChild(novaLinha);

    let prestacaoCol = document.createElement("td");
    prestacaoCol.textContent = i + 1;
    novaLinha.appendChild(prestacaoCol);

    let amortizacaoCol = document.createElement("td");
    amortizacaoCol.textContent = amortizacao.toFixed(2);
    novaLinha.appendChild(amortizacaoCol);

    let jurosCol = document.createElement("td");
    jurosCol.textContent = jurosList[i].toFixed(2);
    novaLinha.appendChild(jurosCol);

    let jurosTotalCol = document.createElement("td");
    jurosTotalCol.textContent = jurosTotalList[i].toFixed(2);
    novaLinha.appendChild(jurosTotalCol);
  }
}
