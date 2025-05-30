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
  _id: uuid v4 (UserId)  
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
  _id: uuid v4 (PostId)  
  author: uuid v4
  content: String,
  imageUrl: string.
  likes: [ userId array ],
  createdAt: Date
}
```
**comment document:**
```
{
  _id: uuid v4 (CommentId)  
  author: uuid v4,
  text: String,
  createdAt: Date
  likes: [ userId array ]
}
```

# Backend operations:

Post user (registration)  
Get user (login)
Get user (view profile)  
Update user (update profile)

Create post   
Update post (Edit post)  
Delete post   
Update post (Likes)  

Create comment  
Update comment (Likes)  


