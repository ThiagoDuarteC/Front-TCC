$.ajaxSetup({
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

$(document).ready(function () {

    load_accounts = function () {
        $.get('http://127.0.0.1:3000/accounts')
            .done(function (data) {
                $('.cards').html('');
                data.forEach((conta) => {
                    let card = `
                        <div id="conta-${conta.id}" class="conta">
                            <div class="conta-header">
                                <span class="conta-nome">${conta.name}</span>
                                <img src="img/3-pontos.png" alt="Opções" data-bs-toggle="modal" data-bs-target="#editarContaModal" onclick="prepararEdicao(${conta.id})">
                            </div>
                            <div class="conta-body">
                                <img src="img/carteira.png" alt="Carteira">
                                <span>Saldo Atual:</span>
                            </div>
                            <div class="conta-footer">
                                <span class="saldo-atual">R$ ${parseFloat(conta.initial_balance).toFixed(2)}</span>
                            </div>
                        </div>
                    `;
                    $('.cards').append(card);
                });
            })
            .fail(function (xhr) {
                toastr.error(xhr.responseJSON.errors[0]);
            });
    }

    load_accounts();

    $('#addContaForm').submit(function (e) {
        e.preventDefault();
        const nomeConta = $('#nomeConta')
        const nomeBanco = $('#nomeBanco')
        const saldoConta = $('#saldoConta')

        $.post('http://127.0.0.1:3000/accounts', { name: nomeConta.val(), bank_name: nomeBanco.val(), initial_balance: saldoConta.val() })
            .done(function (data) {
                toastr.success(data.success[0]);
                $('#addConta').modal('hide')
                $('#addContaForm').reset()
                $('#nomeBanco').val('Selecione')
                load_accounts();
            })
            .fail(function (xhr) {
                toastr.error(xhr.responseJSON.errors[0]);
            });
    })

    prepararEdicao = function (conta_id) {
        $.get(`http://127.0.0.1:3000/accounts/${conta_id}`)
            .done(function (data) {
                $('#editarIdConta').val(data.id)
                $('#editarNomeConta').val(data.name)
                $('#editarNomeBanco').val(data.bank_name)
                $('#editarSaldoConta').val(data.initial_balance)
            })
            .fail(function (xhr) {
                toastr.error(xhr.responseJSON.errors[0]);
            });
    }

    $('#editarContaForm').submit(function (e) {
        e.preventDefault();
        const conta_id = $('#editarIdConta')
        const nomeConta = $('#editarNomeConta')
        const nomeBanco = $('#editarNomeBanco')
        const saldoConta = $('#editarSaldoConta')

        $.ajax({
        url: `http://127.0.0.1:3000/accounts/${conta_id.val()}`, 
        method: 'PUT',
        data: {
            name: nomeConta.val(),
            bank_name: nomeBanco.val(),
            initial_balance: saldoConta.val()
        },
        success: function (data) {
            toastr.success('Conta atualizada com sucesso!');
            $('#editarContaModal').modal('hide');
            $('#addContaForm')[0].reset();
            $('#nomeBanco').val('Selecione');
            load_accounts();
        },
        error: function (xhr) {
            toastr.error(xhr.responseJSON.errors[0]);
        }
    });
    })
})
