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

$(document).ready(function () {
    $('.moneyInput').on('input', function () {
        let value = $(this).val();

        $(this).val(formatInputMoney(value));
    });

    //     const token = localStorage.getItem('token');
    //     const currentPage = window.location.pathname;

    //     const publicPages = ['/index.html', '/cadastro.html', '/esqueceusenha.html', '/'];

    //     const protectedPages = ['/dashboard.html', '/contas.html', '/historico-transacoes.html', '/metas.html', '/relatorios.html'];

    //     if (token) {
    //         if (publicPages.some(page => currentPage.endsWith(page))) {
    //             window.location.href = '/frontend/dashboard.html';
    //         }
    //     } else {
    //         if (protectedPages.some(page => currentPage.endsWith(page))) {
    //             window.location.href = '/frontend/';
    //         }
    //     }


    // TRANSAÇõES

    $('#criarTransacao').submit(function (e) {
        e.preventDefault();


        $.post('http://127.0.0.1:3000/transactions', { name: nomeConta.val(), bank_name: nomeBanco.val(), initial_balance: saldoConta.val() })
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

    
    preparar_transacao = function () {
        $.get('http://127.0.0.1:3000/transactions/load_info')
        .done(function (data) {
            console.log(data)
        })
        .fail(function (xhr) {
            toastr.error(xhr.responseJSON.errors[0]);
        });
    }
    
    $('.mais-icone').click(preparar_transacao())

});

