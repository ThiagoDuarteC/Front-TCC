$.ajaxSetup({
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

$(document).ready(function () {

    load_goals = function () {
        $.get('http://127.0.0.1:3000/goals')
            .done(function (data) {
                $('.metas-lista').html('');
                data.forEach((meta) => {
                    let line = `
                        <div class="item-lista" id="${meta.id}" data-bs-toggle="modal" data-bs-target="#atualizarItem">
                            <div class="nome-icone-meta">
                                <div class="d-flex justify-content-center align-items-center rounded-circle" style="width: 64px; height: 64px; background-color: ${meta.background_color}">
                                    <img src="img/${meta.icon_name}.png" style="width: 45px; height: 45px;" class="icone-meta">
                                </div>
                                <div class="gambiarra">
                                    <span class="nome-meta">${meta.name}</span>
                                    <span class="valor-adicionado-acumulado">Acumulado: ${meta.current_value}</span>
                                </div>
                            </div>
                            <span class="valor-meta">${meta.value}</span>
                            <div class="barra-divisora"></div>
                        </div>
                    `;
                    $('.metas-lista').append(line);
                });
            })
            .fail(function (xhr) {
                toastr.error(xhr.responseJSON.errors[0]);
            });
    }

    load_goals();

    $('#addMetaForm').submit(function (e) {
        e.preventDefault();
        const nomeMeta = $('#nomeMeta')
        const descricaoMeta = $('#descricaoMeta')
        const valorMeta = $('#valorMeta')
        const corMeta = $('#corMeta')
        const dataMeta = $('#dataMeta')
        const selectedIcon = $('input[name="icon"]:checked')

        $.post('http://127.0.0.1:3000/goals', { name: nomeMeta.val(), description: descricaoMeta.val(), value: valorMeta.val(), background_color: corMeta.val(), icon_name: selectedIcon.val(), deadline: dataMeta.val() })
            .done(function (data) {
                toastr.success(data.success[0]);
                $('#botaoadd').modal('hide')
                document.getElementById('addMetaForm').reset()
                load_goals();
            })
            .fail(function (xhr) {
                toastr.error(xhr.responseJSON.errors[0]);
            });
    })

    prepararEdicao = function (conta_id) {
        $.get(`http://127.0.0.1:3000/goals/${conta_id}`)
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
            url: `http://127.0.0.1:3000/goals/${conta_id.val()}`,
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
                load_goals();
            },
            error: function (xhr) {
                toastr.error(xhr.responseJSON.errors[0]);
            }
        });
    })

    excluirConta = function (conta_id) {
        if(confirm('Gostaria de excluir a conta?')) {
            $.ajax({
                url: `http://127.0.0.1:3000/goals/${conta_id}`,
                method: 'DELETE',
                success: function (data) {
                    toastr.success('Conta excluida com sucesso!');
                    load_goals();
                },
                error: function (xhr) {
                    toastr.error(xhr.responseJSON.errors[0]);
                }
            });
        }
    }
})
