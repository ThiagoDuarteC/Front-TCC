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

// salvar edição em editar contas

document.getElementById("salvarEdicaoConta").addEventListener("click", function() {
    // Obtenha os valores do modal
    const nomeConta = document.getElementById("editarNomeConta").value;
    const saldoConta = document.getElementById("editarSaldoConta").value;
    const tipoConta = document.getElementById("editarTipoConta").value;
    const descricaoConta = document.getElementById("editarDescricao").value;

    // Atualize os elementos da página com os novos valores
    document.getElementById("contaNome").textContent = nomeConta;
    document.querySelector(".saldo-atual").textContent = `R$ ${parseFloat(saldoConta).toFixed(2)}`;

    // Feche o modal após salvar
    var modal = bootstrap.Modal.getInstance(document.getElementById('editarContaModal'));
    modal.hide();

    // Função para formatar o valor como dinheiro
    function formatarDinheiro(valor) {
        return 'R$ ' + valor.toFixed(2).replace('.', ',');
    }

    // Exemplo de como atualizar o saldo no modal
    function atualizarSaldo(saldo) {
        const saldoElement = document.getElementById('saldoAtual');
        saldoElement.textContent = 'Saldo Atual: ' + formatarDinheiro(saldo);
    }

    // Exemplo de uso
    let saldo = 6535.00; // O saldo pode ser obtido de outra parte do seu código
    atualizarSaldo(saldo);

    // Chame a função quando precisar abrir o modal ou sempre que o saldo mudar

});

// adicionar contas
document.getElementById('adicionarConta').addEventListener('click', adicionarNovaConta);

function adicionarNovaConta() {
    const nomeConta = document.getElementById('nomeConta').value;
    const saldoConta = document.getElementById('saldoConta').value;

    if (!nomeConta || !saldoConta) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const novaConta = document.createElement('div');
    novaConta.className = 'conta';
    novaConta.innerHTML = `
        <div class="conta-header">
            <span class="conta-nome">${nomeConta}</span>
            <img src="img/3-pontos.png" alt="Opções" data-bs-toggle="modal" data-bs-target="#editarContaModal">
        </div>
        <div class="conta-body">
            <img src="img/carteira.png">
            <span>Saldo Atual:</span>
        </div>
        <div class="conta-footer">
            <span class="saldo-atual">R$ ${parseFloat(saldoConta).toFixed(2)}</span>
        </div>
    `;

    const cardsContainer = document.querySelector('.cards');
    cardsContainer.appendChild(novaConta);
    
    document.getElementById('addContaForm').reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('addConta'));
    modal.hide();
}
let contaIdParaExcluir;

function prepararEdicao(contaId) {
    contaIdParaExcluir = contaId; // Armazena o ID da conta que está sendo editada
    // Aqui você pode preencher os campos do modal com os dados da conta, se necessário
}

document.getElementById('excluirConta').addEventListener('click', function() {
    // Fechar o modal após a exclusão
    var modal = bootstrap.Modal.getInstance(document.getElementById('editarContaModal'));
    modal.hide();

    // Remove o card do DOM usando o ID armazenado
    var card = document.getElementById(contaIdParaExcluir);
    if (card) {
        card.remove(); // Remove o card da conta
    }

    // Limpar a referência após a exclusão
    contaIdParaExcluir = null; 
});
