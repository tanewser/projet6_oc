//////// VARIABLES GENERALES ///////////

let gallery = document.querySelector(".gallery");
let filterContainer = document.getElementById("filters");

//////

//////

//////*  FILTRER LES ELEMENTS PAR IMAGES (boutons-filtre) */////////

//création des boutons de filtres avec leurs noms associés
function makeFilter(category, index) {
  const filterButton = document.createElement("button");
  filterButton.dataset.categoryId = category.id;
  filterButton.dataset.index = index;
  filterButton.textContent = category.name;
  filterButton.addEventListener("click", showFilteredImg);
  filterContainer.append(filterButton);
}

//affichage des boutons de filtre
async function displayCategories() {
  const categories = await getCategories();
  makeFilter({ id: null, name: "Tous" }, 0);
  for (let i = 0; i < categories.length; i++) {
    makeFilter(categories[i], i + 1);
  }
  activeFilter(0);
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
  activeFilter(e.target.dataset.index);
}

function activeFilter(filterIndex) {
  /*const filterButtons = document.querySelectorAll(fi)*/
  const filterButtons = filterContainer.children;
  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].classList.remove("button-green");
  }
  filterButtons[filterIndex].classList.add("button-green");
}

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
