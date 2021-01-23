import images from "./gallery-items.js";

const ref = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  closeBtn: document.querySelector(".lightbox__button"),
  lightboxСontent: document.querySelector(".lightbox__content"),
  lightboxImage: document.querySelector(".lightbox__image"),
  body: document.querySelector("body"),
};

const createGallItem = function ({ preview, original, description }) {
  const item = document.createElement("li");
  item.classList.add("gallery__item");
  ref.gallery.append(item);
  const link = document.createElement("a");
  link.classList.add("gallery__link");
  link.setAttribute("href", `${original}`);
  item.append(link);
  const image = document.createElement("img");
  image.classList.add("gallery__image");
  image.setAttribute("src", `${preview}`);
  image.setAttribute("data-source", `${original}`);
  image.setAttribute("alt", `${description}`);
  link.appendChild(image);
};

images.forEach((imgInformation) => {
  createGallItem(imgInformation);
});

const showModal = function (event) {
  event.preventDefault();
  if (event.target.tagName === "UL") {
    console.log("Клик мимо картинки");
  } else {
    ref.lightbox.classList.add("is-open");
    ref.lightboxСontent.classList.add("is-open");
    ref.lightboxСontent.classList.add("lightbox");
    ref.lightboxImage.setAttribute("src", `${event.target.dataset.source}`);
    ref.lightboxImage.setAttribute("alt", `${event.target.alt}`);
  }
};
const closeModal = function () {
  ref.lightbox.classList.remove("is-open");
  ref.lightboxСontent.classList.remove("is-open");
  ref.lightboxСontent.classList.remove("lightbox");
  ref.lightboxImage.setAttribute("src", "");
};
const lightboxClick = function (event) {
  if (event.target.className === "lightbox__content is-open lightbox") {
    closeModal();
    return;
  }
  if (event.target.className === "lightbox__button") {
    closeModal();
    return;
  } else {
    console.log(`${event.target.alt}`);
    return;
  }
};

ref.gallery.addEventListener("click", showModal);
ref.lightbox.addEventListener("click", lightboxClick);
document.addEventListener("keydown", (event) => {
  let currentImage = "";
  let currentImageIndex = 0;
  let nextImage = "";
  let nextImageIndex = 0;
  if (event.code === "Escape") {
    closeModal();
  }
  if (
    event.code === "ArrowRight" &&
    ref.lightbox.classList.contains("is-open")
  ) {
    currentImage = `${ref.lightboxImage.src}`;
    images.forEach((img) => {
      if (img.original === currentImage) {
        currentImageIndex = images.indexOf(img);
        if (currentImageIndex + 1 >= images.length) {
          alert("Вы посмотрели все фото и картинки в данной галереи!");
          closeModal();
        } else {
          nextImage = images[images.indexOf(img) + 1].original;
          ref.lightboxImage.setAttribute("src", `${nextImage}`);
        }
      }
    });
  }
  if (
    event.code === "ArrowLeft" &&
    ref.lightbox.classList.contains("is-open")
  ) {
    currentImage = `${ref.lightboxImage.src}`;
    images.forEach((img) => {
      if (img.original === currentImage) {
        currentImageIndex = images.indexOf(img);
        if (currentImageIndex - 1 === -1) {
          currentImage = images[images.length - 1].original;
        } else {
          nextImage = images[images.indexOf(img) - 1].original;
          ref.lightboxImage.setAttribute("src", `${nextImage}`);
        }
      }
    });
  }
});
