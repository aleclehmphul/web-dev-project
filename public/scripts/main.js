
// Fetch method implementation:
export async function fetchData(url = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${url}`, {
        method: methodType, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if(response.ok) {
        return await response.json(); // parses JSON response into native JavaScript objects
    } else {
        throw await response.json();
    }
}
  
export function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function removeCurrentUser() {
    localStorage.removeItem('user');
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

export const logoutBtn = document.getElementById("logout");
if(logoutBtn) logoutBtn.addEventListener('click', logout)

export function logout() {
    removeCurrentUser();
    window.location.href = "login.html";
}







// Old code for buttons
// Code for registering/creating an account
if (document.getElementById("your-account-btn") != null) {
    document.getElementById("your-account-btn").addEventListener("click", function() {
        window.location.href = "account.html";
    });
}

if (document.querySelector("#blog-post1") != null) {
    document.querySelector("#blog-post1").addEventListener("click", function() {
        window.location.href = "example-blog.html";
    });
}

if (document.querySelector("#blog-post2") != null) {
    document.querySelector("#blog-post2").addEventListener("click", function() {
        window.location.href = "example-blog.html";
    });
}

if (document.querySelector("#blog-post3") != null) {
    document.querySelector("#blog-post3").addEventListener("click", function() {
        window.location.href = "example-blog.html";
    });
}
