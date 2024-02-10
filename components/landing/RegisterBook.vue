<script setup>
const config = useRuntimeConfig()
import axios from 'axios';
onMounted(() => {
  const form = document.getElementById('form');
  const title = form.querySelector('input[name="title"]');
  const result = document.getElementById('result');

  //create a function to reset the result message and classes to default
  function resetResult() {
    result.style = '';
    result.classList.remove('text-green-500');
    result.classList.remove('text-red-500');
    result.innerHTML = '';
    //reset the is-invalid class from all inputs
    form.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
  }
  //create a function to put a message in result and show it, needs to have a parameter to when the message is an error or not
  function setResult(message, isError) {
    result.style = 'flex justify-center items-center';
    result.classList.add(isError ? 'text-red-500' : 'text-green-500');
    result.innerHTML = message;
  }

  form.addEventListener('submit', function (e) {
    resetResult();
    e.preventDefault();
    //validate if the year is a number
    if(isNaN(form.querySelector('input[name="year"]').value)){
      form.querySelector('input[name="year"]').classList.add('is-invalid');
      form.querySelector('input[name="year"]').focus();
      //show a message saying that the year must be a number
      setResult("O ano de impressão deve ser um número!", true);
      return;
    }
    form.classList.add('was-validated');
    if (!form.checkValidity()) {
      form.querySelectorAll(':invalid')[0].focus();
      return;
    }
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = 'Publicando...';

    console.log('JSON', json)
    const options = {
      method: 'POST',
      url: `${config.public.baseUrl}/biblioteca`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        titulo: object.title,
        autor: object.author,
        editora: object.publisher,
        isbn: object.isbn,
        anoDeImpressao: object.year,
        observacao: object.observation,
      },
    };
    
    let errored = false;
    axios
      .request(options)
      .then(function (response) {
        result.style=""
        if( response.status == 201) {
          result.style=""
          result.classList.add('text-green-500');
          result.innerHTML = "Livro Registrado";
        } else {
          result.style="flex justify-center items-center"
          result.classList.add('text-red-500');
          result.innerHTML = "Algo deu errado!";
        }
      })
      .catch(function (error) {
        console.log(error);
        setResult("Algo deu errado!", true);
        errored = true;
      }).then(function () {
        title.focus();
        if(!errored) form.reset();
        errored = false;
        form.classList.remove('was-validated');
        setTimeout(() => {
          result.style.display = 'none';
        }, 5000);
      });
  });
});
</script>

<template>
  <!-- To make this contact form work, create your free access key from https://web3forms.com/
     Then you will get all form submissions in your email inbox. -->
     <!-- //action="https://api.web3forms.com/submit" -->
  <form  method="POST" id="form" class="needs-validation" novalidate>
    <!-- Criar formulário para cadastrar livros, deve haver os seguites campos: TÍTULO,AUTOR,EDITORA,ISBN,ANO DE IMPRESSÃO,OBSERVAÇÃO -->
    <div class="mb-5">
      <input
        type="text"
        placeholder="Título"
        required
        class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
        name="title"
      />
      <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">Por favor, informe o título do livro.</div>
    </div>
    <div class="mb-5">
      <input
        type="text"
        placeholder="Autor"
        required
        class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
        name="author"
      />
      <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">Por favor, informe o autor do livro.</div>
    </div>
    <div class="mb-5">
      <input
        type="text"
        placeholder="Editora"
        required
        class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
        name="publisher"
      />
      <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">Por favor, informe a editora do livro.</div>
    </div>
    <div class="mb-5">
      <input
        type="text"
        placeholder="ISBN"
        required
        class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
        name="isbn"
      />
      <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">Por favor, informe o ISBN do livro.</div>
    </div>
    <div class="mb-5">
      <input
        type="text"
        placeholder="Ano de Impressão"
        required
        class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
        name="year"
      />
      <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">Por favor, informe o ano de impressão do livro.</div>
    </div>
    <div class="mb-5">
      <input
        type="text"
        placeholder="Observação"
        required
        class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
        name="observation"
      />
      <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">Por favor, informe a observação do livro.</div>
    </div>
    <!-- Criar botão para cadastrar os livros -->
    <LandingButton type="submit" size="lg" block>Cadastrar Livro</LandingButton>
    <div id="result" class="mt-3 text-center"></div>
  </form>
</template>

<style>
.invalid-feedback,
.empty-feedback {
  display: none;
}

.was-validated :placeholder-shown:invalid ~ .empty-feedback {
  display: block;
}

.was-validated :not(:placeholder-shown):invalid ~ .invalid-feedback {
  display: block;
}

.is-invalid,
.was-validated :invalid {
  border-color: #dc3545;
}
</style>
