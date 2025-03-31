document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");
  const campos = formulario.querySelectorAll("input, select, textarea");

  // Recupera dados salvos (se houver)
  campos.forEach((campo) => {
    const chave = campo.id || campo.name; // Usa id ou name como chave
    if (localStorage.getItem(chave)) {
      campo.value = localStorage.getItem(chave);
    }
  });

  // Salva dados no localStorage ao alterar os campos
  campos.forEach((campo) => {
    campo.addEventListener("change", function () {
      const chave = campo.id || campo.name;
      localStorage.setItem(chave, campo.value);
    });
  });

  // Limpa o localStorage ao enviar o formulário
  formulario.addEventListener("submit", function () {
    campos.forEach((campo) => {
      const chave = campo.id || campo.name;
      localStorage.removeItem(chave);
    });
  });
});
