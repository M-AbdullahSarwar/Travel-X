// import { MongoClient } from "mongodb";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./auth/[...nextauth]";

// export default async function handler(req, res) {
//     // Get the session using getServerSession
//     const session = await getServerSession(req, res, authOptions);

//     if (!session) {
//         return res.status(401).json({ message: "Please sign in to continue" });
//     }

//     const client = await MongoClient.connect(process.env.MONGODB_URI || "mongodb+srv://admin:admin123@testing.dc4lc.mongodb.net/travel_x?retryWrites=true&w=majority&appName=Testing");
//     const db = client.db();
//     const wishlistCollection = db.collection('wishlist');

//     try {
//         if (req.method === 'POST') {
//             const wishlistdata = req.body.wishlistdata;

//             // Check if already in wishlist
//             const existing = await wishlistCollection.findOne({
//                 id: wishlistdata.id,
//                 userId: session.user.id
//             });

//             if (existing) {
//                 client.close();
//                 return res.status(400).json({ 
//                     message: 'Destination already in wishlist',
//                     value: true 
//                 });
//             }

//             const result = await wishlistCollection.insertOne(wishlistdata);
//             client.close();
//             return res.status(200).json({
//                 message: 'Added to wishlist successfully',
//                 value: true,
//                 wishlistdata: result
//             });
//         }

//         if (req.method === 'GET') {
//             const result = await wishlistCollection.find({
//                 userId: session.user.id
//             }).toArray();
            
//             client.close();
//             return res.status(200).json({ data: result });
//         }

//         if (req.method === 'DELETE') {
//             const { did } = req.body;
//             const result = await wishlistCollection.deleteOne({
//                 id: did,
//                 userId: session.user.id
//             });
            
//             client.close();
//             return res.status(200).json({ message: 'Removed from wishlist' });
//         }

//     } catch (error) {
//         client.close();
//         return res.status(500).json({ message: 'Server error', error: error.message });
//     }

//     client.close();
//     return res.status(405).json({ message: 'Method not allowed' });
// }

import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ message: "Please sign in to continue" });
    }

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGODB_URI || "mongodb+srv://admin:admin123@testing.dc4lc.mongodb.net/travel_x?retryWrites=true&w=majority&appName=Testing");
        const db = client.db();
        const wishlistCollection = db.collection('wishlist');

        if (req.method === 'POST') {
            const wishlistdata = {
                ...req.body.wishlistdata,
                userId: session.user.id
            };
            console.log(wishlistdata)

            // Check if already in wishlist for this specific user
            const existing = await wishlistCollection.findOne({
                id: wishlistdata.id,
                userId: session.user.id
            });

            if (existing) {
                return res.status(400).json({ 
                    message: 'Destination already in your wishlist',
                    value: true 
                });
            }

            const result = await wishlistCollection.insertOne(wishlistdata);
            return res.status(200).json({
                message: 'Added to wishlist successfully',
                value: true,
                wishlistdata: result
            });
        }

        if (req.method === 'GET') {
            const result = await wishlistCollection.find({
                userId: session.user.id
            }).toArray();
            
            return res.status(200).json({ data: result });
        }

        if (req.method === 'DELETE') {
            const { did } = req.body;
            const result = await wishlistCollection.deleteOne({
                id: did,
                userId: session.user.id
            });
            
            return res.status(200).json({ message: 'Removed from wishlist' });
        }

        return res.status(405).json({ message: 'Method not allowed' });

    } catch (error) {
        console.error('Wishlist API Error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        if (client) {
            await client.close();
        }
    }
}


