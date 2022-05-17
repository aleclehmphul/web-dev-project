# web-dev-project (Web Development Project)

## App Description

A simple vanilla JS web app that allows users to:
- login
- register
- edit their profile information
- delete their profile
- upload posts (consisting of an image, caption, and tags)
- delete their posts
- edit their post's caption
- comment on their posts and other users posts

From the Home Page, the user can view all posts uploaded by any user.  The user may also filter the posts displayed based off of different tags 
{art, photography, or animation}.  When a user clicks on a post, the post's comments are displayed on screen along with a comment button.  
The user may create a comment by clicking on the comment button and submiting the form associated with a comment.

From the Profile Page, the user can edit their username or delete their account.  Their posts are displayed within the Profile Page.  
When the mouse cursor is hovered over a post, an edit and delete button are overlayed on top of the post.  The user click these buttons 
to edit the post caption or delete the post.
\
\
\
The application is a work in progress.  There are still more features I'd like to add in the future...
\
\
For example, the user will be able to edit and delete comments.  By clicking on a post's username, the user is redirected to a new page that shows all of the 
selected user's posts.  The user would have the ability to upload a profile picture for their account.


## Current Bugs/Issues

When starting application with the `node index.js` OR `npm run dev` command, the users table is not created before the posts tables creation is executed, 
throwing a table not found error.  This is fixed by running the `node index.js` or `npm run dev` command again.  (This only happens if there are no tables 
in the database)

When submiting a comment, the comments section under the post does not update with the user's comment until they refresh the home page and 
navigate back to the post.  This is inconvient for the user because they do not know if their comment was submitted until they do the steps 
mentioned above.


## Technologies Utilized

### Front-end
- HTML
- CSS
- JavaScript

### Back-end
- Node JS
- Express JS
- JavaScript
- MYSQL Database


## Database and ER Diagram
![web_dev_project ER Diagram](https://user-images.githubusercontent.com/61329825/168882948-4da52ef5-9e20-490f-9ddf-6e155ed70196.png)

### USER
The **USER** table holds information related to the user.  This information is initialized when the user submits information through the 
registration page.  User information is needed to validated the user through the login process.

### POST
The **POST** table holds information about a post.  As the user submit/creates a post, the POST table submits a new entry with the fields intialized.  
The field "Post Image Path" corresponds to the path of the image stored on the server.

### COMMENT
The **COMMENT** table holds information related to post comments.  When a user clicks on a post, they have the ability to read others comments 
and write a comment of their own for that post.

### TAG
The **TAG** table holds information related to the different tags a post can have.  A post can be tagged with "art", "photography", and "animation".  
For each tag selected, a new entry is entered into the tag table.  A post can have anywhere between 0 and 3 tags.


## How to setup and run project

1) Install Node JS (https://nodejs.org/en/download/)
2) From the project folder, run the command `npm install`.  This will install all of the dependency packages into the project.
3) Install MYSQL and configure your account information
4) Create a file called `.env` inside the root folder of the project.
5) Inside the `.env` file add your MYSQL database details (replace the xxx with your information):

```
MYSQL_USERNAME = "xxx"
MYSQL_PSWD = "xxx"
MYSQL_HOST = "xxx"
MYSQL_DB = "xxx"
```

where:\
MYSQL_USERNAME is your database username\
MYSQL_PSWD is your database account password\
MYSQL_HOST is the database host location\
MYSQL_DB is the name of the database\

6) From the project folder, run the command `node index.js` OR `npm run dev`.  This should start your web server!
7) Open login.html to login or register

## Screenshots

### Login Page
![Screenshot (1)](https://user-images.githubusercontent.com/61329825/168898204-a0fc0491-3d88-4426-a1c8-4a868c009dff.png)


### Registration Page
![Screenshot (2)](https://user-images.githubusercontent.com/61329825/168898353-ef58f73f-3b69-45e3-862f-7447f1193b5c.png)


### Home Page with no posts
![Screenshot (3)](https://user-images.githubusercontent.com/61329825/168898562-f914e294-bcc1-4aac-90f2-433b4c99813f.png)


### Submitting a post
**Part 1 - Uploading Image**
![Screenshot (4)](https://user-images.githubusercontent.com/61329825/168900649-20bc6089-bae9-4afe-b554-b9d4ac2e8df0.png)

**Part 2 - Adding Caption and Tags**
![Screenshot (5)](https://user-images.githubusercontent.com/61329825/168900784-3ee89861-d980-402b-a71c-ac6427e857f3.png)


### Profile Page
**Main Page**
![Screenshot (6)](https://user-images.githubusercontent.com/61329825/168901353-07b13155-5140-4ed1-b025-5263b6b8d2da.png)

**Edit Username**
![Screenshot (7)](https://user-images.githubusercontent.com/61329825/168901883-9ceab67f-6cac-449a-8539-b25ca58d58e6.png)


**Delete Account**
Once you click on the Delete Account button, an alert pops on the screen asking you to confirm that you'd like to delete your account.  
Deleting you account deletes all posts, comments, and tags associated with you account.
![Screenshot (8)](https://user-images.githubusercontent.com/61329825/168902002-9b77e76b-4075-4b26-b8e6-9a4f2eface74.png)


### Home page with posts
![Screenshot (9)](https://user-images.githubusercontent.com/61329825/168903740-8cc4e168-36fa-415b-8524-5b1a55635975.png)


### Post with no comments
The comment section (space below the post) is empty since there are no comments
![Screenshot (10)](https://user-images.githubusercontent.com/61329825/168904185-ca4862d8-99dd-4a0b-ba19-cb312c35dbf7.png)


### Comment submission (Leave a comment button clicked)
![Screenshot (11)](https://user-images.githubusercontent.com/61329825/168904394-fa259acb-cf05-4fa8-a2a6-a35ea8688355.png)


### Post with comments
![Screenshot (13)](https://user-images.githubusercontent.com/61329825/168904893-bd2adf8d-3daf-4286-aff4-046f1f4c5a54.png)


### Posts filtered by a tag
A User can filter by 3 different tags {art, photography, and animation}.  To do this, hover over the "Explore" dropdown button 
and select a tag.  In this case, I selected Photography.
![Screenshot (14)](https://user-images.githubusercontent.com/61329825/168905122-39d33fd0-1a51-4f22-9842-ab1c3d1f7ec5.png)







