//////// VARIABLES GENERALES ///////////

let gallery = document.querySelector(".gallery");
let filterContainer = document.getElementById("filters");

//////

//////

//////*  FILTRER LES ELEMENTS PAR IMAGES (boutons-filtre) */////////

//création des boutons de filtres avec leurs noms associés
function makeFilter(category) {
  const filterButton = document.createElement("button");
  filterButton.dataset.categoryId = category.id;
  filterButton.textContent = category.name;
  filterButton.addEventListener("click", showFilteredImg);
  filterContainer.append(filterButton);
  filterButton.classList.add("button-green");
}

//affichage des boutons de filtre
async function displayCategories() {
  const categories = await getCategories();
  makeFilter({ id: null, name: "Tous" });

  for (const category of categories) {
    makeFilter(category);
  }
}

displayCategories();

//Filtrer les images par catégorie
async function showFilteredImg(e) {
  gallery.innerHTML = ""; // suppression tous les travaux (works)
  const works = await getWorks();

  for (const work of works) {
    if (
      e.target.dataset.categoryId == work.categoryId ||
      e.target.dataset.categoryId == "null"
    ) {
      displayWork(work);
    }
  }
}

//let filterIndex = 1;
/*function activeFilter(filterIndex) {
  for (let i = 0; i < filterButton.length; i++) {
    filterButton[i].classList.remove("button-green");
  }
  filterButton[filterIndex].classList.add("button-green");
}*/

///////******************* AFFICHAGE DE LA GALLERIE D'IMAGE (homepage) ****************////////

//assigner pour chaque image son contenu html
function displayWork(work) {
  gallery.innerHTML += `<figure>
  <img src=${work.imageUrl}>
  <figcaption>${work.title}</figcaption></figure>`;
}
//fonctionnement des images html
async function displayGallery() {
  const works = await getWorks();
  gallery.innerHTML = "";
  for (const work of works) {
    displayWork(work);
  }
}
// appel de la fonction pour afficher la gallerie (homepage)
displayGallery();

//////

//////

//////******************* PAGE LOGIN/LOGOUT *********************/
// Récupération du token
function isConnected() {
  return sessionStorage.getItem("token") !== null;
}

// Style page connectée : mode edition + boutons des filtres effacés + logout
async function pageConnected() {
  if (isConnected()) {
    const editionContainer = document.querySelector(".edition");
    const login = document.getElementById("login");

    editionContainer.style.display = "flex";
    filterContainer.style.display = "none";
    login.innerText = "logout";
    login.addEventListener("click", logout);
  }
}
pageConnected();

// Déconnexion
function logout(e) {
  e.preventDefault();
  sessionStorage.removeItem("token");
  location.reload();
}
////////////////////////////////////////////////////
