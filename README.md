# blurter

Hi, this is just a current personal project of mine.
Blurter is going to be a Twitter clone.
I'm creating this primarily to review my MERN stack and to add to my portfolio.

Feel free to provide me comments or tips or hit me up for anything else!

# Features:
- User Registration/ Login
- Create / Edit/ Delete Posts
- Like Posts
- Leave Comments
- Like Comments
- User Profiles
- Follow/ Unfollow
- Feed Page


# FrontEnd Contexts:

[ currentUser, setCurrentUser ]  
[ posts, setPosts ]  
[ comments, setComments ]  

# React Routes:
```
/signup
/login
/feed
/explore
/profile/:username
/create
```

# MongoDB:

**user document:**
```
{
  userId: uuid v4
  username: String.
  email: String.
  password: String
  profilePicture: String,
  bio: String,
  followers: [ userId array ],
  following: [ userId array ]
}
```

**post document:**
```
{
  postId: uuid v4
  author: objectId
  content: String,
  imageUrl: string.
  likes: [ userId array ],
  createdAt: Date
}
```
**comment document:**
```
{
  postId: ObjectId,
  author: ObjectId,
  text: String,
  createdAt: Date
  likes: [ userId array ]
}
```

# Backend operations:

Create user (registration)  
Read user (login)  
Update user (update profile)  

Create post   
Update post (Edit post)  
Delete post   
Update post (Likes)  

Create comment  
Update comment (Likes)  


