
const con = require('./db_connect');


// Creates user_post table if it does not exist
async function createTable() {
    let sql = `CREATE TABLE IF NOT EXISTS posts (
        post_id INT NOT NULL AUTO_INCREMENT,
        post_creator INT NOT NULL,
        post_image_path VARCHAR(255) NOT NULL,
        post_caption VARCHAR(255) NOT NULL,
        CONSTRAINT post_pk PRIMARY KEY(post_id),
        CONSTRAINT user_fk FOREIGN KEY(post_creator) REFERENCES users(user_id)
    )`;
    await con.query(sql);
}
createTable();


async function createPost(post) {
    const sql = `INSERT INTO posts (
        post_creator,
        post_image_path,
        post_caption
        ) VALUES (
        ${post.user_id},
        "${post.filepath}",
        "${post.caption}"
    )`;

    const insert = await con.query(sql);
}


// Creates new post by adding info to posts table
async function addCaption(caption) {
    const sql = `UPDATE posts SET post_caption = "${caption.caption}"`;

    const insert = await con.query(sql);
}


// Gets all posts
let getPosts = async function() {
    const sql = "SELECT * FROM posts";
    return await con.query(sql);
};

// Gets a single post based off of post_id
async function getPost(post_id) {
    let sql = `SELECT * FROM posts WHERE post_id = ${post_id}`;
    return await con.query(sql);
}


async function getUserPosts(user_id) {
    let sql = `SELECT * FROM posts WHERE post_creator = ${user_id.user_id}`;
    return await con.query(sql);
}


async function getSinglePost(post_data) {
    let sql = `SELECT * FROM posts WHERE post_id = ${post_data.post_id}`;
    return await con.query(sql);
}


async function updateCaption(data) {
    const sql = `UPDATE posts SET post_caption = "${data.caption}" WHERE post_id = ${data.post_id}`;
    const update = await con.query(sql);
    return getPost(data.post_id);
}

// Deletes user from database based off of their user_id
async function deletePost(post_id) {
    const sql = `DELETE FROM posts WHERE post_id = ${post_id}`;
    await con.query(sql);
}

module.exports = { createTable, createPost, getPosts, getPost, addCaption, deletePost, getUserPosts, getSinglePost, updateCaption};