const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const DB = "blurter";
const USERS_COLLECTION = "users";

const updateProfile = async (req, res) => {
    const { username, profilePicture, bio, followers, following } = req.body;
    const client = new MongoClient(MONGO_URI);

    //Verify that _id is provided
    if (!username) {
        return res.status(400).json({
            status: 400,
            message: "Username is missing. Please try again."
        })
    }

    //Only update the fields that are given
    const updatedFields = {};
    if (profilePicture !== undefined) {
        updatedFields.profilePicture = profilePicture;
    }
    if (bio !== undefined) {
        updatedFields.bio = bio;
    }
    if (followers !== undefined ) {
        updatedFields.followers = followers;
    }
    if (following !== undefined ) {
        updatedFields.following = following;
    }

    //Verify that update is needed
    if (!Object.keys(updatedFields).length) {
        return res.status(400).json({
            status: 400,
            message: "No new fields were provided. Update not needed."
        })
    }

    const query = { username };
    const updatedValues = {
        $set: updatedFields
        };

    try {
        await client.connect();
        const db = client.db(DB);

        //Verify that user exists
        const foundUser = await db.collection(USERS_COLLECTION).findOne({ username });
        if (!foundUser) {
            return res.status(404).json({
                status: 404,
                message: "Could not find user. Please try again."
            })
        }

        //Update User
        const result = await db.collection(USERS_COLLECTION).updateOne(query, updatedValues);
        if (!result.modifiedCount) {
            return res.status(400).json({
                status: 400,
                message: "Server issue, Profile could not be updated. Please try again."
            })
        }
        res.status(202).json({
            status: 202,
            message: "User profile successfully updated."
        })

        } catch (error) {
            res.status(502).json({
                status: 502,
                message: error.message
            })
        
        } finally {
            await client.close();
        }
}

module.exports = updateProfile;