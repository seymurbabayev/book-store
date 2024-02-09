








  // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
   // TODO: Add SDKs for Firebase products that you want to use
   // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyDGsqCFzK968Iw30ccw_sa63MJ71JH8Ask",
//     authDomain: "library-bookstore-47573.firebaseapp.com",
//     databaseURL: "https://library-bookstore-47573-default-rtdb.firebaseio.com",
//     projectId: "library-bookstore-47573",
//     storageBucket: "library-bookstore-47573.appspot.com",
//     messagingSenderId: "241881115117",
//     appId: "1:241881115117:web:bf8402cf3facb57ed59fe4",
//     measurementId: "G-Q2QNJYVLCG"
//   };

   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
const aboutStore = ref(db, "aboutStore");

function aboutRender() {
  let aboutContent = document.querySelector(".about_page");
  onValue(aboutStore, (snapshot) => {
    const aboutData = snapshot.val();
    let aboutItem = [aboutData]
      .map(
        (item) =>
          `<div class="about_paragraph">
              <h1 class="about_title">${item.Title}</h1>
              <p class="about_text">${item.Desc}</p>
          </div>
          <div class="about_img">
              <img src="${item.BookUrl}" alt="About Book" />
          </div>`
      )
      .join("");
    aboutContent.innerHTML = aboutItem;
  });
}

aboutRender();

