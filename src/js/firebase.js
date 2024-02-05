const srcInput = document.querySelector("#srcInput");
const srcBtn = document.querySelector("#srcBtn");
const srcResult = document.querySelector("#srcResult");


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
    }catch(err){
        console.log(err);
        srcResult.style.backgroundColor = "#d9534f";
        srcResult.style.height = "100px"
        srcResult.innerHTML = `Book is not found: ${bookTitle}`
    }
}

function renderItem(data){
    const book = data.items
    console.log(book);
    srcResult.innerHTML = book.map(item => `<div class="search-result">
   
    
</div>
<div class="search-result">
<img src="../assets/images/clock-icon.svg" alt="clock icon" />
<div class="d-flex flex-column">
    <p>${item.volumeInfo.title}</p>
    <p>${item.volumeInfo.authors}</p>
    </div>
</div>`).join("")
}