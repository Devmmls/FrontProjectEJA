document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");
  const campos = formulario.querySelectorAll("input, select, textarea");
  const botaoSalvar = document.getElementById("salvebutton");
  const botaoCancelar = document.getElementById("botaoCancelar");
  const botaoInscrever = document.getElementById("botaoInscrever");
  const checkboxTermos = document.getElementById("aceitoTermos");
  const popup = document.querySelector(".popup__wrapper");
  const closeButton = popup.querySelector(".popup__close");
  const trilhaOptions = document.querySelectorAll(
    ".select__option input[type='radio'][name='trilhas']"
  );

  // Recupera o CPF e a senha do usuário logado do armazenamento local (localStorage).
  const cpfDoLogin = localStorage.getItem("cpfUsuarioLogado");
  const senhaDoLogin = localStorage.getItem("senhaUsuarioLogado");
  const cpfNoFormularioInput = document.getElementById("cpf");
  const senhaNoFormularioInput = document.getElementById("senha");
  const camposLoginConfirmacao = document.getElementById(
    "camposLoginConfirmacao"
  );

  let cpfNoFormulario = cpfNoFormularioInput
    ? cpfNoFormularioInput.value
    : null;

  // Controla a exibição da seção de confirmação de login.
  if (camposLoginConfirmacao) {
    if (cpfDoLogin) {
      camposLoginConfirmacao.style.display = "block";
      if (cpfNoFormularioInput) {
        cpfNoFormularioInput.value = cpfDoLogin;
        cpfNoFormularioInput.readOnly = true;
        cpfNoFormulario = cpfDoLogin;
      }
    } else {
      camposLoginConfirmacao.style.display = "none";
    }
  } else {
    console.error(
      'A div com ID "camposLoginConfirmacao" não foi encontrada no HTML.'
    );
  }

  // Salva os dados do formulário no localStorage.
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
      const userData = {};
      campos.forEach((campo) => {
        userData[campo.id || campo.name] = campo.value;
      });

      const chaveDeArmazenamento = cpfDoLogin || userData.cpf;

      if (chaveDeArmazenamento) {
        localStorage.setItem(chaveDeArmazenamento, JSON.stringify(userData));
        alert("Dados do formulário salvos!");
      } else {
        alert("Erro: Não foi possível identificar o CPF do usuário.");
      }
    } else {
      alert(
        "Por favor, preencha todos os campos obrigatórios antes de salvar."
      );
    }
  }

  // Carrega os dados do localStorage e preenche o formulário.
  function carregarDadosLocalStorage() {
    const chaveDeCarregamento =
      cpfDoLogin || (cpfNoFormularioInput ? cpfNoFormularioInput.value : null);

    if (chaveDeCarregamento) {
      const dadosSalvos = localStorage.getItem(chaveDeCarregamento);
      if (dadosSalvos) {
        const userData = JSON.parse(dadosSalvos);
        campos.forEach((campo) => {
          const chave = campo.id || campo.name;
          if (userData.hasOwnProperty(chave)) {
            campo.value = userData[chave];
          }
        });
      }
    }
  }

  carregarDadosLocalStorage();

  // Adiciona listener para salvar os dados.
  if (botaoSalvar) {
    botaoSalvar.addEventListener("click", salvarDadosLocalStorage);
  } else {
    console.error('Botão "Salvar" não encontrado. Verifique o ID no HTML.');
  }

  // Adiciona listener para resetar o formulário.
  if (botaoCancelar) {
    botaoCancelar.addEventListener("click", function (event) {
      formulario.reset();
      event.preventDefault();
    });
  } else {
    console.error('Botão "Cancelar" não encontrado. Verifique o ID no HTML.');
  }

  // Adiciona listener para o processo de inscrição.
  if (botaoInscrever) {
    botaoInscrever.addEventListener("click", function (event) {
      event.preventDefault();

      let requiredInputs = document.querySelectorAll(
        "input[required]:not([type='radio']), textarea[required], select[required]"
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

      let trilhaSelecionada = false;
      trilhaOptions.forEach(function (radio) {
        if (radio.checked) {
          trilhaSelecionada = true;
        }
      });

      if (!trilhaSelecionada) {
        alert(
          "Por favor, selecione a área da tecnologia que você tem interesse em aprender."
        );
        return;
      }

      if (!checkboxTermos.checked) {
        alert("Você precisa aceitar os termos para se inscrever.");
        return;
      }

      if (!allFieldsFilled) {
        alert(
          "Por favor, preencha todos os campos obrigatórios antes de se inscrever."
        );
        return;
      }

      const cpfDoFormulario = cpfNoFormularioInput
        ? cpfNoFormularioInput.value
        : null;
      const senhaDoFormulario = senhaNoFormularioInput
        ? senhaNoFormularioInput.value
        : null;
      const cpfLogado = localStorage.getItem("cpfUsuarioLogado");
      const senhaLogado = localStorage.getItem("senhaUsuarioLogado");

      if (cpfLogado && senhaLogado) {
        if (
          cpfDoFormulario !== cpfLogado ||
          senhaDoFormulario !== senhaLogado
        ) {
          alert(
            "O CPF ou a senha digitada não correspondem aos dados da sua conta. Por favor, verifique."
          );
          return;
        }
      } else {
        alert(
          "Erro: Não foi possível verificar seus dados de login. Por favor, faça login novamente."
        );
        return;
      }

      popup.style.display = "block";
      console.log("Formulário finalizado para o CPF:", cpfLogado);
    });
  } else {
    console.error(
      'Botão "Inscrever-se" não encontrado. Verifique o ID no HTML.'
    );
  }

  // Adiciona listener para fechar o popup.
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      popup.style.display = "none";
    });
  } else {
    console.error("Botão de fechar do popup não encontrado.");
  }

  // Adiciona listener para a submissão do formulário (com validação dos termos).
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!checkboxTermos.checked) {
      alert("Você precisa aceitar os termos para enviar o formulário.");
    }
  });
});
