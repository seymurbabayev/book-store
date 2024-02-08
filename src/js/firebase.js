// search function start
const srcInput = document.querySelector("#srcInput");
const srcBtn = document.querySelector("#srcBtn");
const srcResult = document.querySelector("#srcResult");
const bookResult = document.querySelector("#bookResult");
const srcList = document.querySelector("#srcList");
// search function end
// firebase start
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookImage = document.querySelector("#bookImage");
const bookDesc = document.querySelector("#bookDesc");
const addBtn = document.querySelector("#addBtn");
const ylwBtnAdd = document.querySelector("#ylwBtnAdd");
// book type
const addType = document.querySelector("#addType");
const closeBtn = document.querySelector("#closeBtn");
const bookTypeInput = document.querySelector("#bookTypeInput");
const typeAddBtn = document.querySelector("#typeAddBtn");
const bookTypeList = document.querySelector("#bookTypeList")


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

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {  getDatabase,
    ref,
    push,
    set,
    get,
    update,
    remove, } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  
  // Update
  const updateData = (path, data) => {
    return update(ref(database, path), data);
  };
  
  // Delete
  const deleteData = (path) => {
    return remove(ref(database, path));
  };
 
    readData("/books")
      .then((data) => {
        const books = convertData(data);
        console.log(Object.keys(books[1]));
       
      })
      .catch((error) => console.error("Error reading data:", error));
  
  srcList.addEventListener("click", async (e)=>{
    const bookID = e.target.value;
    const bookForm = await getBookByID(bookID)
    bookTitle.value = bookForm.volumeInfo.title
    bookAuthor.value = bookForm.volumeInfo.authors.toString()
    bookImage.value = bookForm.volumeInfo.imageLinks.thumbnail
    bookDesc.value = bookForm.volumeInfo.description
    bookTypeInput.value = 
    srcResult.style.display = 'none'
    srcInput.value = '';
    
    addBtn.addEventListener("click", function(e){
      e.preventDefault();
      createData("books", bookForm);
      alert("added")
  });
});


ylwBtnAdd.addEventListener("click", function(e){
  e.preventDefault();
  addType.style.visibility = "visible"; 
});
closeBtn.addEventListener("click", function(e){
  e.preventDefault();
  addType.style.visibility = "hidden"; 
});

typeAddBtn.addEventListener("click",()=>{
  const value = bookTypeInput.value;
  bookTypeInput.value = '';
  createData("category", value);
  alert("Category Added!");
  readData("/category")
  .then((data) =>{
    const categorys = convertData(data);
    console.log(categorys);
    bookTypeList.innerHTML =categorys.map(item =>
      ` <option value="fantastic" selected>${item.name}</option>`
      )
    
  })
  .catch((error) => console.error("Error reading data:", error));
})






