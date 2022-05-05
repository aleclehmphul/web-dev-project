
// Class for User
class User {
    static userIdCounter = 1;
    static users = [];

    // Constructor called when a User Registers for the first time
    constructor(firstName, lastName, birthdate, email, userName, password) {
        this.userId = User.userIdCounter;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.email = email;
        this.userName = userName;
        this.setUserPassword(password);
        User.userIdCounter++;
    }

    // Get Methods
    getUserId() {
        return this.userId;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getBirthdate() {
        return this.birthdate;
    }
    getEmail() {
        return this.email;
    }
    getUserName() {
        return this.userName;
    }
    getPassword() {
        return this.password;
    }

    // Set Methods
    setUserId(id) {
        this.userId = id;
    }
    setFirstName(fname) {
        this.firstName = fname;
    }
    setLastName(lname) {
        this.lastName = lname;
    }
    setBirthdate(bdate) {
        this.birthdate = bdate;
    }
    setEmail(email) {
        this.email = email;
    }
    setUserName(userName) {
        this.userName = userName;
    }
    setUserPassword(password) {
        if (this.validPassword(password))
            this.password = password;
        else
            console.log("Password must contain at least 1 uppercase letter, 1 symbol, and 1 number" +
            " and be at least 8 characters long.");
    }

    // Validate Password Method
    validPassword(password) {
        if (password.length >= 8) {
            let upper = 0;
            let numbers = 0;
            let symbols = 0;

            for (let i = 0; i < password.length; i++) {
                if (this.isDigit(password[i]))
                    numbers++;
                else if (!this.isLetterOrDigit(password[i]))
                    symbols++;
                else if (this.isUpperCase(password[i]))
                    upper++;
            }

            if (upper >= 1 && numbers >= 1 && symbols >= 1)
                return true;
        }
        return false;
    }
    isUpperCase(char) {
        return (/[A-Z]/).test(char)
    }
    isDigit(char) {
        return (/[1-9]/).test(char)
    }
    isLetterOrDigit(char) {
        return ((/[a-zA-Z]/).test(char) || (/[1-9]/).test(char))
    }
}

// Code for registering/creating an account
if (document.getElementById("registration-submit-btn") != null)
    document.getElementById("registration-submit-btn").addEventListener("click", createAccount);

if (document.getElementById("login-submit-btn") != null)
    document.getElementById("login-submit-btn").addEventListener("click", validateLogin);

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

function createAccount(event) {
    event.preventDefault();

    // Get information from forms
    let fname, lname, bdate, email, username, pswd;
    
    fname = document.getElementById("firstname").value;
    lname = document.getElementById("lastname").value
    bdate = document.getElementById("birthdate").value;
    email = document.getElementById("email").value;
    username = document.getElementById("username").value;
    pswd = document.getElementById("pswd").value;
    
    // Create User Object
    User.users.push(new User(fname, lname, bdate, email, username, pswd));

    // After registering, link to new home page
    window.location.href = "home.html";
}


function validateLogin(event) {
    event.preventDefault();

    let validUser = false;
    let username = document.getElementById("username").value;
    let password = document.getElementById("pswd").value;
    
    for (let i=0; i < User.users.length; i++) {
        if (User.users[i].getUserName() == username && User.users[i].getPassword() == password) {
            validUser = true;
            break;
        }
    }

    if (validUser)
        window.location.href = "home.html";
    else
        console.log("Invalid User Name or Password");
} 