const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const DB = "blurter";
const BLURTS_COLLECTION = "blurts";

const toggleLikeForBlurt = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const { _id, username } = req.body;
    const query = { _id };

    if (!_id || !username) {
        return res.status(400).json({
            status: 400,
            message: "Please ensure username and blurt are provided",
        })
    }

    try {
        await client.connect();
        const db = client.db(DB);

        let updatedLikes;

        //Find blurt
        const foundBlurt = await db.collection(BLURTS_COLLECTION).findOne( query );
        if (!foundBlurt) {
            return res.status(404).json({
                status: 404,
                message: "Blurt not found."
            })
        }
        
        //Find if username is already in likes array
        const usernameIndex = foundBlurt.likes.indexOf(username);

        if (usernameIndex !== -1) {
            foundBlurt.likes.splice(usernameIndex, 1);
            updatedLikes = await db.collection(BLURTS_COLLECTION).updateOne( query, { $set: { likes: foundBlurt.likes }})

        } else {
            foundBlurt.likes.push(username);
            updatedLikes = await db.collection(BLURTS_COLLECTION).updateOne( query, { $set: { likes: foundBlurt.likes }})
        }

        //Confirm that likes array has been modified
        if (updatedLikes.modifiedCount === 0) {
            return res.status(500).json({
                status: 500,
                message: "Like toggle failed. No changes were made."
            })
        }

        return res.status(200).json({
            status: 200,
            message: "Like toggled for blurt."
        })

    } catch (error) {
        res.status(502).json({
            status: 502,
            error: error.message,
        })
    
    } finally {
        await client.close();
    }
}

module.exports = toggleLikeForBlurt;