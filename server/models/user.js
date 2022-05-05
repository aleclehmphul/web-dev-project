const users = [
    {
        userId: 12345,
        userName: "cathy123",
        password: "icecream"
    },
    {
        userId: 55555,
        userName: "fredburger54",
        password: "password123"
    }
];

let getUsers = () => users;

function login(username, password) {
    const user = users.filter((u) => u.userName === username);
    if (!user[0]) throw Error("User not found");
    if(user[0].password !== password) throw Error("Password is incorrect.");

    return user[0];
}

function register(user) {
    const u = userExists(user.username);
    if(u.length > 0) throw Error("Username already in use");
    const newUser = {
        userId: users[users.length-1].userId + 1,
        userName: user.username,
        password: user.password
    }
    users.push(newUser);

    return newUser;
}

function deleteUser(userId) {
    let i = users.map((user) => user.userId).indexOf(userId);
    users.slice(i, 1);
    console.log(users);
}

function editUser(user) {
    const u = userExists(user.userName);
    if (u.length > 0) throw Error('Username already exists');

    const cUser = users.filter((u) => u.userId === user.userId);
    cUser[0].userName = user.userName;
    return cUser[0];
}


function userExists(username) {
    return users.filter((u) => u.userName === username);
}

module.exports = { getUsers, login, register, deleteUser };