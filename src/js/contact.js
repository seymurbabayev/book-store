const send_Button = document.querySelector(".send_Button");
let textLength = document.querySelector("#textLength");

send_Button?.addEventListener("click", function(e){
e.preventDefault();
const name_Input = document.querySelector(".name_Input").value.trim();
const address_Input= document.querySelector(".address_Input").value.trim();
const email_Input = document.querySelector(".email_Input").value.trim();
const phone_Input= document.querySelector(".phone_Input").value.trim();
const contactTextarea = document.querySelector("#contactTextarea").value.trim();

if(!name_Input || !address_Input || !email_Input || !phone_Input){
    alert("Please check all informations")
}else if (email_Input.indexOf("@") === -1){
    alert("Please check all informations")
    // showMessage("Please check all informations", true);
}else{
const contactOb = {
     name_Input,
     address_Input,
     email_Input,
     phone_Input,
    contactTextarea,
};
console.log("contactOb", contactOb);
}

})