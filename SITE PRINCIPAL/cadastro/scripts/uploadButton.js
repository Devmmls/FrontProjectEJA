document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");
  const fileInputs = document.querySelectorAll('input[type="file"]');

  // Adiciona um evento change para cada input file
  fileInputs.forEach(function (fileInput) {
    const uploadIcon = document.querySelector(
      `label[for="${fileInput.id}"] img`
    );
    const validationMessage = fileInput.nextElementSibling;

    fileInput.addEventListener("change", function () {
      if (this.files.length > 0) {
        if (uploadIcon) {
          uploadIcon.src = "./assets/uploadDone.svg";
        }
        if (
          validationMessage &&
          validationMessage.classList.contains("file-validation-msg")
        ) {
          validationMessage.style.display = "none";
        }
      } else {
        if (uploadIcon) {
          uploadIcon.src = "./assets/uploadFile.svg";
        }
        if (
          validationMessage &&
          validationMessage.classList.contains("file-validation-msg")
        ) {
          validationMessage.style.display = "inline-block";
        }
      }
      checkRequiredFields();
    });
  });

  // Adiciona evento de reset ao formulário
  formulario.addEventListener("reset", function () {
    fileInputs.forEach(function (fileInput) {
      const uploadIcon = document.querySelector(
        `label[for="${fileInput.id}"] img`
      );
      const validationMessage = fileInput.nextElementSibling;
      if (uploadIcon) {
        uploadIcon.src = "./assets/uploadFile.svg";
      }
      if (
        validationMessage &&
        validationMessage.classList.contains("file-validation-msg")
      ) {
        validationMessage.style.display = "none";
      }
    });
    checkRequiredFields();
  });

  // Adiciona evento de submit para verificar campos de arquivo
  formulario.addEventListener("submit", function (event) {
    let allFieldsFilled = true;
    const requiredFields = document.querySelectorAll("[required]");

    requiredFields.forEach(function (field) {
      const isFile = field.type === "file";
      const isEmpty = field.value.trim() === "" && !isFile;
      const isFileEmpty = isFile && field.files.length === 0;
      const errorElement = field.nextElementSibling;

      if (isEmpty || isFileEmpty) {
        allFieldsFilled = false;
        if (
          errorElement &&
          !errorElement.classList.contains("file-validation-msg")
        ) {
          errorElement.style.display = "inline-block";
        }
      } else {
        if (errorElement) {
          errorElement.style.display = "none";
        }
      }

      if (isFile && isFileEmpty && field.hasAttribute("required")) {
        if (
          errorElement &&
          errorElement.classList.contains("file-validation-msg")
        ) {
          errorElement.style.display = "inline-block";
        }
        allFieldsFilled = false;
      }
    });

    if (!allFieldsFilled) {
      event.preventDefault();
    }
  });

  // Função para verificar se todos os campos obrigatórios estão preenchidos (principalmente para feedback visual)
  function checkRequiredFields() {
    const requiredFields = document.querySelectorAll("[required]");

    requiredFields.forEach(function (field) {
      const isFile = field.type === "file";
      const isEmpty = field.value.trim() === "" && !isFile;
      const isFileEmpty = isFile && field.files.length === 0;
      const errorElement = field.nextElementSibling;

      if (isEmpty || isFileEmpty) {
        if (
          errorElement &&
          !errorElement.classList.contains("file-validation-msg")
        ) {
          errorElement.style.display = "inline-block";
        } else if (
          isFileEmpty &&
          errorElement &&
          errorElement.classList.contains("file-validation-msg")
        ) {
          errorElement.style.display = "inline-block";
        }
      }
    });
  }

  checkRequiredFields();

  // Adiciona um ouvinte de evento para cada campo obrigatório para verificar em tempo real (feedback visual)
  const allRequiredFields = document.querySelectorAll("[required]");
  allRequiredFields.forEach(function (field) {
    field.addEventListener("input", checkRequiredFields);
    if (field.type === "checkbox") {
      field.addEventListener("change", checkRequiredFields);
    }
  });
});
