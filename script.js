//função de requisição HTTP usando XMLHttpRequest
function fazerRequisição() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            exibirResultado(data);
        }
    };

    xhr.open("GET", "http://reserva.laboratorio.app.br:10100/produtos", true);
    xhr.send();

}

// Função para exibir os resultados na tabela
function exibirResultado(data) {
    var tabela = document.getElementById("resultadoTabela");
    tabela.innerHTML = ""; // limpa tabela

    data.forEach(function (item) {
        var row = tabela.insertRow();
        var cell1 = row.insertcell(0);
        var cell2 = row.insertcell(1);
        var cell3 = row.insertcell(2);
        var cell4 = row.insertcell(3);
        var cell5 = row.insertcell(4);
        var cell6 = row.insertcell(5);
        var cell7 = row.insertcell(6);
        var cell8 = row.insertcell(7);

        cell1.innerHTML = item.id;
        cell2.innerHTML = item.codBarras;
        cell3.innerHTML = item.produto;
        cell4.innerHTML = item.marca;
        cell5.innerHTML = item.modelo;
        cell6.innerHTML = item.valor;
        cell7.innerHTML = item.'<button>Editar</button>';
        cell8.innerHTML = item.'<button onclik=excluirProduto('+item.id+')>Excluir</button>';

    })
}

//chame a função fazer requisição quando a pagina carregar
fazerRequisição();

function cadastroProduto() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("reposta").value = xhr.responseText;
            fazerRequisição();
        }
    };

    let id = document.getElementById("idProduto").value;
    let codBarras = document.getElementById("codBarras").value;
    let produto = document.getElementById("produto").value;
    let marca = document.getElementById("marca").value;
    let valor = document.getElementById("valor").value;

    const dados = {
        id : id,
        codBarras : codBarras,
        produto : produto,
        marca : marca,
        valor : valor
    };

    console.log(dados);
    let envio = JSONstringfy(dados);

    xhr.open("POST", "http://reserva.laboratorio.app.br:10100/produto", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(envio);

    document.getElementById("idProduto").value = '';
    document.getElementById("codBarras").value = '';
    document.getElementById("produto").value = '';
    document.getElementById("marca").value = '';
    document.getElementById("modelo").value = '';
    document.getElementById("valor").value = '';
}

function excluirProduto(idProduto){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("reposta").value = xhr.responseText;
            fazerRequisição();
        }
    };

    xhr.open("Delete", "http://reserva.laboratorio.app.br:10100/produto"+idProduto,  true);
    xhr.send();
}