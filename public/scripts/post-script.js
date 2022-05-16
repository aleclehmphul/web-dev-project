
import { fetchData, fetchDataGet, getCurrentUser } from './main.js'

const basepath = 'C:/Users/alecl/OneDrive/Documents/Web Dev/project';
const postForm = document.getElementById("post-form");
if(postForm) postForm.addEventListener('submit', createPost);

let path = window.location.pathname;
let page = path.split('/').pop();

// if on the homepage, retrieve posts and display to page
if (page === 'home.html') {
    getAllPosts();
    postStatus();

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
}



var post_creator = '';


// Uses form to create post
function createPost(e) {
    e.preventDefault();

    // Creating post in the posts table
    let user_id = getCurrentUser().user_id;
    let caption = document.getElementById('caption').value;

    fetchData('/posts/createPost', {user_id: user_id, caption: caption}, "POST")
    .then((data) => {
        console.log('Post Created');
        localStorage.removeItem('post');
        document.getElementById('post-form').classList.toggle('hidden');
        postStatus();
        document.getElementById('result').innerHTML = 'Post Posted :)';

        // Creating tag in the tag table for each tag selected by user
        let art = document.getElementById('art').checked;
        let photograpy = document.getElementById('photography').checked;
        let animation = document.getElementById('animation').checked;

        // gets most recent post (new post by user)
        fetchDataGet('/posts/getMostRecentPost')
        .then((data) => {
            // uses new post's post_id to insert into tags table
            let newest_post = data[0].newest_post;
            if (art) {
                createTag("art", newest_post);
            }
            if (photograpy) {
                createTag("photography", newest_post);
            }
            if (animation) {
                createTag("animation", newest_post);
            }
            location.reload();
        })
        .catch((error) => {
            console.log(`Error! ${error.message}`);
        })
    })
    .catch((error) => {
        const errText = error.message;
        console.log(`Error! ${errText}`)
        result.innerHTML = `Error! ${errText}`;
    });
    
}

function createTag(tagType, post_id) {
    fetchData('/tags/createTag', {tag: tagType, post_id: post_id}, 'POST')
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(`Error! ${error.message}`);
    })
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

        if (data.length === 0) {
            document.getElementById('no-posts').innerHTML = 'No posts uploaded.  You can upload a post above :)'
        } else {
            document.getElementById('no-posts').innerHTML = '';
        }

        // Loops over every post up until the 100th post
        while (i != data.length && i < 100) {
            if (i%3 === 0) {            // Left column
                createPostHTMLComponents('left-column', data[i].post_image_path, data[i].post_creator, data[i].post_id, data[i].post_caption);
            } else if (i%3 === 1) {     // Middle column
                createPostHTMLComponents('mid-column', data[i].post_image_path, data[i].post_creator, data[i].post_id, data[i].post_caption);
            } else if (i%3 === 2) {     // Right column
                createPostHTMLComponents('right-column', data[i].post_image_path, data[i].post_creator, data[i].post_id, data[i].post_caption);
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
export async function createPostHTMLComponents(columnPosition, imageFileName, userId, post_id, post_caption) {
    console.log(`USER ID: ${userId}`);
    await getPostCreator(userId);
    console.log(`POST CREATOR: ${post_creator}`);

    let postHTML = `
        <div class="post">
            <img src="../../uploads/${imageFileName}" alt="post" id="image_${post_id}">
            <div class="overlay flex">
                <div class="flex align">
                    <img alt="Profile Picture" src="images/blank-profile-picture.webp">
                    <a>${post_creator}</a>
                </div>
                <div>
                    <p class="post-caption-display"><strong>${post_caption}</strong></p>
                </div>
            </div>
        </div>
    `;

    //let mainContainer = document.getElementById('main-container')
    let column = document.getElementById(columnPosition);
    let newDiv = document.createElement('div');
    newDiv.innerHTML = postHTML;
    column.appendChild(newDiv);

    document.getElementById(`image_${post_id}`).addEventListener('click', function(e) {
        let allPosts = document.querySelectorAll('main');

        for (const element of allPosts) {
            element.classList.toggle('hidden');
        }

        // Gets single post details
        fetchData('/posts/getSinglePost', {post_id: post_id}, 'POST')
        .then((data) => {
            let post = data[0];

            // Reloads single post with comments
            let selectedPost = document.getElementById('post-selected');
            let singlePostHTML = `
                <div class="post">
                    <img src="../../uploads/${post.post_image_path}" alt="post">
                    <div class="overlay flex">
                        <div class="flex align">
                            <input type="image" alt="Profile Picture" src="images/blank-profile-picture.webp">
                            <a href="#">${post.username}</a>
                        </div>
                        <div>
                            <p class="post-caption-display"><strong>${post.post_caption}</strong></p>
                        </div>
                    </div>
                </div>
            `;
            let postContainer = document.createElement('div');
            postContainer.innerHTML = singlePostHTML;
            selectedPost.appendChild(postContainer);

            let commentButton = `<button id="commentBtn" class="btn">Leave a Comment</button>`;
            let commentButtonContainer = document.createElement('div');
            commentButtonContainer.innerHTML = commentButton;
            selectedPost.appendChild(commentButtonContainer);

            // Generates the Comment Form
            document.getElementById('commentBtn').addEventListener('click', function(e) {
                generateCommentFields(post_id);
            })

            loadComments(post_id);
        })
        .catch((error) => {
            console.log(`Error! ${error.message}`)
        })
    })
}

export function loadComments(post_id) {
    fetchData('/comments/fetchPostComments', {post_id: post_id}, 'POST')
    .then((data) => {
        // let parent = document.getElementById('post-selected');
        let parent = document.getElementById('comment-section');

        data.forEach(element => {
            let comment_datetime = new Date(element.comment_timestamp);

            let comment = document.createElement('div');
            comment.innerHTML = `
                <div id="comment-author" class="comment-component">
                    <strong>${element.username}</strong>
                </div>
                <div id="comment-text" class="comment-component">
                    ${element.comment_text}
                </div>
                <div id="comment-timestamp" class="comment-component">
                    ${comment_datetime.toLocaleDateString()} - ${comment_datetime.toLocaleTimeString()}
                </div>
            `;
            comment.classList.add('comment');
            comment.classList.add('flex');

            parent.appendChild(comment);
        });
    })
    .catch((error) => {
        console.log(`Error! ${error.message}`);
    })
}

export async function getPostCreator(userId) {
    await fetchData('/users/getUser', {user_id: userId}, "POST")
    .then(function(data) {
        setPostCreator(data[0].username);
    })
    .catch((error) => {
        console.log(`Error! ${error.message}`)
    })
}

export function setPostCreator(username) {
    post_creator = username;
}

export function generateCommentFields(post_id) {
    
    // hides comment button
    document.getElementById('commentBtn').classList.toggle('hidden');

    // If it has not been generated
    if (!document.getElementById('comment-submit-form')) {
        let commentForm = `
            <form id="comment-submit-form">
                <textarea rows="2" cols="25" placeholder="Enter Comment" id="comment-field"></textarea>
                <br>
                <button type="submit" id="commentSubmit" class="btn">Upload Comment</button>
                <button type="button" id="cancelComment" class="btn">Cancel</button>
            </form>
        `;

        let formContainer = document.createElement('div');
        formContainer.innerHTML = commentForm;
        let parent = document.getElementById('post-selected');
        parent.appendChild(formContainer);

        document.getElementById('commentSubmit').addEventListener('click', function(e) {
            e.preventDefault();
            createComment(post_id);
        });

        // When clicked, cancel button hides the form and un-hides the comment button
        document.getElementById('cancelComment').addEventListener('click', function(e) {
            document.getElementById('comment-submit-form').classList.toggle('hidden');
            document.getElementById('commentBtn').classList.toggle('hidden');
        })
    } else {
        // un-hides the form
        document.getElementById('comment-submit-form').classList.toggle('hidden');
    }

}

export function createComment(post_id) {
    let comment = document.getElementById('comment-field').value;

    if (comment.length === 0) {
        console.log('Nothing has been entered into text field');
    } else if (comment.length >= 255) {
        console.log('Too many characters');
    } else {
        fetchData('/comments/createComment', {user_id: getCurrentUser().user_id, post_id: post_id, comment: comment}, 'POST')
        .then((data) => {
            console.log(data);
            location.reload();
        })
        .catch((error) => {
            console.log(`Error! ${error.message}`);
        })
    }
}