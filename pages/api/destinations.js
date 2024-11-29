import { MongoClient } from "mongodb"

async function handler(req, res) {
    const client = await MongoClient.connect("mongodb+srv://admin:admin123@testing.dc4lc.mongodb.net/travel_x?retryWrites=true&w=majority&appName=Testing")
    const db = client.db()

    const result = await db.collection("destinations").find().toArray()
    res.status(200).json({destinations:result})

}

export default handler