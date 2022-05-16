const express = require('express');
const Tag = require('../models/tag');
const router = express.Router();

// Creates a tag associated with the post
router.post('/createTag', async (req, res) => {
    try {
        await Tag.createTag(req.body);
        res.send({message: 'good'});
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})

// Gets Posts associated with Tag based off post_id
router.post('/getTaggedPosts', async (req, res) => {
    try {
        const taggedPosts = await Tag.getTaggedPosts(req.body);
        res.send(taggedPosts);
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})



// ==============================================
// Not used due to time constraint.
router.delete('/delete', async (req, res) => {
    try {
        await Tag.removeTag(req.body);
        res.send({success: "Tag deleted"});
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})
// Not used due to time constraint.
router.put('/edit', async (req, res) => {
    try {
        const tag = await Tag.editTag(req.body);
        res.send({success: "Tag Changed"});
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})


module.exports = router;