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

//Início do código dos gráficos

const ctx = document.getElementById('despesaReceitaChart').getContext('2d');
        const despesaReceitaChart = new Chart(ctx, {
            type: 'pie', // Tipo de gráfico
            data: {
                labels: ['Receita', 'Despesa'], // Rótulos
                datasets: [{
                    data: [3000, 1500], // Valores em reais
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)', // Cor da Receita
                        'rgba(255, 0, 0, 0.6)' // Cor da Despesa (Vermelho)
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 0, 0, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Despesa e Receita' // Título do gráfico
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                const value = tooltipItem.raw;
                                return `${tooltipItem.label}: R$ ${value.toLocaleString('pt-BR')}`; // Formatação dos dados em reais
                            }
                        }
                    }
                }
            }
        });
        const chartCtx = document.getElementById('planejamentoMensalChart').getContext('2d');
    const planejamentoMensalChart = new Chart(chartCtx, {
        type: 'bar', // Tipo do gráfico
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Planejamento Mensal (R$)',
                data: [1200, 1900, 3000, 2500, 2000, 1500, 4000, 2200, 2800, 3200, 2700, 3500], // Valores em R$
                backgroundColor: 'rgba(16, 13, 171, 0.6)', // Cor das barras
                borderColor: 'rgba(16, 13, 171, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valor (R$)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Meses'
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Gráfico de Planejamento Mensal'
                }
            }
        }
    });

// clicar nos cards, direcionar pagina
document.getElementById("saldoCard").addEventListener("click", function() {
    window.location.href = "contas.html";
});
document.getElementById("receitaCard").addEventListener("click", function() {
    window.location.href = "historico-transacoes.html";
});
document.getElementById("despesaCard").addEventListener("click", function() {
    window.location.href = "historico-transacoes.html";
});
document.getElementById("despesaereceitaCard").addEventListener("click", function() {
    window.location.href = "relatorios.html";
});
document.getElementById("planejamentoCard").addEventListener("click", function() {
    window.location.href = "relatorios.html";
});