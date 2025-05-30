const express = require("express");
require("dotenv").config();
const { PORT } = process.env

const signUp = require("./handlers/signUp");
const logIn = require("./handlers/logIn");

const app = express();

app.use(express.json());

app.post("/signup", signUp)
app.get("/login", logIn);

// 404 handler as a middleware (catch-all)
app.use((req, res) => {
    res.status(404).json({
    status: 404,
    message: "Sorry, incorrect fetch endpoint."
    });
});

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
