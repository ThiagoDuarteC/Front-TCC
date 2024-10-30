// //Início do código que altera a imagem e nome do perfil

// document.getElementById('salvarAlteracoes').addEventListener('click', function() {
//     const nomeUsuario = document.getElementById('nomeUsuario').value;
//     document.getElementById('nomeUsuarioDisplay').textContent = nomeUsuario || 'Usuário';

//     const fotoPerfilInput = document.getElementById('fotoPerfil');
//     if (fotoPerfilInput.files && fotoPerfilInput.files[0]) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//             document.querySelector('.perfil-img').src = e.target.result;
//         };
//         reader.readAsDataURL(fotoPerfilInput.files[0]);
//     }

//     var perfilModalEl = document.querySelector('#perfilModal');
//     var perfilModal = bootstrap.Modal.getInstance(perfilModalEl);
//     if (perfilModal) {
//         perfilModal.hide();
//     } else {
//         new bootstrap.Modal(perfilModalEl).hide();
//     }
// });

// //Fim do código que altera a imagem e nome do perfil

// //Início do código que impede que a data inicial seja maior que a data final

// document.getElementById('filtro-relativo').addEventListener('submit', function(event) {
//     const startDate = new Date(document.getElementById('data-inicial').value);
//     const endDate = new Date(document.getElementById('data-final').value);
    
//     if (startDate > endDate) {
//         alert("A data inicial não pode ser maior que a data final.");
//         document.getElementById('startDate').value = "";
//         document.getElementById('endDate').value = "";
//         event.preventDefault(); // Impede o envio do formulário
//     }
// });

// //Fim do código que impede que a data inicial seja maior que a data final

// //Início do Código que cria categorias para despesas e receitas dentro do modal

// const adicionarCategoriaSpan = document.querySelector('.adicionar-categoria');
// const novaCategoriaInput = document.getElementById('nova-categoria');
// const btnAddCategoria = document.getElementById('btn-add-categoria');
// const categoriaDespesa = document.querySelector('.grid-categorias-despesa');
// const categoriaReceita = document.querySelector('.grid-categorias-receita');

// const btnDespesas = document.getElementById('btn-despesa');
// const btnReceitas = document.getElementById('btn-receita');

// let inputVisivel = false; 

// function formatarTexto(texto) {
//     return texto
//     .normalize('NFD')  // Normaliza caracteres acentuados
//     .replace(/[\u0300-\u036f]/g, '')  // Remove acentos
//     .toLowerCase()  // Converte para minúsculas
//     .replace(/\s+/g, '-');  // Substitui espaços por hífens
// }

// adicionarCategoriaSpan.addEventListener('click', () => {
//     inputVisivel = !inputVisivel; // Alterna o estado de visibilidade
    
//     if (inputVisivel) {
//     novaCategoriaInput.style.display = 'inline-block';
//     btnAddCategoria.style.display = 'inline-block';
//     } else {
//     novaCategoriaInput.style.display = 'none';
//     btnAddCategoria.style.display = 'none';
//     }
// });

// btnAddCategoria.addEventListener('click', () => {
//     const novaCategoriaNome = novaCategoriaInput.value.trim();

//     if (novaCategoriaNome === '') {
//     alert('Por favor, insira um nome para a nova categoria.');
//     return;
//     }

//     const categoriaId = formatarTexto(novaCategoriaNome);  // Formata o texto para id e value

    
//     const novaCategoriaDiv = document.createElement('div');
//     novaCategoriaDiv.classList.add('categoria-opcao');

//     novaCategoriaDiv.innerHTML = `
//     <input type="radio" id="${categoriaId}" name="categoria" value="${categoriaId}">
//     <label for="${categoriaId}">${novaCategoriaNome.charAt(0).toUpperCase() + novaCategoriaNome.slice(1)}</label>
//     `;

   
//     if (btnDespesa.checked) {

//     categoriasDespesa.appendChild(novaCategoriaDiv);
//     } else if (btnReceita.checked) {
   
//     categoriasReceita.appendChild(novaCategoriaDiv);
//     } else {
//     alert('Por favor, selecione se é uma despesa ou receita antes de adicionar a categoria.');
//     return;
//     }

   
//     novaCategoriaInput.value = '';
//     novaCategoriaInput.style.display = 'none';
//     btnAddCategoria.style.display = 'none';
//     inputVisivel = false; // Resetar o estado de visibilidade
// });

// //Fim do Código que cria categorias para despesas e receitas dentro do modal

// //Início do código que alterna entre as categorias de despesa e receita dependendo do que o usuário selecionar

// const btnDespesa = document.getElementById('btn-despesa');
// const btnReceita = document.getElementById('btn-receita');
// const categoriasDespesa = document.querySelector('.grid-categorias-despesa');
// const categoriasReceita = document.querySelector('.grid-categorias-receita');

// function alternarCategorias() {
//     if (btnDespesa.checked) {
//     categoriasDespesa.style.opacity = '1';
//     categoriasDespesa.style.position = 'relative';
//     categoriasReceita.style.opacity = '0';
//     categoriasReceita.style.position = 'absolute';
//     } else if (btnReceita.checked) {
//     categoriasDespesa.style.opacity = '0';
//     categoriasDespesa.style.position = 'absolute';
//     categoriasReceita.style.opacity = '1';
//     categoriasReceita.style.position = 'relative';
//     }
// }

// btnDespesa.addEventListener('change', alternarCategorias);
// btnReceita.addEventListener('change', alternarCategorias);

// window.onload = alternarCategorias;

// //Fim do código que alterna entre as categorias de despesa e receita dependendo do que o usuário selecionar
