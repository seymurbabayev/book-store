const allBooks = document.querySelector("#allBooks");
const bestseller = document.querySelector("#bestseller");
const newchek = document.querySelector("#new");
const category = document.querySelector("#category")

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {  getDatabase, ref, get, set, push, child, onValue  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
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
function convertDatas(d) {
  const newData = Object.entries(d);

  const myNewData = newData.map((kicikArr) => {
      const newObj = {
          id: kicikArr[0],
          name: kicikArr[1],
      };

      return newObj;
  });

  return myNewData;
}
readData("/books")
.then((data) =>{
  const desc = convertData(data);
  renderAllBooks(desc);
  renderBestSeller(desc);
  renderNew(desc);
})
.catch((error) => console.error("Error reading data:", error));


readData("/category")
.then((data) =>{
  const list = convertDatas(data);
  renderCategorys(list)


})
.catch((error) => console.error("Error reading data:", error));

function renderCategorys(list){
   category.innerHTML = list.map((item)=>{
    return`
    
         <li>
         <button type="button" class="catalog_categories" catID="${item.id}">${item.name}</button>
        </li>
        
   
    `
  }).join("");
  let buttons = document.getElementsByClassName("catalog_categories");
  for(let i = 1; i < buttons.length; i++ ){
    buttons[i].addEventListener("click", function(){
      let id = buttons[i].getAttribute("catID")
      getBook(id)
    })
  }

}


// function getBooks(list){
  
  
// }

function getBook(category_id) {
  const db_ref = ref(database)
  get(child(db_ref, 'books')).then((snapshot) => {
      let book_data
      if (snapshot.exists()) {
          let dataArr = Object.entries(snapshot.val())
          let data_list = dataArr.map((item) => {
              const newObj = {
                  id: item[0],
                  ... item[1],
              };
              // console.log(newObj);
              return newObj
          })
          let filtered_data = data_list.filter((book) => {
              return book.category === category_id
          })
          if (category_id) {
              book_data = filtered_data
          } else {
              book_data = data_list
          }
        
          let data_list_map = book_data.map((item, index) => {
              return `
              <div class="swiper-slide">
                  <div class="catalog_box_item">
                      <img src="${item.image}" alt="">
                     <span> ${item.newcheck === true ? 'New' : ''}</span>
            <p>${item.author}</p>
            <h5>${item.title}</h5>
            <a href="../pages/book.html" >Read more</a>

                  </div>
              </div>
      `
          }).join("")
          allBooks.innerHTML = data_list_map;
          swiperAll.update()
          return data_list
      }
  }).catch((err) => {
      console.log(err, 'err')
  })
}
getBook()

function renderAllBooks(list){
    allBooks.innerHTML = list.map(item =>
        `<div class="swiper-slide" >
        <div class="catalog_box_item">
            <img src="${item.image}" alt="">
            <span>${item.newcheck === true ? 'New' : ''}</span>
            <h5>${item.title}</h5>
            <p>${item.author}</p>
            <a href="../pages/book.html" >Read more</a>
        </div>
    </div> `).join("")
    swiperAll.update()
}
function renderNew(datas){
  const data = convertData(datas);
  let filteredBooks = data.filter((book)=>{
    if (book.newcheck === true){
        return book
    }
  })

  newchek.innerHTML = filteredBooks.map((item)=>{
    return `
    <div class="swiper-slide">
     <div class="catalog_box_item">
     <img src="${item.image}" alt="">
    <span>New</span>
     <h5>${item.title}</h5>
     <p>${item.author}</p>
      <a href="#">Read more</a>
      </div>
   </div>
    `
  }).join("")
  swiperNew.update()
}


function renderBestSeller(datas){
  const data = convertData(datas);
  let filteredBooks = data.filter((book)=>{
    if (book.bestsellerbox === true){
        return book
    }
  })

  bestseller.innerHTML = filteredBooks.map((item)=>{
    return `
    <div class="swiper-slide">
     <div class="catalog_box_item">
     <img src="${item.image}" alt="">
    <span >${item.newcheck === true ? 'New' : ''}</span>
     <h5>${item.title}</h5>
     <p>${item.author}</p>
      <a href="#">Read more</a>
      </div>
   </div>
    `
  }).join("")
  swiperBestsell.update()
}


const swiperBestsell = new Swiper('.swiper.swiperBestsell', {
  // Optional parameters
  slidesPerView: 10 ,
  spaceBetween: 20 ,
  direction: 'horizontal',
  loop: true,
  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  breakpoints: {
      // when window width is >= 320px
      320: {
          slidesPerView: 1.5,
          spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
          slidesPerView: 2,
          spaceBetween: 20
      },
      // when window width is >= 640px
      767: {
          slidesPerView: 3,
          spaceBetween: 20
      },
      1200: {
          slidesPerView: 5,
          spaceBetween: 20
      }
  }
});
const swiperAll = new Swiper('.swiper.swiperAll', {
  // Optional parameters
  slidesPerView: 10 ,
  spaceBetween: 20 ,
  direction: 'horizontal',
  loop: true,
  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  breakpoints: {
      // when window width is >= 320px
      320: {
          slidesPerView: 1.5,
          spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
          slidesPerView: 2,
          spaceBetween: 20
      },
      // when window width is >= 640px
      767: {
          slidesPerView: 3,
          spaceBetween: 20
      },
      1200: {
          slidesPerView: 5,
          spaceBetween: 20
      }
  }
});
const swiperNew = new Swiper('.swiper.swiperNew', {
  // Optional parameters
  slidesPerView: 5 ,
  spaceBetween: 20 ,
  direction: 'horizontal',
  loop: true,
  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  breakpoints: {
      // when window width is >= 320px
      320: {
          slidesPerView: 1.5,
          spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
          slidesPerView: 2,
          spaceBetween: 20
      },
      // when window width is >= 640px
      767: {
          slidesPerView: 3,
          spaceBetween: 20
      },
      1200: {
          slidesPerView: 5,
          spaceBetween: 20
      }
  }
});














