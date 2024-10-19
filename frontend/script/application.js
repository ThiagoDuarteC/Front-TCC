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

// $(document).ready(function() {
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
// });

