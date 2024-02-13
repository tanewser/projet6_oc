/******************* AUTHENTIFICATION DE L'UTILISATEUR *********************/
// SI CONN BON : retour page d'accueil ----- SI CONN X : msg d'erreur

const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", userConnected);

async function userConnected(e) {
  const loginInfo = JSON.stringify({
    email: inputEmail.value,
    password: inputPassword.value,
  });
  e.preventDefault();
  const result = await loginUser(loginInfo);

  if (result) {
    sessionStorage.setItem("token", result);
    window.location = "./index.html";
  } else {
    const msgContainer = document.createElement("span"); //création msg d'erreur
    msgContainer.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
    msgContainer.style.color = "red";
    loginForm.append(msgContainer);
  }
}
