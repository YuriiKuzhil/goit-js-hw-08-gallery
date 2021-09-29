const galleryList = document.querySelector('.js-gallery');

const modal = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const backdropModal = document.querySelector('.lightbox__overlay');

const createGalleryItemMarkup = ({ preview, original, description }) => {
  return `<li class="gallery__item">
          <a
            class="gallery__link"
            href="${original}"
          >
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
        `;
};

const arrayOfgalletyImages = galleryItems.map(item => item.original);

const galleryItemsMarkup = galleryItems.map(createGalleryItemMarkup).join('');
galleryList.innerHTML = galleryItemsMarkup;

galleryList.addEventListener('click', openModalWithOriginalImgByClick);
closeModalBtn.addEventListener('click', closeModal);
backdropModal.addEventListener('click', closeModalByClickBackdrop);
document.addEventListener('keydown', changeImageByArrow);

function openModalWithOriginalImgByClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  const originalImageSrc = evt.target.dataset.source;
  const imageDescription = evt.target.alt;

  openModal(originalImageSrc, imageDescription);
}

function closeModal() {
  window.removeEventListener('keydown', closeModalByEsc);
  modal.classList.remove('is-open');
  modalImage.src = '';
  modalImage.alt = '';
}

function openModal(src, alt) {
  window.addEventListener('keydown', closeModalByEsc);
  modal.classList.add('is-open');
  modalImage.src = src;
  modalImage.alt = alt;
}

function closeModalByEsc(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}

function closeModalByClickBackdrop(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal();
  }
}

function changeImageByArrow(evt) {
  const currentIndex = arrayOfgalletyImages.indexOf(modalImage.src);
  if (evt.code === 'ArrowLeft') {
    leftClick(currentIndex);
  } else {
    rightClick(currentIndex);
  }
}

function leftClick(currentIndex) {
  let nextIndex = currentIndex - 1;
  if (nextIndex === -1) {
    nextIndex = arrayOfgalletyImages.length - 1;
  }
  modalImage.src = arrayOfgalletyImages[nextIndex];
}

function rightClick(currentIndex) {
  let nextIndex = currentIndex + 1;
  if (nextIndex === arrayOfgalletyImages.length) {
    nextIndex = 0;
  }
  modalImage.src = arrayOfgalletyImages[nextIndex];
}
