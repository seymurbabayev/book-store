let join_btn = document.querySelector("#join-btn")
let modal_body = document.querySelector("#modal_body")

join_btn.addEventListener("click",function(){
    modal_body.classList.toggle("show")
})