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

function formatMoney(value) {
    value = value.replace(/\D/g, '');

    value = (value / 100).toFixed(2)
                        .replace('.', ',')
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return 'R$ ' + value
}

$(document).ready(function() {
    $('.moneyInput').on('input', function() {
        let value = $(this).val();

        $(this).val(formatMoney(value));
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
});

