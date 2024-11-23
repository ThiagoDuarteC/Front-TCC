$.ajaxSetup({
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});


//Início do código que altera a imagem e nome do perfil

document.getElementById('salvarAlteracoes').addEventListener('click', function () {
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

load_data = function () {
    $.get('http://127.0.0.1:3000/dashboard')
        .done(function (data) {
            $('#saldoCard span').text(formatMoney(data.current_balance))
            $('#receitaCard span').text(formatMoney(data.credit_balance))
            $('#despesaCard span').text(formatMoney(data.debit_balance))
            despesaReceitaChart(data.credit_balance, data.debit_balance)
            planejamentoMensalChart(data.monthly_data)
        })
        .fail(function (xhr) {
            toastr.error(xhr.responseJSON.errors[0]);
        });
}

load_data()


//Início do código dos gráficos

despesaReceitaChart = function (valorReceita, valorDespesa){
    const ctx = document.getElementById('despesaReceitaChart').getContext('2d');
    const despesaReceitaChart = new Chart(ctx, {
        type: 'pie', // Tipo de gráfico
        data: {
            labels: ['Receita', 'Despesa'], // Rótulos
            datasets: [{
                data: [valorReceita, valorDespesa], // Valores em reais
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
                        label: function (tooltipItem) {
                            const value = tooltipItem.raw;
                            return `${tooltipItem.label}: R$ ${value.toLocaleString('pt-BR')}`; // Formatação dos dados em reais
                        }
                    }
                }
            }
        }
    });
}

planejamentoMensalChart = function (datas){
    const chartCtx = document.getElementById('planejamentoMensalChart').getContext('2d');
    const planejamentoMensalChart = new Chart(chartCtx, {
        type: 'bar', // Tipo do gráfico
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Planejamento Mensal (R$)',
                data: datas, // Valores em R$
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
                    text: 'Gráfico de Planejamento Mensal Desse Ano'
                }
            }
        }
    });
}

// clicar nos cards, direcionar pagina
document.getElementById("saldoCard").addEventListener("click", function () {
    window.location.href = "contas.html";
});
document.getElementById("receitaCard").addEventListener("click", function () {
    window.location.href = "historico-transacoes.html";
});
document.getElementById("despesaCard").addEventListener("click", function () {
    window.location.href = "historico-transacoes.html";
});
document.getElementById("despesaereceitaCard").addEventListener("click", function () {
    window.location.href = "relatorios.html";
});
document.getElementById("planejamentoCard").addEventListener("click", function () {
    window.location.href = "relatorios.html";
});