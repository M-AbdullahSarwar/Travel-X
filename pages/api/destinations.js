import { MongoClient } from "mongodb"

async function handler(req, res) {
    const client = await MongoClient.connect("mongodb+srv://mongodb:server@cluster0.qkiba.mongodb.net/travel_x?retryWrites=true&w=majority&appName=Cluster0")
    const db = client.db()

    const result = await db.collection("destinations").find().toArray()
    res.status(200).json({destinations:result})

}

export default handler