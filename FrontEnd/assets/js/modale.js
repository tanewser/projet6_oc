//////******************* LA MODALE *********************/
const modalContainer = document.querySelector(".modal-container");
const modale1 = document.querySelector(".modale1");
const modale2 = document.querySelector(".modale2");
modalContainer.addEventListener("click", closeModal);
modale1.addEventListener("click", stopPropagation);
modale2.addEventListener("click", stopPropagation);

function stopPropagation(e) {
  e.stopPropagation();
}
function closeModal() {
  modalContainer.classList.add("inactive");
  modale2.classList.add("inactive");
  modale1.classList.remove("inactive");
}

//affichage
function displayModale() {
  if (isConnected()) {
    const modifyButton = document.querySelector(".modifier");
    modifyButton.classList.remove("inactive");
    modifyButton.addEventListener("click", () => {
      modalContainer.classList.remove("inactive");
    });

    const crossMark = document.getElementById("cross-mark");
    crossMark.addEventListener("click", () => {
      modalContainer.classList.add("inactive");
    });
  }
}
displayModale();

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
//Suppression des images
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

//affiche modale 1 apres avoir été sur la modale 2
const arrowLeft = document.getElementById("arrow-left");
arrowLeft.addEventListener("click", returnModale1);
async function returnModale1() {
  modale1.classList.remove("inactive");
  modale2.classList.add("inactive");
}
//affiche la modale 2 pour poster new photos
const buttonAddPhoto = document.querySelector(".button-addphoto");
buttonAddPhoto.addEventListener("click", afficheModale2);

async function afficheModale2() {
  modale1.classList.add("inactive");
  modale2.classList.remove("inactive");
}
//////
/////
//////******** AJOUT DE NOUVELLES PHOTOS DANS LA MODALE ***********/

const imgInput = document.querySelector(".input-file");
const formNewWork = document.querySelector(".form-new-work");
const inputTitle = document.getElementById("titre");
const selectCategory = document.getElementById("categorie");
const miniPictureContainer = document.createElement("div");
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
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.ok) {
    console.log("Le travail a bien été ajouté");
  } else {
    console.error("Erreur lors de l'ajout du nouveau travail");
    console.log(res);
  }
}

imgInput.addEventListener("change", function (e) {
  const newPhotoContainer = document.querySelector(".newphoto-container");
  const Image = imgInput.files[0];
  newPhotoContainer.innerHTML = `<img src="${URL.createObjectURL(Image)}"/>`;
});

formNewWork.addEventListener("submit", postnewWorks);
addCategoryOptions();
async function addCategoryOptions() {
  const categories = await getCategories();
  console.log(categories);
  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    selectCategory.appendChild(option);
  }
}
