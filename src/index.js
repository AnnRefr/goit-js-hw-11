import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import {fetchPhotos} from "./js/axios";


const ref = {
    inpElem: document.querySelector(".js-input"),
    butElem: document.querySelector(".js-button"),
    gallery: document.querySelector(".js-gallery"),
    loadElem: document.querySelector(".js-load"),
}


ref.loadElem.style.display = 'none';
let page = 1;
let total = 0;

let simplelightbox = new SimpleLightbox('.js-gallery', { 
    captions: true,
    captionsData: "alt",
    captionSelector: "img",
    captionPosition: "bottom"});


ref.butElem.addEventListener("click", onClickButton);
ref.loadElem.addEventListener("click", onLoad)

function onClickButton(e) {
    page = 1;
    total = 0;
    ref.loadElem.style.display = 'none';
    e.preventDefault();
    if (ref.inpElem.value == "") {
        Notiflix.Notify.success('Empty string');
        ref.gallery.innerHTML = "";
        ref.loadElem.style.display = 'none';
        return
    }
    fetchPhotos(ref.inpElem.value)
    .then(data => {
        total = 0;
        total += data.hits.length;
        if (data.total == 0) {
            Notiflix.Notify.success('"Sorry, there are no images matching your search query. Please try again."');
            ref.gallery.innerHTML = "";
        }
        ref.gallery.innerHTML = "";
        ref.gallery.insertAdjacentHTML("beforeend", createMarkupInfo(data.hits));
    })
    .catch(err => {
        Notiflix.Notify.success('Sol lucet omnibus');
        ref.gallery.innerHTML = "";
    })
}

function createMarkupInfo(arr) {
    return arr.map(({ webformatURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height= "200"/>
    <div class="info">
    <p class="info-item">
    <b>Likes
    </b>${likes}
    </p>
    <p class="info-item">
    <b>Views
    </b>${views}
    </p>
    <p class="info-item">
    <b>Comments
    </b>${comments}
    </p>
    <p class="info-item">
    <b>Downloads
    </b>${downloads}
    </p>
    </div>
    </div>`).join(" ");
}

function onLoad() {
    page += 1;
    ref.loadElem.style.display = 'none';
    fetchPhotos(ref.inpElem.value, page)
        .then(data => {
            total += data.hits.length;
            if (data.total == 0) {
                Notiflix.Notify.success("Sorry, there are no images matching your search query. Please try again.");
                ref.gallery.innerHTML = "";
            }
        })
        .catch(err => {
            Notiflix.Notify.success('Sol lucet omnibus');
            ref.gallery.innerHTML = "";
        })
}





