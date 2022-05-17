
const con = require('./db_connect');

// Creates user table if it does not exist
async function createTable() {
    let sql = `CREATE TABLE IF NOT EXISTS comments (
        comment_id INT NOT NULL AUTO_INCREMENT,
        post_id INT NOT NULL,
        comment_author INT NOT NULL,
        comment_text VARCHAR(255) NOT NULL,
        comment_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT comment_pk PRIMARY KEY(comment_id),
        CONSTRAINT user_comment_fk FOREIGN KEY(comment_author) REFERENCES users(user_id) ON DELETE CASCADE,
        CONSTRAINT post_comment_fk FOREIGN KEY(post_id) REFERENCES posts(post_id) ON DELETE CASCADE
    )`;
    await con.query(sql);
}
createTable();


async function createComment(data) {
    const sql = `INSERT INTO comments (
        post_id,
        comment_author,
        comment_text
        ) VALUES (
        ${data.post_id},
        ${data.user_id},
        "${data.comment}"
    )`;

    await con.query(sql);
}

async function fetchPostComments(data) {
    const sql = `
    SELECT comments.comment_author, comments.comment_text, comments.comment_timestamp, users.username, comments.post_id, users.user_id 
    FROM comments
    LEFT JOIN users
        ON comments.comment_author = users.user_id
    WHERE comments.post_id = ${data.post_id}`;

    return await con.query(sql);
}



// ==============================================
// Not used due to time constraint.
async function deleteComment(data) {
    const sql = `DELETE FROM comments WHERE comment_id = ${data.comment_id}`;
    await con.query(sql);
}
// Not used due to time constraint.
async function editComment(data) {
    const sql = `UPDATE comments SET comment_text = "${data.comment_text}" WHERE comment_id = ${data.comment_id}`;
    await con.query(sql);
}



module.exports = { createTable, createComment, fetchPostComments, deleteComment, editComment };