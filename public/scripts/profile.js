import 
{ getCurrentUser, setCurrentUser, removeCurrentUser, logout, fetchData } 
from './main.js';

let user = getCurrentUser();
// if user does not exist, take them to login page
if (!user) window.location.href = "login.html";

console.log(user)

let profile = document.getElementById("profile");
profile.innerHTML = `
<h2>Welcome back, ${user.userName}!</h2>
<div>
    <p class="error"></p>
    <button class="btn" id="edit">Edit Info</button>
    <button class="btn" id="delete">Delete Account</button>
</div>
`;

document.getElementById("edit").addEventListener("click", editProfile);
document.getElementById("delete").addEventListener("click", deleteAccount);

function editProfile() {
    //profile.classList.toggle("hide");
    let editForm = document.querySelector("#editForm");
    if (!editForm) console.log("Edit Form is null");
    editForm.innerHTML = "";
    editForm.innerHTML = `<form id="form" class="basic-form">
                                <p class="error"></p>
                                <h2>Edit Profile</h2>
                                <label for="username">Change Username</label>
                                <input type="text" name="username" id="username" placeholder="${user.userName}">
                                <br>
                                <input type="submit" value="Submit">
                          </form>
                          <button class="btn" id="cancel">Cancel</button>`;

    editForm.addEventListener('submit', editAccount)
    document.getElementById("cancel").addEventListener('click', (e) => {
        window.location.href = "account.html";
})
}

function editAccount(e) {
    e.preventDefault();

    let userName = document.getElementById("username").value;
    if (userName === user.userName) {
        let err = "No changes made";
        document.querySelector("#editForm p.error").innerHTML = err;
    } else {
        fetchData("/users/edit", {userId: user.userId, userName: userName}, "PUT")
        .then((data) => {
            if (!data.message) {
                removeCurrentUser();
                setCurrentUser(data);
                window.location.href = "profile.html";
            }
        })
        .catch((error) => {
            const errText = error.message;
            document.querySelector("#editForm p.error").innerHTML = errText;
            console.log(`Error! ${errText}`);
        })
    }
}


function deleteAccount() {
    if (confirm("Are you sure you want to delete your account?")) {
        fetchData("/users/delete", {userId: user.userId}, "DELETE")
        .then((data) => {
            if (!data.message) {
                console.log(data.success);
                logout();
                windown.location.href = "register.html";
            }
        })
        .catch((error) => {
            const errText = error.message;
            document.querySelector("#profile div p.error").innerHTML = errText;
            console.log(`Error! ${errText}`);
        })
    }
}