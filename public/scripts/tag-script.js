import { fetchData, getCurrentUser } from './main.js'
import { createPostHTMLComponents, loadComments, getPostCreator, generateCommentFields, createComment, setPostCreator } from './post-script.js'


let path = window.location.pathname;
let page = path.split('/').pop();
let explorerType = page.split('.')[0];
console.log(explorerType);

getTaggedPosts();

function getTaggedPosts() {
    fetchData(`/tags/getTaggedPosts`, {tag: explorerType}, 'POST')
    .then(function(data) {
        console.log(data);
        let i = 0;

        if (data.length === 0) {
            document.getElementById('result').innerHTML = `There are no posts with the tag <strong>${explorerType}</strong>.`;
        } else {
            document.getElementById('result').innerHTML = '';
        }

        // Loops over every post up until the 100th post
        while (i != data.length && i < 100) {
            if (i%3 === 0) {            // Left column
                createPostHTMLComponents('left-column', data[i].post_image_path, data[i].post_creator, data[i].post_id, data[i].post_caption);
            } else if (i%3 === 1) {     // Middle column
                createPostHTMLComponents('mid-column', data[i].post_image_path, data[i].post_creator, data[i].post_id, data[i].post_caption);
            } else if (i%3 === 2) {     // Right column
                createPostHTMLComponents('right-column', data[i].post_image_path, data[i].post_creator, data[i].post_id, data[i].post_caption);
            } else {
                console.log("ERROR in while loop");
            }
            
            i++;
        }
    })
    .catch((error) => {
        console.log(`Error! ${error.message}`)
    })
}