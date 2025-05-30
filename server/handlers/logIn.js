const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const DB = "blurter";
const USERS_COLLECTION = "users";

const logIn = async (req, res) => {
    const { username, password } = req.body;
    const client = new MongoClient(MONGO_URI);

    //verify that login credentials are given
    if (!username || !password) {
        return res.status(400).json({
            status: 400,
            message: "Please provide both your username and password."
        })
    }

    try {
        await client.connect();
        const db = client.db(DB);

        //Verify that user with given username exists
        const existingUsername = await db.collection(USERS_COLLECTION).findOne({ username });
        if (!existingUsername) {
            return res.status(404).json({
                status: 404,
                message: "We couldn't find an account with this username. Please try again."
            })
        }

        //Verify that password matches
        if (password !== existingUsername.password) {
            return res.status(404).json({
                status: 404,
                message: "Password incorrect. Please try again."
            })
        }

        res.status(200).json({
            status: 200,
            message: "Successfully logged in.",
            data: existingUsername.username
        });

    } catch (error) {
        res.status(502).json({
            status: 502,
            message: error.message
        });

    } finally {
        await client.close();
    }
}

module.exports = logIn