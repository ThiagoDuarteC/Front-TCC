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

window.onload = alternarCategorias;

//Fim do código que alterna entre as categorias de despesa e receita dependendo do que o usuário selecionar

let contas = [];

// Função para adicionar uma conta
document.getElementById('salvarConta').addEventListener('click', function () {
    const nomeBanco = document.getElementById('nomeBanco').value;
    const saldoConta = parseFloat(document.getElementById('saldoConta').value);
    const tipoConta = document.getElementById('tipoConta').value;
    const descricao = document.getElementById('descricao').value;

    if (nomeBanco && !isNaN(saldoConta) && tipoConta) {
        const novaConta = {
            id: Date.now(),
            nome: nomeBanco,
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

// Atualiza o ícone do banco ao abrir o modal
const updateIcon = () => {
    const select = document.getElementById('nomeBanco');
    const selectedValue = select.value;

    // Oculta todos os ícones
    for (let i = 1; i <= 12; i++) {
        document.getElementById('iconBanco' + i).style.display = 'none';
    }

    // Exibe o ícone do banco selecionado
    switch (selectedValue) {
        case "Banco do Brasil":
            document.getElementById('iconBanco1').style.display = 'inline';
            break;
        case "Caixa Econômica":
            document.getElementById('iconBanco2').style.display = 'inline';
            break;
        case "Itaú":
            document.getElementById('iconBanco3').style.display = 'inline';
            break;
        case "Santander":
            document.getElementById('iconBanco4').style.display = 'inline';
            break;
        case "Nubank":
            document.getElementById('iconBanco5').style.display = 'inline';
            break;
        case "Bradesco":
            document.getElementById('iconBanco6').style.display = 'inline';
            break;
        case "Inter":
            document.getElementById('iconBanco7').style.display = 'inline';
            break;
        case "PicPay":
            document.getElementById('iconBanco8').style.display = 'inline';
            break;
        case "Safra":
            document.getElementById('iconBanco9').style.display = 'inline';
            break;
        case "PagBank":
            document.getElementById('iconBanco10').style.display = 'inline';
            break;
        case "C6 Bank":
            document.getElementById('iconBanco11').style.display = 'inline';
            break;
        case "Outro Banco":
            document.getElementById('iconBanco12').style.display = 'inline';
            break;
    }
};

// Adicione um evento de mudança ao select para atualizar o ícone ao selecionar um banco
document.getElementById('nomeBanco').addEventListener('change', updateIcon);

// Função para resetar o modal ao fechá-lo
const resetModal = () => {
    document.getElementById('addContaForm').reset(); // Reseta o formulário
    const defaultBanco = "Selecione"; // Define o banco padrão
    document.getElementById('nomeBanco').value = defaultBanco; // Reseta o valor para o banco padrão
    updateIcon(); // Atualiza o ícone para o banco padrão
};

// Adiciona evento ao modal para resetar os campos ao fechá-lo
const addContaModal = document.getElementById('addConta');
addContaModal.addEventListener('hidden.bs.modal', resetModal);


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

function obterContaPorId(contaId) {
    return contas.find(conta => conta.id === contaId);
}

function prepararEdicao(contaId) {
    const conta = obterContaPorId(contaId);
    
    if (conta) {
        document.getElementById('editarNomeBanco').value = conta.nome;
        document.getElementById('editarSaldoConta').value = conta.saldo;
        document.getElementById('editarTipoConta').value = conta.tipo;
        document.getElementById('editarDescricao').value = conta.descricao;

        // Atualizar o ícone do banco selecionado
        updateEditIcon();

        // Exibir o modal
        $('#editarContaModal').modal('show');
    } else {
        console.error('Conta não encontrada!');
    }
}

// Função para atualizar o ícone ao selecionar o banco
function updateEditIcon() {
    // Oculta todos os ícones de bancos
    const icons = document.querySelectorAll('.bank-icon');
    icons.forEach(icon => {
        icon.style.display = 'none'; // Esconde todos os ícones
    });

    // Obtém o valor selecionado no dropdown de bancos
    const selectedBank = document.getElementById('editarNomeBanco').value;

    // Exibe o ícone correspondente ao banco selecionado
    switch (selectedBank) {
        case 'Banco do Brasil':
            document.getElementById('iconBancoEdit1').style.display = 'inline';
            break;
        case 'Caixa Econômica':
            document.getElementById('iconBancoEdit2').style.display = 'inline';
            break;
        case 'Itaú':
            document.getElementById('iconBancoEdit3').style.display = 'inline';
            break;
        case 'Santander':
            document.getElementById('iconBancoEdit4').style.display = 'inline';
            break;
        case 'Nubank':
            document.getElementById('iconBancoEdit5').style.display = 'inline';
            break;
        case 'Bradesco':
            document.getElementById('iconBancoEdit6').style.display = 'inline';
            break;
        case 'Inter':
            document.getElementById('iconBancoEdit7').style.display = 'inline';
            break;
        case 'PicPay':
            document.getElementById('iconBancoEdit8').style.display = 'inline';
            break;
        case 'Safra':
            document.getElementById('iconBancoEdit9').style.display = 'inline';
            break;
        case 'PagBank':
            document.getElementById('iconBancoEdit10').style.display = 'inline';
            break;
        case 'C6 Bank':
            document.getElementById('iconBancoEdit11').style.display = 'inline';
            break;
        case 'Outro banco':
            document.getElementById('iconBancoEdit12').style.display = 'inline';
            break;
        default:
            // Se "Selecione" ou outro valor for escolhido, nenhum ícone será exibido
            break;
    }
}
// Função para atualizar os dados da conta
document.getElementById('salvarEdicaoConta').addEventListener('click', function () {
    // Obter o ID da conta que está sendo editada
    const contaId = obterContaIdParaEdicao(); // Você precisa implementar essa função

    // Obter os novos valores dos campos
    const novoNome = document.getElementById('editarNomeBanco').value;
    const novoSaldo = parseFloat(document.getElementById('editarSaldoConta').value);
    const novoTipo = document.getElementById('editarTipoConta').value;
    const novaDescricao = document.getElementById('editarDescricao').value;

    // Verificar se os dados são válidos
    if (novoNome && !isNaN(novoSaldo) && novoTipo) {
        // Atualizar os dados da conta
        const conta = obterContaPorId(contaId); // Obter a conta pelo ID
        if (conta) {
            conta.nome = novoNome;
            conta.saldo = novoSaldo.toFixed(2);
            conta.tipo = novoTipo;
            conta.descricao = novaDescricao;

            // Renderizar as contas novamente para mostrar as alterações
            renderContas();

            // Fechar o modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('editarContaModal'));
            modal.hide();
        }
    } else {
        alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
});

// Função para obter o ID da conta a ser editada
let contaIdParaEdicao; // Variável global para armazenar o ID da conta a ser editada

function prepararEdicao(contaId) {
    contaIdParaEdicao = contaId; // Armazenar o ID da conta a ser editada
    const conta = obterContaPorId(contaId);
    
    if (conta) {
        document.getElementById('editarNomeBanco').value = conta.nome;
        document.getElementById('editarSaldoConta').value = conta.saldo;
        document.getElementById('editarTipoConta').value = conta.tipo;
        document.getElementById('editarDescricao').value = conta.descricao;

        // Atualizar o ícone do banco selecionado
        updateEditIcon();

         // Atualiza o ID no botão de exclusão
         const excluirButton = document.getElementById('excluirConta');
         excluirButton.setAttribute('data-id', conta.id);

        // Exibir o modal
        $('#editarContaModal').modal('show');
    } else {
        console.error('Conta não encontrada!');
    }
}

// Implementar a função que retorna o ID da conta a ser editada
function obterContaIdParaEdicao() {
    return contaIdParaEdicao;
}

// Função para excluir uma conta
document.getElementById('excluirConta').addEventListener('click', function () {
    const id = parseInt(this.getAttribute('data-id'));
    
    // Verifique se o ID é válido
    if (!isNaN(id)) {
        // Exclui a conta com o ID fornecido
        contas = contas.filter((conta) => conta.id !== id);

        // Atualiza a interface do usuário para refletir as mudanças
        renderContas();
        
        // Fecha o modal de edição
        const editarContaModal = bootstrap.Modal.getInstance(document.getElementById('editarContaModal'));
        editarContaModal.hide();
    } else {
        console.error('ID da conta inválido para exclusão.');
    }
});
