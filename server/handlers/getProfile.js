const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const DB = "blurter";
const USERS_COLLECTION = "users";

const getProfile = async (req, res) => {
    const { _id } = req.params;
    const client = new MongoClient(MONGO_URI);

    // Verify that userId is provided
    if (!_id) {
        return res.status(400).json({
            status: 400,
            message: "User Id is missing. Please try again."
        })
    }

    try {
        await client.connect();
        const db = client.db(DB);

        // Provide user information: username, profilePicture, bio, followers & following
        const foundUser = await db.collection(USERS_COLLECTION).findOne({ _id });
        const safeUserInfo = {
            username: foundUser.username,
            profilePicture: foundUser.profilePicture,
            bio: foundUser.bio,
            followers: foundUser.followers,
            following: foundUser.following
        }
        res.status(201).json({
            status: 201,
            data: safeUserInfo
        })

    } catch(error) {
        res.status(502).json({
            status: 502,
            message: error.message
        })

    } finally {
        await client.close();
    }

}

module.exports = getProfile