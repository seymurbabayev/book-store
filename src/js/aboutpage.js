// import{writeSetData,  createData }from "firebase.js"


const aboutBookTitle = document.querySelector("#aboutBookTitle");
const aboutBookImage = document.querySelector("#aboutBookImage");
const aboutBookDesc = document.querySelector("#aboutBookDesc");
const aboutAddBtn = document.querySelector("#aboutAddBtn");
console.log(aboutBookTitle);

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {  getDatabase, ref, push, set, get, update, remove, } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
// import { getAuth, signInWithEmailAndPassword, signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDGsqCFzK968Iw30ccw_sa63MJ71JH8Ask",
  authDomain: "library-bookstore-47573.firebaseapp.com",
  databaseURL: "https://library-bookstore-47573-default-rtdb.firebaseio.com",
  projectId: "library-bookstore-47573",
  storageBucket: "library-bookstore-47573.appspot.com",
  messagingSenderId: "241881115117",
  appId: "1:241881115117:web:87741476f3375fded59fe4",
  measurementId: "G-TNGEJRZG18"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseapp);
// const auth = getAuth(firebaseapp);

function writeSetData(path, data){
  const setKey = set(ref(database, path), data);
  return setKey.key

}

aboutAddBtn.addEventListener("click", function(e){
  e.preventDefault()
  const aboutTitle = aboutBookTitle.value;
  const aboutImage = aboutBookImage.value;
  const aboutDesc = aboutBookDesc.value;
  const form = {
    aboutTitle,
    aboutImage,
    aboutDesc 
  }
  

writeSetData("/about", form)
alert("added")
  
})













// function aboutRender() {
//   let aboutContent = document.querySelector(".about_page");
//   onValue(aboutStore, (snapshot) => {
//     const aboutData = snapshot.val();
//     let aboutItem = [aboutData]
//       .map(
//         (item) =>
//           `<div class="about_paragraph">
//               <h1 class="about_title">${item.Title}</h1>
//               <p class="about_text">${item.Desc}</p>
//           </div>
//           <div class="about_img">
//               <img src="${item.BookUrl}" alt="About Book" />
//           </div>`
//       )
//       .join("");
//     aboutContent.innerHTML = aboutItem;
//   });
// }

// aboutRender();
