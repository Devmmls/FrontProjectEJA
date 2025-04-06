document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");
  const campos = formulario.querySelectorAll("input, select, textarea");
  const botaoSalvar = document.getElementById("salvebutton");
  const botaoCancelar = document.getElementById("botaoCancelar");
  const botaoInscrever = document.getElementById("botaoInscrever");
  const checkboxTermos = document.getElementById("aceitoTermos");
  const popup = document.querySelector(".popup__wrapper");
  const closeButton = popup.querySelector(".popup__close");

  // Função para salvar os dados no localStorage com validação
  function salvarDadosLocalStorage() {
    const camposObrigatorios = formulario.querySelectorAll("[required]");
    let todosPreenchidos = true;

    camposObrigatorios.forEach((campo) => {
      if (campo.value.trim() === "") {
        todosPreenchidos = false;
      }
      if (campo.type === "file" && campo.files.length === 0) {
        todosPreenchidos = false;
      }
    });

    if (todosPreenchidos) {
      campos.forEach((campo) => {
        const chave = campo.id || campo.name;
        if (chave) {
          try {
            localStorage.setItem(chave, campo.value);
          } catch (error) {
            console.error("Erro ao salvar no Local Storage:", error);
            alert("Ocorreu um erro ao salvar os dados localmente.");
          }
        }
      });
      alert("Dados salvos localmente!");
    } else {
      alert(
        "Por favor, preencha todos os campos obrigatórios antes de salvar."
      );
    }
  }

  // Função para carregar os dados do localStorage
  function carregarDadosLocalStorage() {
    campos.forEach((campo) => {
      const chave = campo.id || campo.name;
      if (chave) {
        try {
          const valorSalvo = localStorage.getItem(chave);
          if (valorSalvo !== null) {
            campo.value = valorSalvo;
          }
        } catch (error) {
          console.error("Erro ao carregar do Local Storage:", error);
        }
      }
    });
  }

  carregarDadosLocalStorage();

  // Adicionar um ouvinte de evento para o clique no botão "Salvar"
  if (botaoSalvar) {
    botaoSalvar.addEventListener("click", salvarDadosLocalStorage);
  } else {
    console.error('Botão "Salvar" não encontrado. Verifique o ID no HTML.');
  }

  // Adiciona eventos de clique para os botões "Cancelar" e "Inscrever-se"
  if (botaoCancelar) {
    botaoCancelar.addEventListener("click", function (event) {
      formulario.reset();
      event.preventDefault();
    });
  } else {
    console.error('Botão "Cancelar" não encontrado. Verifique o ID no HTML.');
  }

  if (botaoInscrever) {
    botaoInscrever.addEventListener("click", function (event) {
      let requiredInputs = document.querySelectorAll(
        "input[required], textarea[required], select[required]"
      );
      let allFieldsFilled = true;
      requiredInputs.forEach(function (input) {
        if (input.value.trim() === "") {
          allFieldsFilled = false;
        }
        if (input.type === "file" && input.files.length === 0) {
          allFieldsFilled = false;
        }
      });

      if (!checkboxTermos.checked) {
        alert("Você precisa aceitar os termos para se inscrever.");
        event.preventDefault();
        return;
      }

      if (allFieldsFilled) {
        popup.style.display = "block";
        event.preventDefault();
      } else {
        alert(
          "Por favor, preencha todos os campos obrigatórios antes de se inscrever."
        );
      }
    });
  } else {
    console.error(
      'Botão "Inscrever-se" não encontrado. Verifique o ID no HTML.'
    );
  }

  // Fecha o popup ao clicar no botão "OK!"
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      popup.style.display = "none";
    });
  } else {
    console.error("Botão de fechar do popup não encontrado.");
  }

  // Mantém a verificação do checkbox no submit do formulário como uma segurança extra
  formulario.addEventListener("submit", function (event) {
    if (!checkboxTermos.checked) {
      event.preventDefault();
      alert("Você precisa aceitar os termos para enviar o formulário.");
    }
  });

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
  });
});
