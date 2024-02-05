// search function start
const srcInput = document.querySelector("#srcInput");
const srcBtn = document.querySelector("#srcBtn");
const srcResult = document.querySelector("#srcResult");
const bookResult = document.querySelector("#bookResult");
// search function end
// firebase start
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookImage = document.querySelector("#bookImage");
const bookDesc = document.querySelector("#bookDesc");
const addBtn = document.querySelector("#addBtn")


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
    srcResult.innerHTML = book.map(item => `

<img class="search-result" src="../assets/images/clock-icon.svg" alt="clock icon" />


    <li class="">${ item.volumeInfo.title}</li>

`).join("");


};
// function bookItem(data){
//     const book = data.items
//      const result = book.map(item =>{
//         let a = item.target.dataset.info
//         title = a.volumeInfo.title
//     })

//     const title = bookTitle.value;
//     const description = bookDesc.value;
//     const image_url = bookImage.value;
//     const author = bookAuthor.value;
  
    
//     const form = {
//         title,
//         description,
//         image_url,
//         author,
//     };
//     console.log(form);
//     console.log(result);
// }



// // search function end

// function myFunction(){
//     const title = bookTitle.value;
//     const description = bookDesc.value;
//     const image_url = bookImage.value;
//     const author = bookAuthor.value;
  
    
//     const form = {
//         title,
//         description,
//         image_url,
//         author,
//     };
//     console.log(form);
  
// }
// myFunction()  

// addBtn?.addEventListener("click", function(e){
//     e.preventDefault();
    
    



// })
