const aboutBookTitle = document.querySelector("#aboutBookTitle");
const aboutBookImage = document.querySelector("#aboutBookImage");
const aboutBookDesc = document.querySelector("#aboutBookDesc");
const aboutAddBtn = document.querySelector("#aboutAddBtn");
const aboutArea = document.querySelector("#aboutArea");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {  getDatabase, ref, get, set, push  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
// import { createData } from "./firebase";


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


const create = (path, data) => {
  const newRef = push(ref(database, path), data);

  return newRef.key;
};

const readData = (path) => {
   
  
  const dataRef = ref(database, path);
  return get(dataRef).then((snapshot) => snapshot.val());
};
function convertData(d) {
  const newData = Object.entries(d);

  const myNewData = newData.map((kicikArr) => {
    const newObj = {
      id: kicikArr[0],
      ...kicikArr[1]
    };

    return newObj;
  });

  return myNewData;
}
readData("/about")
.then((data) =>{
  const desc = convertData(data);
  renderAbout(desc);
})
.catch((error) => console.error("Error reading data:", error));


aboutAddBtn?.addEventListener("click", function(e){
  e.preventDefault()
  const aboutTitle = aboutBookTitle.value='';
  const aboutImage = aboutBookImage.value='';
  const aboutDesc = aboutBookDesc.value='';
  const form = {
    aboutTitle,
    aboutImage,
    aboutDesc 
  }
  

create("/about", form)
alert("Added")
console.log(form);
  
})


function renderAbout (list){
aboutArea.innerHTML = list.map(item =>
  `<div class="about_page">
  <div class="about_paragraph" >
      <h1 class="about_title">${item.aboutTitle}</h1>
      <p class="about_text">
      ${item.aboutDesc}
      </p>
  </div>
  <div class="about_img">

 <img src="${item.aboutImage}" width="90%"/>
  </div>
</div>`).join("")
}














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
