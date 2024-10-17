//Início do código que altera a imagem e nome do perfil

document.getElementById('salvarAlteracoes').addEventListener('click', function() {
    const nomeUsuario = document.getElementById('nomeUsuario').value;
    document.getElementById('nomeUsuarioDisplay').textContent = nomeUsuario || 'Usuário';

    const fotoPerfilInput = document.getElementById('fotoPerfil');
    if (fotoPerfilInput.files && fotoPerfilInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector('.perfil-img').src = e.target.result;
        };
        reader.readAsDataURL(fotoPerfilInput.files[0]);
    }

    var perfilModalEl = document.querySelector('#perfilModal');
    var perfilModal = bootstrap.Modal.getInstance(perfilModalEl);
    if (perfilModal) {
        perfilModal.hide();
    } else {
        new bootstrap.Modal(perfilModalEl).hide();
    }
});

//Fim do código que altera a imagem e nome do perfil

//Início do Código que cria categorias para despesas e receitas dentro do modal

const adicionarCategoriaSpan = document.querySelector('.adicionar-categoria');
const novaCategoriaInput = document.getElementById('nova-categoria');
const btnAddCategoria = document.getElementById('btn-add-categoria');
const categoriaDespesa = document.querySelector('.grid-categorias-despesa');
const categoriaReceita = document.querySelector('.grid-categorias-receita');

const btnDespesas = document.getElementById('btn-despesa');
const btnReceitas = document.getElementById('btn-receita');

let inputVisivel = false; 

function formatarTexto(texto) {
    return texto
    .normalize('NFD')  // Normaliza caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '')  // Remove acentos
    .toLowerCase()  // Converte para minúsculas
    .replace(/\s+/g, '-');  // Substitui espaços por hífens
}

adicionarCategoriaSpan.addEventListener('click', () => {
    inputVisivel = !inputVisivel; // Alterna o estado de visibilidade
    
    if (inputVisivel) {
    novaCategoriaInput.style.display = 'inline-block';
    btnAddCategoria.style.display = 'inline-block';
    } else {
    novaCategoriaInput.style.display = 'none';
    btnAddCategoria.style.display = 'none';
    }
});

btnAddCategoria.addEventListener('click', () => {
    const novaCategoriaNome = novaCategoriaInput.value.trim();

    if (novaCategoriaNome === '') {
    alert('Por favor, insira um nome para a nova categoria.');
    return;
    }

    const categoriaId = formatarTexto(novaCategoriaNome);  // Formata o texto para id e value

    
    const novaCategoriaDiv = document.createElement('div');
    novaCategoriaDiv.classList.add('categoria-opcao');

    novaCategoriaDiv.innerHTML = `
    <input type="radio" id="${categoriaId}" name="categoria" value="${categoriaId}">
    <label for="${categoriaId}">${novaCategoriaNome.charAt(0).toUpperCase() + novaCategoriaNome.slice(1)}</label>
    `;

   
    if (btnDespesa.checked) {

    categoriasDespesa.appendChild(novaCategoriaDiv);
    } else if (btnReceita.checked) {
   
    categoriasReceita.appendChild(novaCategoriaDiv);
    } else {
    alert('Por favor, selecione se é uma despesa ou receita antes de adicionar a categoria.');
    return;
    }

   
    novaCategoriaInput.value = '';
    novaCategoriaInput.style.display = 'none';
    btnAddCategoria.style.display = 'none';
    inputVisivel = false; // Resetar o estado de visibilidade
});

//Fim do Código que cria categorias para despesas e receitas dentro do modal

//Início do código que alterna entre as categorias de despesa e receita dependendo do que o usuário selecionar

const btnDespesa = document.getElementById('btn-despesa');
const btnReceita = document.getElementById('btn-receita');
const categoriasDespesa = document.querySelector('.grid-categorias-despesa');
const categoriasReceita = document.querySelector('.grid-categorias-receita');

function alternarCategorias() {
    if (btnDespesa.checked) {
    categoriasDespesa.style.opacity = '1';
    categoriasDespesa.style.position = 'relative';
    categoriasReceita.style.opacity = '0';
    categoriasReceita.style.position = 'absolute';
    } else if (btnReceita.checked) {
    categoriasDespesa.style.opacity = '0';
    categoriasDespesa.style.position = 'absolute';
    categoriasReceita.style.opacity = '1';
    categoriasReceita.style.position = 'relative';
    }
}

btnDespesa.addEventListener('change', alternarCategorias);
btnReceita.addEventListener('change', alternarCategorias);

window.onload = alternarCategorias;

//Fim do código que alterna entre as categorias de despesa e receita dependendo do que o usuário selecionar

// Array para armazenar as contas criadas
let contas = [];

// Função para adicionar uma conta
document.getElementById('adicionarConta').addEventListener('click', function () {
    const nomeConta = document.getElementById('nomeConta').value;
    const saldoConta = parseFloat(document.getElementById('saldoConta').value);
    const tipoConta = document.getElementById('tipoConta').value;
    const descricao = document.getElementById('descricao').value;

    if (nomeConta && !isNaN(saldoConta) && tipoConta) {
        const novaConta = {
            id: Date.now(),
            nome: nomeConta,
            saldo: saldoConta.toFixed(2),
            tipo: tipoConta,
            descricao: descricao
        };

        contas.push(novaConta);
        renderContas();
        document.getElementById('addContaForm').reset();

        // Fecha o modal após salvar a conta
        const modal = bootstrap.Modal.getInstance(document.getElementById('addConta'));
        modal.hide();
    } else {
        alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
});

// Função para renderizar os cards de contas
function renderContas() {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = '';

    contas.forEach((conta) => {
        const card = document.createElement('div');
        card.classList.add('conta');
        card.setAttribute('id', `conta-${conta.id}`);

        card.innerHTML = `
            <div class="conta-header">
                <span class="conta-nome">${conta.nome}</span>
                <img src="img/3-pontos.png" alt="Opções" data-bs-toggle="modal" data-bs-target="#editarContaModal" onclick="prepararEdicao(${conta.id})">
            </div>
            <div class="conta-body">
                <img src="img/carteira.png" alt="Carteira">
                <span>Saldo Atual:</span>
            </div>
            <div class="conta-footer">
                <span class="saldo-atual">R$ ${parseFloat(conta.saldo).toFixed(2)}</span>
            </div>
        `;
        cardsContainer.appendChild(card);
    });

    // Atualiza o saldo total
    atualizarSaldoTotal();
}

// Função para atualizar o saldo total
function atualizarSaldoTotal() {
    const saldoTotal = contas.reduce((total, conta) => total + parseFloat(conta.saldo), 0).toFixed(2);
    document.getElementById('saldoTotal').textContent = `R$ ${saldoTotal}`;
}

// Função para validar o saldo numérico
function validarSaldo(saldo) {
    return !isNaN(saldo) && saldo >= 0;
}

// Função para preparar a edição de uma conta
function prepararEdicao(id) {
    const conta = contas.find((conta) => conta.id === id);

    if (conta) {
        document.getElementById('editarNomeConta').value = conta.nome;
        document.getElementById('editarSaldoConta').value = conta.saldo;
        document.getElementById('editarTipoConta').value = conta.tipo;
        document.getElementById('editarDescricao').value = conta.descricao;

        document.getElementById('salvarEdicaoConta').setAttribute('data-id', id);
        document.getElementById('excluirConta').setAttribute('data-id', id);
    }
}

// Função para salvar as alterações de uma conta editada
document.getElementById('salvarEdicaoConta').addEventListener('click', function () {
    const id = parseInt(this.getAttribute('data-id'));
    const contaEditada = contas.find((conta) => conta.id === id);

    if (contaEditada) {
        const saldoEditado = parseFloat(document.getElementById('editarSaldoConta').value);

        if (validarSaldo(saldoEditado)) {
            contaEditada.nome = document.getElementById('editarNomeConta').value;
            contaEditada.saldo = saldoEditado.toFixed(2);
            contaEditada.tipo = document.getElementById('editarTipoConta').value;
            contaEditada.descricao = document.getElementById('editarDescricao').value;

            renderContas();

            const editarContaModal = bootstrap.Modal.getInstance(document.getElementById('editarContaModal'));
            editarContaModal.hide();
        } else {
            alert('Por favor, insira um saldo válido.');
        }
    }
});

// Função para excluir uma conta
document.getElementById('excluirConta').addEventListener('click', function () {
    const id = parseInt(this.getAttribute('data-id'));
    contas = contas.filter((conta) => conta.id !== id);
    renderContas();

    const editarContaModal = bootstrap.Modal.getInstance(document.getElementById('editarContaModal'));
    editarContaModal.hide();
});
