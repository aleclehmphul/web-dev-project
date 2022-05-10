import { fetchData, setCurrentUser } from './main.js'

const loginForm = document.getElementById("login-form");
if(loginForm) loginForm.addEventListener('submit', login);

function login(e) {
    e.preventDefault();

    const name = document.getElementById("username").value;
    const pswd = document.getElementById("pswd").value;
    fetchData('/users/login', {username: name, password: pswd}, "POST")
    .then((data) => {
        if (!data.message) {
            setCurrentUser(data);
            window.location.href = "home.html";
        }
    })
    .catch((error) => {
        const errText = error.message;
        console.log(`Error! ${errText}`)
    });
}


const regForm = document.getElementById("reg-form");
if(regForm) regForm.addEventListener("submit", register);

function register(e) {
    e.preventDefault();

    // Field values
    const username = document.getElementById("username").value;
    const pswd = document.getElementById("pswd").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const birthdate = document.getElementById("birthdate").value;

    fetchData('/users/register', {username: username, password: pswd, firstname: firstname, lastname: lastname, email: email, birthdate: birthdate}, "POST")
    .then((data) => {
        if (!data.message) {
            setCurrentUser(data);
            window.location.href = "home.html";
        }
    })
    .catch((error) => {
        const errText = error.message;
        document.querySelector("#reg-form p.error").innerHTML = errText;
        document.getElementById("pswd").value = "";
        console.log(`Error! ${errText}`);
    })
}