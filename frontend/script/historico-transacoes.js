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

//Início do código do modal do filtro de mês e ano

let dataAtual = new Date();
let anoAtual = dataAtual.getFullYear();
let mesAtual = dataAtual.toLocaleString('pt-BR', { month: 'long' });

// Função para abrir o modal do calendário
$('#campoMesAno').click(function() {
    $('#calendarioModal').toggle();
});

// Exibir o ano atual no modal
$('#anoSelecionado').text(anoAtual);

// Ao clicar no botão "Mês Atual", redefine o mês e ano atuais
$('#btnMesAtual').click(function() {
    mesAtual = dataAtual.toLocaleString('pt-BR', { month: 'long' });
    anoAtual = dataAtual.getFullYear();
    $('#campoMesAno').text(`${mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1)} ${anoAtual}`);
    $('#calendarioModal').hide();
    $('#anoSelecionado').text(anoAtual);
});

// Ao clicar em um mês
$('.mes').click(function() {
    let mesSelecionado = $(this).data('mes');
    $('#campoMesAno').text(`${mesSelecionado} ${anoAtual}`);
    $('#calendarioModal').hide();
});

// Navegação de anos
$('#anoAnterior').click(function() {
    anoAtual--;
    $('#anoSelecionado').text(anoAtual);
});

$('#anoProximo').click(function() {
    anoAtual++;
    $('#anoSelecionado').text(anoAtual);
});

//Botão Resetar
$('#btnResetar').click(function() {
// Redefinir o campoMesAno para o texto "Selecione o Mês"
$('#campoMesAno').text("Selecione o Mês")
$('#calendarioModal').fadeOut();
});

// Botão Cancelar
$('#btnCancelar').click(function() {
    $('#calendarioModal').fadeOut();
});

//Fim do código do modal do filtro de mês e ano

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

//Início do código para adicionar paginação à tabela de transações

const rowsPerPage = 5;  // Define o número de linhas por página
let currentPage = 1;

function renderTable() {
    const tableBody = document.getElementById("table-body");
    const rows = Array.from(tableBody.getElementsByTagName("tr"));
    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);  // Calcula o total de páginas
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    
    rows.forEach((row, index) => {
        row.style.display = (index >= start && index < end) ? "" : "none";
    });

    // Atualiza o número da página atual e o total de páginas
    document.getElementById("numero-pagina").innerText = currentPage;
    document.getElementById("total-paginas").innerText = totalPages;
}

function nextPage() {
    const tableBody = document.getElementById("table-body");
    const totalRows = tableBody.getElementsByTagName("tr").length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}
// Renderiza a tabela pela primeira vez
renderTable();

//Fim do código para adicionar paginação à tabela de transações