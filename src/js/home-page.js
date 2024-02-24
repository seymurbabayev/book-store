import { readData } from "./firebase.js";

const linkGroup = document.querySelector("#linkGroup")

readData("/category")
.then((data) =>{

const categorys = Object.values(data)

  renderCatalog(categorys)
})
.catch((error) => console.error("Error reading data:", error));

function renderCatalog (list){
  linkGroup.innerHTML = list.map(item =>
    ` <div class="form-link"><a href="#">${item}</a></div>`).join("")
}

















