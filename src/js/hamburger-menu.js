let header_menu = document.querySelector("#header_menu")
let overlay = document.querySelector("#overlay")
let close_icon = document.querySelector("#close_icon")
header_menu.addEventListener('click',function(){
    overlay.classList.add("show")
})

close_icon.addEventListener('click',function(){
    overlay.classList.remove("show")
})







