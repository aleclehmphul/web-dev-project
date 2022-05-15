
import { fetchData, fetchDataGet, getCurrentUser } from './main.js'

const basepath = 'C:/Users/alecl/OneDrive/Documents/Web Dev/project';
const postForm = document.getElementById("post-form");
if(postForm) postForm.addEventListener('submit', createPost);

getAllPosts();

postStatus();

var post_creator = 'SHOULD NOT SEE';

document.getElementById('submission-btn-1').addEventListener('click', function(e) {
    let uploadedfile = document.getElementById('image-file').files[0];
    console.log(uploadedfile);
    if (uploadedfile) {
        localStorage.setItem('post', 'in progress');

        e.preventDefault();
        document.getElementById('file-upload').submit();
    }
})

document.getElementById('cancel').addEventListener('click', function(e) {
    localStorage.removeItem('post');
    document.getElementById('post-form').classList.toggle('hidden');
    postStatus();
})


// Uses form to create post
function createPost(e) {
    e.preventDefault();

    let user_id = getCurrentUser().user_id;
    let caption = document.getElementById('caption').value;

    fetchData('/posts/createPost', {user_id: user_id, caption: caption}, "POST")
    .then((data) => {
        console.log('Post Created');
        localStorage.removeItem('post');
        document.getElementById('post-form').classList.toggle('hidden');
        postStatus();
        document.getElementById('result').innerHTML = 'Post Posted :)';
        location.reload();
    })
    .catch((error) => {
        const errText = error.message;
        console.log(`Error! ${errText}`)
        result.innerHTML = `Error! ${errText}`;
    });
}

// Uses local storage to know if file has been uploaded or not
function postStatus() {
    document.getElementById('result').innerHTML = '';
    if (localStorage.getItem('post') === 'in progress') {
        document.getElementById('post-form').classList.toggle('hidden');
    } else {
        document.getElementById('file-upload').classList.toggle('hidden');
    }
}


function getAllPosts() {
    fetchDataGet(`/posts/getPosts`)
    .then(function(data) {
        console.log(data);
        let i = 0;

        // Loops over every post up until the 100th post
        while (i != data.length && i < 100) {
            if (i%3 === 0) {            // Left column
                createPostHTMLComponents('left-column', data[i].post_image_path, data[i].post_creator);
            } else if (i%3 === 1) {     // Middle column
                createPostHTMLComponents('mid-column', data[i].post_image_path, data[i].post_creator);
            } else if (i%3 === 2) {     // Right column
                createPostHTMLComponents('right-column', data[i].post_image_path, data[i].post_creator);
            } else {
                console.log("ERROR in while loop");
            }
            

            i++;
        }
    })
    .catch((error) => {
        console.log(`Error! ${error.message}`)
    })
}

// Helper function to create the html components for a post
async function createPostHTMLComponents(columnPosition, imageFileName, userId) {
    console.log(`USER ID: ${userId}`);
    await getPostCreator(userId);
    console.log(`POST CREATOR: ${post_creator}`);

    let postHTML = `
        <div class="post">
            <img src="../../uploads/${imageFileName}" alt="post">
            <div class="overlay flex">
                <input type="image" alt="Profile Picture" src="images/blank-profile-picture.webp">
                <a href="#">${post_creator}</a>
            </div>
        </div>
    `;

    //let mainContainer = document.getElementById('main-container')
    let column = document.getElementById(columnPosition);
    let newDiv = document.createElement('div');
    newDiv.innerHTML = postHTML;
    column.appendChild(newDiv);

}

async function getPostCreator(userId) {
    await fetchData('/users/getUser', {user_id: userId}, "POST")
    .then(function(data) {
        setPostCreator(data[0].username);
    })
    .catch((error) => {
        console.log(`Error! ${error.message}`)
    })
}

function setPostCreator(username) {
    post_creator = username;
}