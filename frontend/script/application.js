$.ajaxSetup({
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

function formatInputMoney(value) {
    value = value.toString().replace(/[^\d]/g, '');
    value = (parseInt(value) / 100).toFixed(2);
    value = value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return 'R$ ' + value;
}

function formatMoney(value) {
    value = value.toString().replace(/[^\d.-]/g, '');
    value = parseFloat(value).toFixed(2);
    value = value.replace('.', ',');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return 'R$ ' + value;
}

function preencherSelect(selectId, options, placeholderText = 'Selecione uma opção') {
    const select = $(selectId);
    select.empty();

    select.append(new Option(placeholderText, '', true, true)).prop('disabled', true);

    options.forEach(option => {
        select.append(new Option(option.name, option.id));
    });

    select.prop('disabled', false);
}

$(document).ready(function () {
    $('.moneyInput').on('input', function () {
        let value = $(this).val();

        $(this).val(formatInputMoney(value));
    });

    // const token = localStorage.getItem('token');
    // const currentPage = window.location.pathname;

    // const publicPages = ['/index.html', '/cadastro.html', '/esqueceusenha.html', '/'];

    // const protectedPages = ['/dashboard.html', '/contas.html', '/historico-transacoes.html', '/metas.html', '/relatorios.html'];

    // if (token) {
    //     if (publicPages.some(page => currentPage.endsWith(page))) {
    //         window.location.href = '/frontend/dashboard.html';
    //     }
    // } else {
    //     if (protectedPages.some(page => currentPage.endsWith(page))) {
    //         window.location.href = '/frontend/';
    //     }
    // }


    // TRANSAÇõES

    $('#criarTransacao').submit(function (e) {
        e.preventDefault();
        const categoria = $('#selectCategoria').val()
        const conta = $('#selectConta').val()
        const meta = $('#selectMeta').val()
        const valorTransacao = $('#valorTransacao').val().replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
        const tipoTransacao = $('input[name="tipoTransacao"]:checked').val()
        const dataTransacao = $('#dataTransacao').val()


        $.post('http://127.0.0.1:3000/transactions', { category_id: categoria, account_id: conta, goal_id: meta, value: valorTransacao, transaction_type: tipoTransacao, transaction_date: dataTransacao })
            .done(function (data) {
                toastr.success(data.success[0]);
                $('#addModal').modal('hide')
                // Precisa executar algo aqui
            })
            .fail(function (xhr) {
                toastr.error(xhr.responseJSON.errors[0]);
            });
    })


    preparar_transacao = function () {
        $.get('http://127.0.0.1:3000/transactions/load_info')
            .done(function (data) {
                $('#criarTransacao')[0].reset()
                const today = new Date().toLocaleDateString('en-CA');
                $('.data-transacao').val(today);
                preencherSelect('#selectCategoria', data.categories, 'Selecione uma categoria');
                preencherSelect('#selectConta', data.accounts, 'Selecione uma conta');
                preencherSelect('#selectMeta', data.goals, 'Selecione uma meta');

            })
            .fail(function (xhr) {
                toastr.error(xhr.responseJSON.errors[0]);
            });
    }

    $('.mais-icone').click(() => { preparar_transacao() })

});

