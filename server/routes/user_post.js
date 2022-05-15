const express = require('express');
const Post = require('../models/user_post');

const path = require("path");
const multer = require("multer");
var FormData = require('form-data');

const router = express.Router();

var currentPostImagePath = '';
var currentUser;

// var upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it
    
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req);
  
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      let myfilename = file.fieldname + "-" + Date.now()+".jpg";
      cb(null, myfilename)
      currentPostImagePath = myfilename;
    }
  })
       
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
// const maxSize = 1 * 1000 * 1000;
    
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
  
// mypic is the name of file attribute
}).single("mypic");


router.post("/uploadPicture", function (req, res, next) {
        
    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
    upload(req,res,function(err) {
  
        if(err) {
  
            // ERROR occured (here it can be occured due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            res.send(err)
        }
        else {
            // SUCCESS, image successfully uploaded
            // res.send("Success, Image uploaded!")
            
        }
    })
})


router.get('/getPosts', async (req, res) => {
    try {
        const posts = await Post.getPosts();
        res.send(posts);
    } catch (err) {
        res.status(401).send({message: err.message});
    }
});


router.post('/createPost', async (req, res) => {
    try {
        const post = await Post.createPost({"user_id": req.body.user_id, "caption": req.body.caption, "filepath": currentPostImagePath});
        res.send({...post});
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})


router.delete('/deletePost', async (req, res) => {
    try {
        await Post.deletePost(req.body.post_id);
        res.send({success: "Post Deleted"});
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})

router.post('/getUserPosts', async (req, res) => {
    try {
        const posts = await Post.getUserPosts(req.body);
        res.send(posts);
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})

router.post('/getSinglePost', async (req, res) => {
    try {
        const posts = await Post.getSinglePost(req.body);
        res.send(posts);
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})

router.put('/updateCaption', async (req, res) => {
    try {
        const post = await Post.updateCaption(req.body);
        res.send(post);
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})

module.exports = router;