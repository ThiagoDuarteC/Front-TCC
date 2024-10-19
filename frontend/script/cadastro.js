$('form').submit(function (e) {
    e.preventDefault();
    const full_name = $('#full_name')
    const email = $('#email')
    const password = $('#password')

    $.post('http://127.0.0.1:3000/users', { full_name: full_name.val(), email: email.val(), password: password.val() })
        .done(function (data) {
            localStorage.setItem('token', data.token);
            window.location.href = '/frontend/dashboard.html';
        })
        .fail(function (xhr) {
            toastr.error(xhr.responseJSON.errors[0]);
        });
})

