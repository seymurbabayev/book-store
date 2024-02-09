let fullname_input = document.querySelector("#fullname_input")
let email_input = document.querySelector("#email_input")
let join_btn = document.querySelector("#join_btn")

let id = 1 
join_btn?.addEventListener('click', function(e){
e.preventDefault();
 
if(email_input.value == 0  || fullname_input.value == 0){
alert("Please check form")

}else{
    let userInfo = {
        fullname :fullname_input.value,
        email:email_input.value

        
    }
  console.log("userInfo", userInfo);
}
  

})