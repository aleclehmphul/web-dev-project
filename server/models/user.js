
const con = require('./db_connect');

// Creates user table if it does not exist
async function createTable() {
    let sql = `CREATE TABLE IF NOT EXISTS users (
        user_id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL UNIQUE,
        user_email VARCHAR(255) NOT NULL UNIQUE,
        user_password VARCHAR(255) NOT NULL,
        user_first_name VARCHAR(255) NOT NULL,
        user_last_name VARCHAR(255) NOT NULL,
        user_birthdate DATE NOT NULL,
        CONSTRAINT user_pk PRIMARY KEY(user_id)
    )`;
    await con.query(sql);
}
createTable();

// Gets all users
let getUsers = async function() {
    const sql = "SELECT * FROM users";
    return await con.query(sql);
};

// Gets a single user based off of userId or username
async function getUser(user) {
    let sql;
    if (user.user_id) {
        sql = `SELECT * FROM users WHERE user_id = ${user.user_id}`;
    } else {
        sql = `SELECT * FROM users WHERE username = "${user.username}"`;
    }

    return await con.query(sql);
}

// Returns user if user exists in database
async function userExists(username) {
    const sql = `SELECT * FROM users WHERE username = "${username}"`;

    return await con.query(sql);
}

// If user exists, login
async function login(username, password) {
    const user = await userExists(username);
    if (!user[0]) throw Error("User not found");
    if (user[0].user_password !== password) throw Error("Password is incorrect.");

    return user[0];
}

// Registers new user by adding info to users table
async function register(user) {
    const u = userExists(user.username);
    if (u.length > 0) throw Error("Username already exists")

    const sql = `INSERT INTO users (
        username,
        user_email,
        user_password,
        user_first_name,
        user_last_name,
        user_birthdate
        ) VALUES (
        "${user.username}",
        "${user.email}",
        "${user.password}",
        "${user.firstname}",
        "${user.lastname}",
        "${user.birthdate}"
    )`;

    const insert = await con.query(sql);
    const newUser = await getUser(user);
    return newUser[0];
}

// Updates username in database with new username
async function editUser(user) {
    console.log(user.userId);
    const sql = `UPDATE users SET username = "${user.username}" WHERE user_id = ${user.userId}`;
    
    const update = await con.query(sql);
    const newUser = await getUser(user);
    return newUser[0];
}

// Deletes user from database based off of their user_id
async function deleteUser(user_id) {
    const sql = `DELETE FROM users WHERE user_id = ${user_id}`;
    await con.query(sql);
}

module.exports = { getUsers, login, register, deleteUser, editUser, getUser, createTable };