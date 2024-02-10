// search function start
const srcInput = document.querySelector("#srcInput");
const srcBtn = document.querySelector("#srcBtn");
const srcResult = document.querySelector("#srcResult");
const srcList = document.querySelector("#srcList");
// search function end
// firebase start
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookImage = document.querySelector("#bookImage");
const bookDesc = document.querySelector("#bookDesc");
const addBtn = document.querySelector("#addBtn");
const besteller = document.querySelector("#checkbox");
const newchek = document.querySelector("#new");
// book type
const bookTypeList = document.querySelector("#bookTypeList");
let categoryName = '';

// search function start
srcInput.addEventListener("keypress", event =>{
    if(event.key === "Enter"){
        event.preventDefault();
        srcBtn.click()
    }
})


srcBtn.addEventListener("click", function(){
    const title = srcInput.value;
    myPromise(title)
});


async function myPromise(bookTitle){
    try{
        let url = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`;
        const response = await fetch(url);
        const data = await response.json()
      renderItem(data)
    
        srcResult.style.backgroundColor = "#f1f0f0";
        srcResult.style.height = "250px"
    }catch(err){
        console.log(err);
        if(err){srcResult.style.backgroundColor = "#d9534f";
        srcResult.style.height = "100px"
        srcResult.innerHTML = `Book is not found: ${bookTitle}`
    }

    }
}

function renderItem(data){
    const book = data.items
    console.log(book);
    srcList.innerHTML = book.map(item => `
    <button value=${item.id} class="book-btn "><i class="far fa-clock"></i>${item.volumeInfo.title}</button>`).join('');

};


async function getBookByID(BookID){
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${BookID}`)
        const data = await response.json()
        return data
    } catch (err) {
        console.log('err', err);
    }
}




// firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {  getDatabase,
    ref,
    push,
    get,
    remove, } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";



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

// Create
const createData = (path, data) => {
    const newRef = push(ref(database, path), data);
  
    return newRef.key;
  };
  
  function convertData(d) {
    const newData = Object.entries(d);
  
    const myNewData = newData.map((kicikArr) => {
      const newObj = {
        id: kicikArr[0],
        name:kicikArr[1]
      };
  
      return newObj;
    });
  
    return myNewData;
  }
  
  // Read
  const readData = (path) => {
   
  
    const dataRef = ref(database, path);
    return get(dataRef).then((snapshot) => snapshot.val());
  };
  

  


 
    readData("/books")
      .then((data) => {
        const books = convertData(data);
        console.log(books);
       
      })
      .catch((error) => console.error("Error reading data:", error));
  
  srcList.addEventListener("click", async (e)=>{
    e.preventDefault()
    const bookID = e.target.value;
    const bookForm = await getBookByID(bookID);
    
    const title =  bookTitle.value = bookForm.volumeInfo.title
    const author = bookAuthor.value = bookForm.volumeInfo.authors.toString()
    const image = bookImage.value = bookForm.volumeInfo.imageLinks.thumbnail
    const desc = bookDesc.value = bookForm.volumeInfo.description
  
 
   
    newchek.addEventListener("change", (e)=>{
      e.preventDefault()
      const newcheck =e.target.value = e.target.checked
      
      console.log(e.target.value);
         
    besteller.addEventListener("change", (e)=>{
      e.preventDefault()
      const  bestellerbox =  e.target.value = e.target.checked
      console.log(e.target.value);
   
    
    bookTypeList.addEventListener('change',(e)=>{
      e.preventDefault()
      categoryName = e.target.value;
      console.log(categoryName);
  
    const category = categoryName
    srcResult.style.display = 'none'
    srcInput.value = '';
    const book  = {
      title,
      author,
      image,
      desc,
      category,
      newcheck,
      bestellerbox

    }
    addBtn.addEventListener("click", function(e){
     
      e.preventDefault();
      createData("books", book);
      alert("added");
    });   
});
});
});

});

besteller.addEventListener("change", function(e){
  e.target.value = e.target.checked
  console.log(e.target.value);
});

// newchek.addEventListener("change", function(e){
//   e.target.value = e.target.checked
//   console.log(e.target.value);
// });










