const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const DB = "blurter";
const BLURTS_COLLECTION = "blurts";

const getBlurts = async (req, res) => {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db(DB);
        const blurts = await db.collection(BLURTS_COLLECTION).find().toArray();
        res.status(200).json({
            status: 200,
            data: blurts
        });

    } catch (error) {
        res.status(502).json({
            status: 502,
            message: error.message
        })

    } finally {
        await client.close();
    }
}

module.exports = getBlurts;