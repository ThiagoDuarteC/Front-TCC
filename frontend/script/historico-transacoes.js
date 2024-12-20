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

prepararEdicao = function (transacao_id) {
    $.get(`http://127.0.0.1:3000/transactions/${transacao_id}`)
        .done(function (data) {
            preencherSelect('#editarSelectCategoria', data.categories, 'Selecione uma categoria');
            preencherSelect('#editarSelectConta', data.accounts, 'Selecione uma conta');
            preencherSelect('#editarSelectMeta', data.goals, 'Selecione uma meta');
            $('#editarIdTransação').val(data.transaction.id)
            $('#editarSelectCategoria').val(data.transaction.category_id)
            $('#editarSelectConta').val(data.transaction.account_id)
            $('#editarSelectMeta').val(data.transaction.goal_id)
            $('#editarValorTransacao').val(formatMoney(data.transaction.value))
            $(`input[name="editarTipoTransacao"][value="${data.transaction.transaction_type}"]`).prop('checked', true);
            $('#editarDataTransacao').val(data.transaction.transaction_date)
        })
        .fail(function (xhr) {
            toastr.error(xhr.responseJSON.errors[0]);
        });
}

$('#editarTransacao').submit(function (e) {
    e.preventDefault();
    const transação_id = $('#editarIdTransação')
    const categoria = $('#editarSelectCategoria').val()
    const conta = $('#editarSelectConta').val()
    const meta = $('#editarSelectMeta').val()
    const valorTransacao = $('#editarValorTransacao').val().replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
    const tipoTransacao = $('input[name="editarTipoTransacao"]:checked').val()
    const dataTransacao = $('#editarDataTransacao').val()

    
    $.ajax({
        url: `http://127.0.0.1:3000/transactions/${transação_id.val()}`,
        method: 'PUT',
        data: { category_id: categoria, account_id: conta, goal_id: meta, value: valorTransacao, transaction_type: tipoTransacao, transaction_date: dataTransacao },
        success: function (data) {
            toastr.success('Transação atualizada com sucesso!');
            $('#altModal').modal('hide')
            $('#editarTransacao')[0].reset();
            load_transacoes();
        },
        error: function (xhr) {
            toastr.error(xhr.responseJSON.errors[0]);
        }
    });
})

load_transacoes = function () {
    $.get('http://127.0.0.1:3000/transactions')
        .done(function (data) {
            $('#table-body').html('');
            data.forEach((transacao) => {
                let transactionTypeContent = transacao.transaction_type === 'credit'
                    ? '<td class="text-success">Crédito</td>'
                    : '<td class="text-danger">Débito</td>'

                let formattedDate = new Date(transacao.transaction_date + 'T00:00:00').toLocaleDateString('pt-BR');

                let line = `
                        <tr>
                            ${transactionTypeContent}
                            <td id="categoria">${transacao.category.name}</td>
                            <td id="data">${formattedDate}</td>
                            <td id="conta">${transacao.account.name}</td>
                            <td id="valor">${formatMoney(transacao.value)}</td>
                            <td>
                                <i class="fa-solid fa-pen blue-color" style="font-size: 1.2rem;" onclick="prepararEdicao(${transacao.id})" data-bs-toggle="modal" data-bs-target="#altModal">
                                <i class="fa-solid fa-trash blue-color" style="font-size: 1.2rem" onclick="excluirTransacao(${transacao.id})">
                            </td>
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

excluirTransacao = function (transacao_id) {
    if (confirm('Gostaria de excluir a transação?')) {
        $.ajax({
            url: `http://127.0.0.1:3000/transactions/${transacao_id}`,
            method: 'DELETE',
            success: function (data) {
                toastr.success('Transação excluida com sucesso!');
                load_transacoes();
            },
            error: function (xhr) {
                toastr.error(xhr.responseJSON.errors[0]);
            }
        });
    }
}
