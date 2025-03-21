document.addEventListener("DOMContentLoaded", function () {
  // Seleciona o botão de envio do formulário e o popup
  let submitButton = document.querySelector('input[type="submit"]');
  let popup = document.querySelector(".popup__wrapper");

  // Adiciona um evento de clique ao botão de envio
  submitButton.addEventListener("click", function (event) {
    // Verifica se todos os campos obrigatórios estão preenchidos
    let requiredInputs = document.querySelectorAll(
      "input[required], textarea[required], select[required]"
    );
    let allFieldsFilled = true;
    requiredInputs.forEach(function (input) {
      if (input.value.trim() === "") {
        allFieldsFilled = false;
      }
    });

    // Se todos os campos obrigatórios estiverem preenchidos, exibe o popup
    if (allFieldsFilled) {
      popup.style.display = "block";
      // Impede o comportamento padrão do clique no botão de envio
      event.preventDefault();
    }
  });

  // Fecha o popup ao clicar no botão "OK!"
  let closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", function () {
    popup.style.display = "none";
  });
});
