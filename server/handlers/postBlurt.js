const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");

const DB = "blurter";
const BLURTS_COLLECTION = "blurts";

const postBlurt = async (req, res) => {
    const { author, content } = req.body;
    const client = new MongoClient(MONGO_URI);
    const date = new Date();

    if (!author || !content) {
        return res.status(400).json({
            status: 400,
            message: "Please ensure user and blurt are provided."
        })
    }

    try {
        await client.connect();
        const db = client.db(DB);

        //Create new blurt document
        const newBlurt = {
            _id: uuidv4(),
            author,
            content,
            createdAt: date,
            likes: [],
        }
        const result = await db.collection(BLURTS_COLLECTION).insertOne(newBlurt);

        //Verify if there's any server issues resulting in no new blurt
        if (!result.acknowledged) {
            return res.status(500).json({
                status: 500,
                message: "Server issue - Could not create blurt."
            })
        }
        res.status(201).json({
            status: 201,
            message: "Blurt successfully created.",
            data: newBlurt,
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

module.exports = postBlurt