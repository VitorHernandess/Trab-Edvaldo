let db = {
    clientes: [],
    veiculos: [],
    servicos: []
};

function salvarDados() {
    localStorage.setItem('db', JSON.stringify(db));
}

function carregarDados() {
    const dados = localStorage.getItem('db');
    if (dados) {
        db = JSON.parse(dados);
    }
}

function adicionarCliente() {
    const nome = document.getElementById("cliente_nome").value;
    const telefone = document.getElementById("cliente_telefone").value;

    const id = db.clientes.length + 1;
    db.clientes.push({ id, nome, telefone });
    salvarDados();
    listarClientes();
    limparCampos("cliente");
}

function adicionarVeiculo() {
    const modelo = document.getElementById("veiculo_modelo").value;
    const placa = document.getElementById("veiculo_placa").value;

    const id = db.veiculos.length + 1;
    db.veiculos.push({ id, modelo, placa });
    salvarDados();
    listarVeiculos();
    limparCampos("veiculo");
}

function adicionarServico() {
    const data = document.getElementById("servico_data").value;
    const horario = document.getElementById("servico_horario").value;
    const id_cliente = document.getElementById("servico_cliente").value;

    const id = db.servicos.length + 1;
    db.servicos.push({ id, data, horario, id_cliente });
    salvarDados();
    listarServicos();
    limparCampos("servico");
}

function listarClientes() {
    let lista = "";
    db.clientes.forEach(c => {
        lista += `<li>${c.nome} - ${c.telefone} <button onclick='excluirCliente(${c.id})'>Excluir</button></li>`;
    });
    document.getElementById("lista_clientes").innerHTML = lista;
    carregarClientesDropdown();
}

function listarVeiculos() {
    let lista = "";
    db.veiculos.forEach(v => {
        lista += `<li>${v.modelo} - ${v.placa} <button onclick='excluirVeiculo(${v.id})'>Excluir</button></li>`;
    });
    document.getElementById("lista_veiculos").innerHTML = lista;
}

function listarServicos() {
    let lista = "";
    db.servicos.forEach(s => {
        const cliente = db.clientes.find(c => c.id == s.id_cliente)?.nome || 'Desconhecido';
        lista += `<li>${s.data} - ${s.horario} - Cliente: ${cliente} <button onclick='excluirServico(${s.id})'>Excluir</button></li>`;
    });
    document.getElementById("lista_servicos").innerHTML = lista;
}

function excluirCliente(id) {
    db.clientes = db.clientes.filter(c => c.id !== id);
    salvarDados();
    listarClientes();
}

function excluirVeiculo(id) {
    db.veiculos = db.veiculos.filter(v => v.id !== id);
    salvarDados();
    listarVeiculos();
}

function excluirServico(id) {
    db.servicos = db.servicos.filter(s => s.id !== id);
    salvarDados();
    listarServicos();
}

function carregarClientesDropdown() {
    let options = "";
    db.clientes.forEach(c => {
        options += `<option value='${c.id}'>${c.nome}</option>`;
    });
    document.getElementById("servico_cliente").innerHTML = options;
}

function limparCampos(tipo) {
    if (tipo === "cliente") {
        document.getElementById("cliente_nome").value = "";
        document.getElementById("cliente_telefone").value = "";
    } else if (tipo === "veiculo") {
        document.getElementById("veiculo_modelo").value = "";
        document.getElementById("veiculo_placa").value = "";
    } else if (tipo === "servico") {
        document.getElementById("servico_data").value = "";
        document.getElementById("servico_horario").value = "";
    }
}

window.onload = function () {
    carregarDados();
    listarClientes();
    listarVeiculos();
    listarServicos();
};