const express = require("express");
require("dotenv").config();
const { PORT } = process.env

const signUp = require("./handlers/signUp");
const logIn = require("./handlers/logIn");
const getProfile = require("./handlers/getProfile");
const getProfilePicture = require("./handlers/getProfilePicture");
const updateProfile = require("./handlers/updateProfile");
const getBlurts = require("./handlers/getBlurts");
const postBlurt = require("./handlers/postBlurt");
const deleteBlurt = require("./handlers/deleteBlurt");
const toggleLikeForBlurt = require("./handlers/toggleLikeForBlurt");

const app = express();

// Increase payload size limit for pictures
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.post("/signup", signUp);
app.post("/login", logIn);

app.post("/profile", getProfile);
app.post("/profilepicture", getProfilePicture);
app.post("/updateprofile", updateProfile);

app.get("/blurts", getBlurts);
app.post("/blurt", postBlurt);
app.delete("/blurt", deleteBlurt);
app.post("/togglelikeforblurt", toggleLikeForBlurt);

// 404 handler as a middleware (catch-all)
app.use((req, res) => {
    res.status(404).json({
    status: 404,
    message: "Sorry, incorrect fetch endpoint."
    });
});

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
