import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Get the next-auth session token
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const usersCollection = db.collection('users');

    // Connect to your MongoDB database
    const existingUser = await usersCollection.findOne({ email });

    // Check if the user already exists
    if (existingUser) {
      client.close();
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const result = await usersCollection.insertOne({ email, password });
    client.close();

    res.status(201).json({ message: 'User created', userId: result.insertedId });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}