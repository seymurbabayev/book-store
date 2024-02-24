const aboutBookTitle = document.querySelector("#aboutBookTitle");
const aboutBookImage = document.querySelector("#aboutBookImage");
const aboutBookDesc = document.querySelector("#aboutBookDesc");
const aboutAddBtn = document.querySelector("#aboutAddBtn");
const aboutArea = document.querySelector("#aboutArea");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getDatabase,
    ref,
    get,
    set,
    push,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDGsqCFzK968Iw30ccw_sa63MJ71JH8Ask",
    authDomain: "library-bookstore-47573.firebaseapp.com",
    databaseURL: "https://library-bookstore-47573-default-rtdb.firebaseio.com",
    projectId: "library-bookstore-47573",
    storageBucket: "library-bookstore-47573.appspot.com",
    messagingSenderId: "241881115117",
    appId: "1:241881115117:web:87741476f3375fded59fe4",
    measurementId: "G-TNGEJRZG18",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseapp);

function writeSetData(path, data) {
    const setKey = set(ref(database, path), data);
    console.log(setKey.key);
    return setKey.key;
}

const readData = (path) => {
    const dataRef = ref(database, path);
    return get(dataRef).then((snapshot) => snapshot.val());
};

aboutAddBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    const aboutTitle = aboutBookTitle.value;
    const aboutImage = aboutBookImage.value;
    const aboutDesc = aboutBookDesc.value;
    const form = {
        aboutTitle,
        aboutImage,
        aboutDesc,
    };

    writeSetData("/about", form);
    alert("Added");

    aboutBookTitle.value = ''
    aboutBookImage.value = ''
    aboutBookDesc.value = ''

    console.log(form);
});

function renderAbout(obj) {
    console.log(obj);
    aboutArea.innerHTML = `<div class="about_page">
      <div class="about_paragraph" >
        <h1 class="about_title">${obj.aboutTitle}</h1>
        <p class="about_text">${obj.aboutDesc}</p>
      </div>
      <div class="about_img">
        <img src="${obj.aboutImage}" width="90%"/>
      </div>
  </div>`;
}

window?.addEventListener("load", function () {
    const loader = document.querySelector(".loader-container");
    loader.style.display = "flex";

    readData("/about")
        .then((data) => {
            renderAbout(data);
            loader.style.display = "none";
        })
        .catch((error) => console.error("Error reading data:", error));
});
