let isLogin = true;
function toggleForm() {
  const formTitle = document.getElementById("formTitle");
  const formButton = document.querySelector("button");
  const toggleText = document.querySelector(".toggle");
  const cpfInput = document.getElementById("cpf");
  const passwordInput = document.getElementById("password");
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Cadastro";
  formButton.textContent = isLogin ? "Entrar" : "Cadastrar";
  toggleText.textContent = isLogin
    ? "Não tem uma conta? Cadastre-se"
    : "Já tem uma conta? Faça login";
  cpfInput.value = "";
  passwordInput.value = "";
}
document.getElementById("cpf").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  e.target.value = value;
});
document.getElementById("authForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const cpf = document.getElementById("cpf").value;
  const password = document.getElementById("password").value;
  if (!/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/.test(cpf)) {
    alert("Digite um CPF válido no formato XXX.XXX.XXX-XX");
    return;
  }
  const cpfExists = localStorage.getItem(cpf) !== null;
  if (isLogin) {
    if (!cpfExists) {
      alert("CPF não encontrado. Por favor, cadastre-se primeiro.");
      return;
    }
    const storedUser = JSON.parse(localStorage.getItem(cpf));
    if (storedUser.password === password) {
      localStorage.setItem("cpfUsuarioLogado", cpf);
      localStorage.setItem("senhaUsuarioLogado", password);
      window.location.href = "formulario.html";
    } else {
      alert("Senha incorreta.");
    }
  } else {
    if (cpfExists) {
      alert("CPF já cadastrado.");
    } else {
      localStorage.setItem(cpf, JSON.stringify({ password }));
      alert("Cadastro realizado com sucesso!");
      toggleForm();
    }
  }
});
