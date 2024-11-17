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

//Início do código do modal do filtro de mês e ano

let dataAtual = new Date();
let anoAtual = dataAtual.getFullYear();
let mesAtual = dataAtual.toLocaleString('pt-BR', { month: 'long' });

// Função para abrir o modal do calendário
$('#campoMesAno').click(function () {
    $('#calendarioModal').toggle();
});

// Exibir o ano atual no modal
$('#anoSelecionado').text(anoAtual);

// Ao clicar no botão "Mês Atual", redefine o mês e ano atuais
$('#btnMesAtual').click(function () {
    mesAtual = dataAtual.toLocaleString('pt-BR', { month: 'long' });
    anoAtual = dataAtual.getFullYear();
    $('#campoMesAno').text(`${mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1)} ${anoAtual}`);
    $('#calendarioModal').hide();
    $('#anoSelecionado').text(anoAtual);
});

// Ao clicar em um mês
$('.mes').click(function () {
    let mesSelecionado = $(this).data('mes');
    $('#campoMesAno').text(`${mesSelecionado} ${anoAtual}`);
    $('#calendarioModal').hide();
});

// Navegação de anos
$('#anoAnterior').click(function () {
    anoAtual--;
    $('#anoSelecionado').text(anoAtual);
});

$('#anoProximo').click(function () {
    anoAtual++;
    $('#anoSelecionado').text(anoAtual);
});

//Botão Resetar
$('#btnResetar').click(function () {
    // Redefinir o campoMesAno para o texto "Selecione o Mês"
    $('#campoMesAno').text("Selecione o Mês")
    $('#calendarioModal').fadeOut();
});

// Botão Cancelar
$('#btnCancelar').click(function () {
    $('#calendarioModal').fadeOut();
});

//Fim do código do modal do filtro de mês e ano


load_transacoes = function () {
    $.get('http://127.0.0.1:3000/transactions')
        .done(function (data) {
            console.log(data)
            $('#table-body').html('');
            data.forEach((transacao) => {
                let transactionTypeContent = transacao.transaction_type === 'credit'
                    ? '<td class="text-success">Crédito</td>'
                    : '<td class="text-danger">Débito</td>'

                let formattedDate = new Date(transacao.transaction_date + 'T00:00:00').toLocaleDateString('pt-BR');

                let line = `
                        <tr data-bs-toggle="modal" data-bs-target="#altModal">
                            ${transactionTypeContent}
                            <td id="categoria">${transacao.category.name}</td>
                            <td id="data">${formattedDate}</td>
                            <td id="conta">${transacao.account.name}</td>
                            <td id="valor">${formatMoney(transacao.value)}</td>
                        </tr>
                    `;
                $('#table-body').append(line);
            });

            $('.receita-valor').text(formatMoney(data.total_balance))
            $('.expectativa-valor').text(formatMoney(data.total_goals))
        })
        .fail(function (xhr) {
            toastr.error(xhr.responseJSON.errors[0]);
        });
}

load_transacoes()
