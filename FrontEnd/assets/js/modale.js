//////******************* LA MODALE *********************/
const modalContainer = document.querySelector(".modal-container");
const modale1 = document.querySelector(".modale1");
const modale2 = document.querySelector(".modale2");
modalContainer.addEventListener("click", closeModal);
modale1.addEventListener("click", stopPropagation);
modale2.addEventListener("click", stopPropagation);

/////////
/////////

// Page login (connectée) : récupération du token
function isConnected() {
  return sessionStorage.getItem("token") !== null;
}

//affichage de la modale
function displayModale() {
  if (isConnected()) {
    const modifyButton = document.querySelector(".modifier");
    modifyButton.classList.remove("inactive");
    modifyButton.addEventListener("click", () => {
      modalContainer.classList.remove("inactive");
    });
  }
}
displayModale();

/* gallerie des images dans la modale*/
function galleryModal() {
  if (isConnected()) {
    displayGalleryModal();
  }
}
galleryModal();

async function displayGalleryModal() {
  const works = await getWorks();
  const miniGallery = document.querySelector(".mini-gallery");
  miniGallery.innerHTML = "";

  for (const work of works) {
    const miniPictureContainer = document.createElement("div");
    const miniPicture = document.createElement("img");
    miniPicture.classList.add("mini-picture");
    miniPicture.src = work.imageUrl;

    const deleteIcon = document.createElement("i"); //Ajout de l'icone
    deleteIcon.classList.add("fa-trash-can", "fa-solid");
    deleteIcon.dataset.workId = work.id;

    miniPictureContainer.appendChild(miniPicture);
    miniPictureContainer.appendChild(deleteIcon);
    miniGallery.appendChild(miniPictureContainer);

    deleteIcon.addEventListener("click", deleteImg);
  }
}

//Fermeture de la modale
function stopPropagation(e) {
  e.stopPropagation();
}
/* */
const crossMarks = document.querySelectorAll(".cross-mark");
for (let i = 0; i < crossMarks.length; i++) {
  crossMarks[i].addEventListener("click", closeModal);
}
/* */
function closeModal() {
  modalContainer.classList.add("inactive");
  modale2.classList.add("inactive"); //return 1st modal
  modale1.classList.remove("inactive");

  resetForm();
}

//initialiser le formulaire
function resetForm() {
  const emptyInputImage = document.querySelector(".empty-input-image");
  emptyInputImage.classList.remove("inactive");

  const formNewWork = document.querySelector(".form-new-work");
  formNewWork.reset();

  const previewImage = document.querySelector(".preview-image");
  if (previewImage) {
    previewImage.remove();
  }

  const imgInput = document.querySelector(".input-file");
  imgInput.value = "";
  workAdded.innerHTML = "";
  inputTitle.style.borderStyle = "none";
}

//réafficher modale 1 apres avoir été sur la modale 2
const arrowLeft = document.getElementById("arrow-left");
arrowLeft.addEventListener("click", returnModale1);
async function returnModale1() {
  modale1.classList.remove("inactive");
  modale2.classList.add("inactive");
  resetForm();
}
//afficher la modale 2 pour poster new photos
const buttonAddPhoto = document.querySelector(".button-addphoto");
buttonAddPhoto.addEventListener("click", afficheModale2);

async function afficheModale2() {
  modale1.classList.add("inactive");
  modale2.classList.remove("inactive");
}

//////

//////

//////******** SUPPRESSION DES IMAGES ***********/
async function deleteImg(e) {
  const token = sessionStorage.getItem("token");
  const workId = e.target.dataset.workId;
  const res = await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  displayGallery();
  displayGalleryModal();
}
//////

//////

//////******** AJOUT DE NOUVELLES PHOTOS DANS LA MODALE ***********/

const imgInput = document.querySelector(".input-file");
const formNewWork = document.querySelector(".form-new-work");
const inputTitle = document.getElementById("titre");
const selectCategory = document.getElementById("categorie");
const miniPictureContainer = document.createElement("div");
const workAdded = document.createElement("span");
const btnValider = document.querySelector(".btn-valider");
modale2.appendChild(workAdded);
//

formNewWork.addEventListener("submit", postnewWorks);

//

async function postnewWorks(e) {
  e.preventDefault();

  const token = sessionStorage.getItem("token");
  const Image = imgInput.files[0];
  const formData = new FormData();
  formData.append("image", Image);
  formData.append("title", inputTitle.value);
  formData.append("category", selectCategory.value);
  console.log("test :", Image, inputTitle.value, selectCategory.value);
  const res = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });
  if (res.ok == true) {
    console.log("Le travail a bien été ajouté");
    workAdded.textContent = "Votre travail a bien été ajouté";
    workAdded.style.color = "green";
    workAdded.style.textDecoration = "underline";

    inputTitle.style.borderStyle = "none";

    displayGallery();
    displayGalleryModal();
  } else {
    console.log(res);
    checkedForm();
  }
}

//
// Affichage de la nouvelle photo dans le champs input-file
imgInput.addEventListener("change", function (e) {
  const newPhotoContainer = document.querySelector(".newphoto-container");
  const emptyInputImage = document.querySelector(".empty-input-image");
  emptyInputImage.classList.add("inactive");
  const Image = imgInput.files[0];
  newPhotoContainer.innerHTML += `<img src="${URL.createObjectURL(
    Image
  )}" class="preview-image"/>`;
});

//
// Ajout des catégories dans le champs catégorie
addCategoryOptions();
async function addCategoryOptions() {
  const categories = await getCategories();

  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    selectCategory.appendChild(option);
  }
  displayGalleryModal();
  displayGallery();
}

//
// Vérification champs du formulaire : form fields
function checkedForm() {
  if (imgInput.value == "") {
    workAdded.textContent = "Erreur :  il n'y a pas d'image ";
    workAdded.style.color = "red";
  }
}
