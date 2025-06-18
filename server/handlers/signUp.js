const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env
const { v4: uuidv4 } = require("uuid");

const DB = "blurter";
const USERS_COLLECTION = "users";

const signUp = async (req, res) => {
    const { username, email, password, profilePicture } = req.body;
    const client = new MongoClient(MONGO_URI);

    //verify if minimum user params are provided
    if (!username || !email || !password) {
        return res.status(400).json({
            status: 400,
            message: "Please provide an username, email and password."
        });
    }
    try {
        await client.connect();
        const db = client.db(DB);

        //Verify if username is already taken
        const existingUsername = await db.collection(USERS_COLLECTION).findOne({
            username: { $regex: `^${username}$`, $options: 'i' }
        });

        if (existingUsername) {
            return res.status(409).json({
                status: 409,
                message: "Username taken, please try a different name."
            });
        }

        //Verify if email is already taken
        const existingEmail = await db.collection(USERS_COLLECTION).findOne({ email });
        if (existingEmail) {
            return res.status(409).json({
                status: 409,
                message: "Email in use, please provide another email."
            });
        }
        
        //Create new user document
        const newUser = {
            _id: uuidv4(),
            username,
            email,
            password,
            profilePicture,
        };
        const result = await db.collection(USERS_COLLECTION).insertOne(newUser);
        
        //Verify if there's any server issue resulting in no new user
        if (!result.acknowledged) {
            return res.status(500).json({
                status: 500,
                message: "Server issue - Could not create user."
            });
        }
        res.status(201).json({
            status: 201,
            message: "User successfully created.",
        })
        
    } catch (error) {
        res.status(502).json({
            status: 502,
            message: error.message
        });
        
    } finally {
        await client.close();
    }
}

module.exports = signUp