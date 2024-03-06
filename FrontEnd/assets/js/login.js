/******************* AUTHENTIFICATION DE L'UTILISATEUR *********************/
// SI CONN BON : retour page d'accueil ----- SI CONN X : msg d'erreur

////////

///////

///////

//Récupération des champs du formulaire (page login)
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const loginForm = document.querySelector(".login-form");

//Création message en cas d'erreur lors de l'identification
const msgError = document.createElement("span");
loginForm.append(msgError);

//Ajout d'un événement pour se Connecter
loginForm.addEventListener("submit", userConnected);

async function userConnected(e) {
  const loginInfo = JSON.stringify({
    email: inputEmail.value,
    password: inputPassword.value,
  });
  e.preventDefault();
  const result = await loginUser(loginInfo);
  if (result) {
    sessionStorage.setItem("token", result); // connection validée
    window.location = "./index.html";
  } else {
    // connection invalidée : création d'un message d'erreur
    msgError.textContent = "Erreur dans l’identifiant ou le mot de passe";
    msgError.style.color = "red";
    msgError.style.textAlign = "center";
    msgError.classList.add("error-identifiant");

    checkConnexion();
  }

  function checkConnexion() {
    if (inputEmail.value == "" || inputPassword.value == "") {
      // connection invalidée : création d'un message d'erreur
      msgError.textContent = "Veuillez compléter le ou les champs vide.s";
    }
  }
}

/*switch (result) {
    case inputEmail.value == "" || inputPassword.value == "":
      loginForm.disabled = true;
      msgError.innerHTML = "Les champs sont vides";
      break;
    case "wrongID":
      const msgError = document.createElement("span"); // connection invalidée : création d'un message d'erreur
      msgError.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
      msgError.style.color = "red";
      msgError.style.textAlign = "center";
      msgError.classList.add("error-identifiant");
      loginForm.append(msgError);
      break;
    case "connected":
      sessionStorage.setItem("token", result); // connection validée
      window.location = "./index.html";
      break;
  }
}*/

///////
