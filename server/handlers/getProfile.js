const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const DB = "blurter";
const USERS_COLLECTION = "users";

const getProfile = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const { username } = req.body; 
    
    try {
        await client.connect();
        const db = client.db(DB);
        const user = await db.collection(USERS_COLLECTION).findOne({ username });
        if (!user) {
            res.status(401).json({
                status: 401,
                message: "Could not find user information.",
            })
        }
        res.status(201).json({
            status: 201,
            data: user
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

module.exports = getProfile;