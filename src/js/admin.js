import { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "./firebase.js";
import { readData, listenForChanges, convertData, deleteData } from "./firebase.js";

const usernameInp = document.querySelector(".username-input");
const passwordInp = document.querySelector(".password-input");
const joinBtn = document.querySelector(".login-form_btn");
const logoutBtn = document.querySelector("#logoutBtn");

const adminLoginScreen = document.querySelector(".admin-login");
const adminPanelScreen = document.querySelector(".admin-panel");

const booksTable = document.querySelector('#booksTable');
const contactTable = document.querySelector('#contactTable');
const usersTable = document.querySelector('#usersTable');

// const trashIcons = document.querySelectorAll('.fa-trash')
// console.log(trashIcons);

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

readData('users')
.then(data =>{
    const users = convertData(data)
    console.log(users);
    usersTable.innerHTML = users.map((el, i) => `
    <tr>
        <td scope="row">${i + 1}</td>
        <td>${el.fullname}</td>
        <td>${el.email}</td>
    </tr>
    `).join('')
})

listenForChanges('books', (data)=>{
    console.log(data);
    const books = convertData(data)
    console.log(books);

    booksTable.innerHTML = books.map((book,i)=>`
    <tr>
    <td scope="row">${i + 1}</td>
    <td class="text-start">
        <img
            class="me-1 book-table_img"
            src="${book.image}"
            alt="${book.title} book"
        />
        ${book.title}
    </td>
    <td>${book.desc.slice(0,50)}...</td>
    <td>${book.category}</td>
    <td>${book.author}<i data-id="${book.id}" class="fa-solid fa-trash ps-1"></i></td>
</tr>
    `).join('')

})

booksTable.addEventListener('click', (e)=>{
    let isTrashIcon = e.target.classList.contains('fa-trash')  
    if(isTrashIcon){
        const bookId = e.target.dataset.id
        // console.log(e.target.dataset.id);
        deleteData('books/',bookId)
    }
})

readData('contacts')
.then((data) =>{
    const contactInfo = convertData(data)
    console.log(contactInfo);
    contactTable.innerHTML = contactInfo.map((el, i) =>`
        <tr>
            <td scope="row">${i + 1}</td>
            <td>${el.name_Input}</td>
            <td>${el.address_Input}</td>
            <td>${el.email_Input}</td>
            <td>${el.phone_Input}</td>
        </tr>
        `
    ).join('')
})