const allBooks = document.querySelector("#allBooks")

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
function writeSetData(path, data){
  const setKey = set(ref(database, path), data);
  return setKey.key

}

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
readData("/books")
.then((data) =>{
  const desc = convertData(data);
  renderAllBooks(desc);
})
.catch((error) => console.error("Error reading data:", error));


function renderAllBooks(list){
    allBooks.innerHTML = list.map(item =>
        `<div class="catalog_box_item">
        <img src="${item.image}" alt="">
        <span>New</span>
        <h5>Konstantin Koptelov</h5>
        <a href="../pages/book.html" >Read more</a>
    </div>`).join("")
}















