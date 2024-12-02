$.ajaxSetup({
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

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

$(document).ready(function(){

    load_report($('.filtro-dropdown').val())

    $('.filtro-dropdown').change(function(){
        report_container.destroy();
        load_report($('.filtro-dropdown').val())
    })
    
})

var report_container

const colors = [
    'rgba(75, 192, 192, 0.9)',
    'rgba(255, 99, 132, 0.9)',
    'rgba(255, 205, 86, 0.9)',
    'rgba(54, 162, 235, 0.9)',
    'rgba(153, 102, 255, 0.9)',
    'rgba(255, 159, 64, 0.9)',
    'rgba(201, 203, 207, 0.9)',
    'rgba(0, 128, 128, 0.9)',
    'rgba(255, 69, 0, 0.9)',
    'rgba(139, 69, 19, 0.9)',
    'rgba(0, 255, 127, 0.9)',
    'rgba(70, 130, 180, 0.9)',
    'rgba(238, 130, 238, 0.9)',
    'rgba(124, 252, 0, 0.9)',
    'rgba(220, 20, 60, 0.9)' 
];

load_report = function (route) {
    $.get(`http://127.0.0.1:3000/reports/${route}`)
        .done(function (data) {
            let labels, values, legendas
            if (route == 'balance_per_account') {
                legendas = data.accounts
                labels = data.accounts.map(account => account.name);
                values = data.accounts.map(account => parseFloat(account.value));
                console.log(labels, values)
            } else{
                legendas = data.categories
                labels = data.categories.map(category => category.name);
                values = data.categories.map(category => parseFloat(category.value));
            }
            window[route](labels, values)
            generate_legenda(legendas, colors)
        })
        .fail(function (xhr) {
            toastr.error(xhr.responseJSON.errors[0]);
        });
}

generate_legenda = function (legendas) {
    $('.legenda').html('');
    legendas.forEach((item, index) => {
        let legenda_item = `
            <div class="legenda-item">
                <span class="legenda-icone" style="background-color: ${colors[index % colors.length]}"></span>
                <div class="legenda-texto-valor">
                    <span class="legenda-texto">${item.name}:</span>
                    <span class="legenda-valor">${formatMoney(item.value)}</span>
                </div>
            </div>
        `;
        $('.legenda').append(legenda_item);
    });
}

category_by_credit = function (labels, values){
    const ctx = document.getElementById('report').getContext('2d');
    report_container = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
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
                    text: 'Categoria por Receita'
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const value = tooltipItem.raw;
                            return `${tooltipItem.label}: R$ ${value.toLocaleString('pt-BR')}`;
                        }
                    }
                }
            }
        }
    });
}

category_by_debit = function (labels, values){
    const ctx = document.getElementById('report').getContext('2d');
    report_container = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
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
                    text: 'Categoria por Despesa'
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const value = tooltipItem.raw;
                            return `${tooltipItem.label}: R$ ${value.toLocaleString('pt-BR')}`;
                        }
                    }
                }
            }
        }
    });
}

balance_per_account = function (labels, values){
    const ctx = document.getElementById('report').getContext('2d');
    report_container = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
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
                    text: 'Categoria por Receita'
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const value = tooltipItem.raw;
                            return `${tooltipItem.label}: R$ ${value.toLocaleString('pt-BR')}`;
                        }
                    }
                }
            }
        }
    });
}

