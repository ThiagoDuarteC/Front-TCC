$.ajaxSetup({
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

console.log(localStorage.getItem('token'))

$('#addContaForm').submit(function (e) {
    e.preventDefault();
    const nomeConta = $('#nomeConta')
    const nomeBanco = $('#nomeBanco')
    const saldoConta = $('#saldoConta')

    $.post('http://127.0.0.1:3000/accounts', { name: nomeConta.val(), bank_name: nomeBanco.val(), initial_balance: saldoConta.val() })
        .done(function (data) {
            toastr.success(data.success[0]);
            $('#addConta').modal('hide')
        })
        .fail(function (xhr) {
            toastr.error(xhr.responseJSON.errors[0]);
        });
})

