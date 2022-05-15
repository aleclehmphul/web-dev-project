import 
{ getCurrentUser, setCurrentUser, removeCurrentUser, logout, fetchData } 
from './main.js';

let user = getCurrentUser();
// if user does not exist, take them to login page
if (!user) window.location.href = "login.html";

console.log(user)

let profile = document.getElementById("profile");
profile.innerHTML = `
<h2 id="profile-name">Welcome back, ${user.username}!</h2>
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
                                <input type="text" name="username" id="username" placeholder="${user.username}">
                                <br>
                                <button class="btn center" type="submit">Submit</button>
                                <button class="btn center" id="cancel">Cancel</button>
                          </form>`;

    editForm.addEventListener('submit', editAccount)
    document.getElementById("cancel").addEventListener('click', (e) => {
        window.location.href = "account.html";
})
}

function editAccount(e) {
    e.preventDefault();

    let userName = document.getElementById("username").value;
    if (userName === user.username || userName.length === 0) {
        let err = "No changes made";
        document.querySelector("#editForm p.error").innerHTML = err;
    } else if (userName.length >= 255){
        let err = "Username must be less than 255 characters.";
        document.querySelector("#editForm p.error").innerHTML = err;
    } else {
        fetchData("/users/edit", {userId: user.user_id, username: userName}, "PUT")
        .then((data) => {
            if (!data.message) {
                removeCurrentUser();
                setCurrentUser(data);
                window.location.href = "account.html";
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
        fetchData("/users/delete", {userId: user.user_id}, "DELETE")
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

userPosts(user.user_id);
function userPosts(userId) {
    fetchData('/posts/getUserPosts', {user_id: userId}, 'POST')
    .then((data) => {
        console.log(data);

        let i = 0;

        // Loops over every post up until the 100th post
        while (i != data.length && i < 100) {
            if (i%3 === 0) {            // Left column
                profilePostHTMLComponents('left-column', data[i].post_image_path, data[i].post_id);
            } else if (i%3 === 1) {     // Middle column
                profilePostHTMLComponents('mid-column', data[i].post_image_path, data[i].post_id);
            } else if (i%3 === 2) {     // Right column
                profilePostHTMLComponents('right-column', data[i].post_image_path, data[i].post_id);
            } else {
                console.log("ERROR in while loop");
            }
            

            i++;
        }
    })
    .catch((error) => {
        console.log(`Error! ${error.message}`);
    })
}

function profilePostHTMLComponents(columnPosition, imageFileName, post_id) {
    let postHTML = `
        <div class="post">
            <img src="../../uploads/${imageFileName}" alt="post">

            <div class="overlay flex">
                <button id="${post_id}">Delete Post</button>
                <button id="_${post_id}">Edit Caption</button>
            </div>
        </div>
    `;

    //let mainContainer = document.getElementById('main-container')
    let column = document.getElementById(columnPosition);
    let newDiv = document.createElement('div');
    newDiv.innerHTML = postHTML;
    column.appendChild(newDiv);

    document.getElementById(post_id).addEventListener('click', deletePost);
    document.getElementById(`_${post_id}`).addEventListener('click', editCaption);
}

function deletePost(e) {
    if (confirm("Are you sure you want to delete this post?")) {
        fetchData('/posts/deletePost', {post_id: e.target.id}, 'DELETE')
        .then((data) => {
            location.reload();
        })
        .catch((error) => {
            console.log(`Error! ${error.message}`)
        })
    }
}

function editCaption(e) {
    let allPosts = document.querySelectorAll('.post');
    console.log(allPosts);

    for (const element of allPosts) {
        element.classList.toggle('hidden');
    }

    let post_info = fetchData('/posts/getSinglePost', {post_id: e.target.id.substring(1)}, 'POST')
    .then((data) => {
        console.log(data[0]);

        let caption = data[0].post_caption;
        let imageFileName = data[0].post_image_path;

        let form = document.getElementById('editPostForm');
        let imageContainer = document.getElementById('editPostImage');
    
        let formHTML = `
            <form id="caption-form">
                <h3>Enter New Caption</h3>
                <input type="text" id="caption" name="caption" placeholder="${caption}">
                <br>
                <button id="update-caption-btn" class="btn" type="submit">Update</button>
                <button id="cancel-btn" class="btn" type="button">Cancel</button>
            </form>
        `;

        // Append form to webpage
        let formDiv = document.createElement('div');
        formDiv.classList.add('edit-form')
        formDiv.innerHTML = formHTML;
        form.appendChild(formDiv);

        let imgHTML = ` <img src="../../uploads/${imageFileName}" alt="post"> `;

        let imgDiv = document.createElement('div');
        imgDiv.classList.add('post-edit');
        imgDiv.innerHTML = imgHTML;
        imageContainer.appendChild(imgDiv);

        // Adds event listener to the cancel button to go back to the account page
        document.getElementById('cancel-btn').addEventListener('click', function(e) {
            window.location.href = 'account.html';
        })

        // Adds event listener to update caption button to update data in database
        document.getElementById('update-caption-btn').addEventListener('click', function(e) {
            e.preventDefault();

            let newCaption = document.getElementById('caption').value;
            updateCaption(newCaption, data[0].post_id, data[0].post_caption);
        });
    })
    .catch((error) => {
        console.log(`Error! ${error.message}`);
    })
}

function updateCaption(newCaption, post_id, oldCaption) {
    console.log(post_id);
    console.log(newCaption);
    let output = document.getElementById('updateMessage');

    if (newCaption.length <= 0 || newCaption === oldCaption) {
        output.innerHTML = 'No change to caption';
    } else if (newCaption.length >= 255) {
        output.innerHTML = 'Too many characters in caption.  Caption must be less than 255 characters.'
    } else {
        fetchData('/posts/updateCaption', {post_id: post_id, caption: newCaption}, 'PUT')
        .then((data) => {
            output.innerHTML = 'Caption Updated!';
            setTimeout(() => {location.reload();}, 1000);
        })
        .catch((error) => {
            console.log(`Error! ${error.message}`);
            output.innerHTML = `Error! ${error.message}`;
        })
    }
}