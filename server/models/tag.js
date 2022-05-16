
const con = require('./db_connect');

// Creates tags table if it does not exist
async function createTable() {
    let sql = `CREATE TABLE IF NOT EXISTS tags (
        tag_id INT NOT NULL AUTO_INCREMENT,
        post_id INT NOT NULL,
        tag_name VARCHAR(255) NOT NULL,
        CONSTRAINT tag_pk PRIMARY KEY(tag_id),
        CONSTRAINT post_id_fk FOREIGN KEY(post_id) REFERENCES posts(post_id)
    )`;
    await con.query(sql);
}
createTable();

// Creates a tag entry associated with post
async function createTag(data) {
    let sql = `INSERT INTO tags (post_id, tag_name) 
                VALUES (${data.post_id}, "${data.tag}")`;
    await con.query(sql);
}


async function getTaggedPosts(data) {
    let sql = `SELECT * FROM tags LEFT JOIN posts ON tags.post_id = posts.post_id WHERE tags.tag_name = '${data.tag}'`;
    return await con.query(sql);
}



// ==============================================
// Not used due to time constraint.
async function deleteTag(data) {
    const sql = `DELETE FROM tags WHERE tag_id = ${data.tag_id}`;
    await con.query(sql);
}
// Not used due to time constraint.
async function editTag(data) {
    const sql = `UPDATE tags SET tag_name = "${data.tag_name}" WHERE tag_id = ${data.tag_id}`;
    await con.query(sql);
}


module.exports = { createTable, createTag, getTaggedPosts, deleteTag, editTag };