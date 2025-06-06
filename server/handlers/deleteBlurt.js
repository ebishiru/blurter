const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const DB = "blurter";
const BLURTS_COLLECTION = "blurts";

const deleteBlurt = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const { _id } = req.body;
    const query = { _id };

    try {
        await client.connect();
        const db = client.db(DB);
        const deletion = await db.collection(BLURTS_COLLECTION).deleteOne( query );
        if (deletion.deletedCount === 0) {
            res.status(400).json({
                status: 400,
                message: "Blurt could not be deleted."
            })
        }
        res.status(200).json({
            status: 200,
            message: "Blurt successfully deleted."
        });

    } catch (error) {
        res.status(502).json({
            status: 502,
            error: error.message
        })

    } finally {
        await client.close();
    }
}

module.exports = deleteBlurt;