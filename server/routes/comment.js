const express = require('express');
const Comment = require('../models/comment');
const router = express.Router();

// Post request to create comment (insert into database)
router.post('/createComment', async (req, res) => {
    try {
        await Comment.createComment(req.body);
        res.send({message: 'good'});
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})

// Gets post comments based off of post_id
router.post('/fetchPostComments', async (req, res) => {
    try {
        const comments = await Comment.fetchPostComments(req.body);
        res.send(comments);
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})


// ==============================================
// Not used due to time constraint.
router.delete('/delete', async (req, res) => {
    try {
        await Comment.deleteComment(req.body);
        res.send({success: "Comment deleted"});
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})
// Not used due to time constraint.
router.put('/edit', async (req, res) => {
    try {
        const user = await Comment.editComment(req.body);
        res.send({success: "Comment Changed"});
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})


module.exports = router;