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
                data.goals.forEach((meta) => {
                    let line = `
                        <div class="item-lista" id="${meta.id}">
                            <div class="nome-icone-meta">
                                <div class="d-flex justify-content-center align-items-center rounded-circle" style="width: 60px; height: 60px; background-color: ${meta.background_color}">
                                    <i class="fas ${meta.icon_name}" style="font-size: 28px" class="icone-meta"></i>
                                </div>
                                <div class="gambiarra">
                                    <span class="nome-meta">${meta.name}</span>
                                    <span class="valor-adicionado-acumulado">Acumulado: ${formatMoney(meta.balance)}</span>
                                </div>
                            </div>
                            <span class="valor-meta">${formatMoney(meta.value)}</span>
                            <div>
                                <i class="fa-solid fa-pen blue-color me-2" alt="Opções" data-bs-toggle="modal" data-bs-target="#atualizarItem" onclick="prepararEdicao(${meta.id})" role="button"></i>
                                <i class="fa-solid fa-trash blue-color" onclick="excluirMeta(${meta.id})" role="button"></i>
                            </div>
                            <div class="barra-divisora"></div>
                        </div>
                    `;
                    $('.metas-lista').append(line);
                });

                $('.receita-valor').text(formatMoney(data.total_balance))
                $('.expectativa-valor').text(formatMoney(data.total_goals))
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
        const corMeta = $('#corMeta')
        const dataMeta = $('#dataMeta')
        const iconMeta = $('input[name="iconMeta"]:checked')
        const valorMeta = $('#valorMeta').val().replace('R$', '').replace(/\./g, '').replace(',', '.').trim();

        $.post('http://127.0.0.1:3000/goals', {
            name: nomeMeta.val(),
            description: descricaoMeta.val(),
            value: valorMeta,
            background_color: corMeta.val(),
            icon_name: iconMeta.val(),
            deadline: dataMeta.val()
        })
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

    prepararEdicao = function (meta_id) {
        $.get(`http://127.0.0.1:3000/goals/${meta_id}`)
            .done(function (data) {
                $('#editarIdMeta').val(data.id)
                $('#novoNomeMeta').val(data.name)
                $('#novaDescricaoMeta').val(data.description)
                $('#novaCorMeta').val(data.background_color)
                $('#novaDataMeta').val(data.deadline)
                $(`input[name="novoIconMeta"][value="${data.icon_name}"]`).prop('checked', true);
                $('#novoValorMeta').val(formatMoney(data.value))
            })
            .fail(function (xhr) {
                toastr.error(xhr.responseJSON.errors[0]);
            });
    }

    $('#editarMetaForm').submit(function (e) {
        e.preventDefault();
        const meta_id = $('#editarIdMeta')
        const nomeMeta = $('#novoNomeMeta')
        const descricaoMeta = $('#novaDescricaoMeta')
        const corMeta = $('#novaCorMeta')
        const dataMeta = $('#novaDataMeta')
        const iconMeta = $('input[name="novoIconMeta"]:checked')
        const valorMeta = $('#novoValorMeta').val().replace('R$', '').replace(/\./g, '').replace(',', '.').trim();

        $.ajax({
            url: `http://127.0.0.1:3000/goals/${meta_id.val()}`,
            method: 'PUT',
            data: {
                name: nomeMeta.val(),
                description: descricaoMeta.val(),
                value: valorMeta,
                background_color: corMeta.val(),
                icon_name: iconMeta.val(),
                deadline: dataMeta.val()
            },
            success: function (data) {
                toastr.success('Meta atualizada com sucesso!');
                $('#atualizarItem').modal('hide');
                $('#addMetaForm')[0].reset();
                load_goals();
            },
            error: function (xhr) {
                toastr.error(xhr.responseJSON.errors[0]);
            }
        });
    })

    excluirMeta = function (meta_id) {
        if (confirm('Gostaria de excluir a meta?')) {
            $.ajax({
                url: `http://127.0.0.1:3000/goals/${meta_id}`,
                method: 'DELETE',
                success: function (data) {
                    toastr.success('Meta excluida com sucesso!');
                    load_goals();
                },
                error: function (xhr) {
                    toastr.error(xhr.responseJSON.errors[0]);
                }
            });
        }
    }
})
