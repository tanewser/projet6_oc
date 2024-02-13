////////////////// VARIABLES GENERALES ///////////////

let gallery = document.querySelector(".gallery");
let filterContainer = document.getElementById("filters");
//////

//////

//////////////*  filtrer les éléments par images (boutons) */ /////////////

async function displayCategories() {
  const categories = await getCategories();
  makeFilter({ id: null, name: "Tous" });

  for (const category of categories) {
    makeFilter(category);
  }
}
displayCategories();

function makeFilter(category) {
  const filterButton = document.createElement("button");
  filterButton.dataset.categoryId = category.id;
  filterButton.textContent = category.name;
  filterButton.addEventListener("click", showFilteredImg);
  filterContainer.append(filterButton);
}

async function showFilteredImg(e) {
  gallery.innerHTML = ""; // delete all works
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

//////

/******************* AFFICHAGE DE LA GALLERIE *********************/

async function displayGallery() {
  const works = await getWorks();
  gallery.innerHTML = "";
  for (const work of works) {
    displayWork(work);
  }
}

function displayWork(work) {
  gallery.innerHTML += `<figure>
  <img src=${work.imageUrl}>
  <figcaption>${work.title}</figcaption></figure>`;
}

displayGallery(); // appel de la fonction pour afficher la gallerie

//////

//////

//////******************* PAGE LOGIN/LOGOUT *********************/
function isConnected() {
  return sessionStorage.getItem("token") !== null;
}
async function pageConnected() {
  //mode edition + boutons des filtres effacés
  if (isConnected()) {
    const editionContainer = document.querySelector(".edition");
    editionContainer.style.display = "flex";
    filterContainer.style.display = "none";
    const login = document.getElementById("login");
    login.innerText = "logout";

    login.addEventListener("click", logout);
  }
}
pageConnected();

function logout(e) {
  //deconnexion
  e.preventDefault();
  sessionStorage.removeItem("token");
  location.reload();
}
///////

//////
