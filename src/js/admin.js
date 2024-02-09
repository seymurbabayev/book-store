import { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "./firebase.js";

const usernameInp = document.querySelector(".username-input");
const passwordInp = document.querySelector(".password-input");
const joinBtn = document.querySelector(".login-form_btn");
const logoutBtn = document.querySelector("#logoutBtn");

const adminLoginScreen = document.querySelector(".admin-login");
const adminPanelScreen = document.querySelector(".admin-panel");

window.addEventListener("load", checkAuthState);

joinBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    const username = usernameInp.value.trim();
    const password = passwordInp.value.trim();
    const alertEl = document.querySelector('#alertEl')

    if (!username || !password) {
        alertEl.classList.remove('d-none')
        alertEl.innerHTML = 'All fields must be filled'

        setTimeout(()=>{
            alertEl.classList.add('d-none')
        },2000)

        return;
    }

    await signInWithEmailAndPassword(auth, username, password)
    .then(userCredential =>{
        adminLoginScreen.classList.add('d-none')
        adminPanelScreen.classList.remove('d-none')
    })
    .catch(err => {
        console.log(err);
        usernameInp.value = ''
        passwordInp.value = ''
        alertEl.classList.remove('d-none')
        alertEl.innerHTML = 'Username or password are incorrect'

        
        setTimeout(()=>{
            alertEl.classList.add('d-none')
        },2000)
    })

});

async function checkAuthState() {
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            adminLoginScreen.classList.add("d-none");
            adminPanelScreen.classList.remove("d-none");
        } else {
            adminLoginScreen.classList.remove("d-none");
            adminPanelScreen.classList.add("d-none");
        }
    });
}

logoutBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    await signOut(auth);
});
