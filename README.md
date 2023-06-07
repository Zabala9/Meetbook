# __Meetbook__

<p align="center">
    <img src="https://meetbook-seeds.s3.us-west-1.amazonaws.com/meetbook-main.png"  width="450" height="230">
</p>

---

Meetbook is an online social media that can be access from any computer with internet connectivity.

After register, the users can post text and photos, which are shared with any other user who have an account. Users also have access to a profile where they can see their own created posts.
As well users can comment or like different posts.
Users also can search for a specific person to see his/her posts.

---

## __Demo__
You can check the website clicking [here!](https://meetbook.onrender.com/)

---

## **Technologies Used**
Technologies used to create this application were __PostgreSQL__ database on __Ruby on Rails__ in the backend, and __JavaScript__, __React/Redux__, __HTML__ and __CSS__ for the frontend.
**AmazonS3** to store image data from my database, and **Render** hosts the website.

---

## **Featured Features**

- __Likes__:  I designed the likes functionality using React/Redux and JavaScript. Users could click on the Like button associated with a post, triggering an action that updated the like count and visually indicated the user's interaction with the post. 
    To ensure an interactive experience, I utilized real-time updated. Whenever a user liked a post, the like count was instantly updated across the platform, providing immediate feedback to both the user who liked the post and other users viewing it.

    While creating this feature, I encountered an issue where users could like a post but were unable to remove their like. o address this challenge, I implemented a solution that involved fetching the relevant information for the likes and incorporating a filter functionality. This filter allowed me to determine if the user had already liked the post or not. By implementing this solution I successfully enabled users to engage with posts by liking or unliking them.

- __Posts__: I implemented the functionality for users to create, edit and delete posts. I designed an intuitive form where users could enter the content, including text, images and multimedia elements, and then save or update the post. The Post feature also included interactive elements such as liking and commenting on posts, allowing users to express their appreciation and engage in discussions. 

    While adding this feature, one particular challenge I encountered was disokaying the owner's name for each post. Initially, the app only showed the name of the logged-in user. To overcome this limitation, I devised a solution that involved fetching all users' data and implementing a usersReducer to store this information in the application's state. By deploying this solution, I successfully retrieved the necessary data and now display the owner's name for every post.


---

## **Code Snippets**

Search functionality

```js
allUsers.forEach((user) => {
    if(valueSearch.includes(' ')){
        const newValueSearch = valueSearch.split(' ');

        if(valueSearch[1] !== ' '){
            if(user.name.toLowerCase().includes(newValueSearch[0]) && user.lastname.toLowerCase().includes(newValueSearch[1])){
                arr.push([user.name + ' ' + user.lastname, user.id]);
            }
        } else {
            if(user.name.toLowerCase().includes(newValueSearch[0])){
                arr.push([user.name + ' ' + user.lastname, user.id]);
            } else if(user.lastname.toLowerCase().includes(newValueSearch[0])){
                arr.push([user.name + ' ' + user.lastname, user.id]);
            }
        }

    } else {
        if(user.name.toLowerCase().includes(valueSearch)){
            arr.push([user.name + ' ' + user.lastname, user.id]);
        } else if(user.lastname.toLowerCase().includes(valueSearch)){
            arr.push([user.name + ' ' + user.lastname, user.id]);
        };
    }
    
});
```

Functionality for create or delete a like

```js
const handleSubmit = (e) => {
    e.preventDefault();
    like = {...like, postId, authorId};
    if(likesCurrentPost.length === 0){
        dispatch(createLike(like));
    } else {
        if(currentUserLikes.length > 0){
            dispatch(deleteLike(currentUserLikes[0].id));
        } else if (currentUserLikes.length === 0){
            dispatch(createLike(like));
        }
    }
};
```

Functionality for create or update a comment

```js
const formType = commentId ? 'Update comment' : 'Create comment';

const handleSubmit = (e) => {
    e.preventDefault();
    comment = {...comment, content, authorId, currentPostId};
    formType === 'Create comment' ? dispatch(createComment(comment)) :
        dispatch(updateComment(comment));
    setContent('');
};
```