const { MongoClient } = require("mongodb");

export default async function handler(req,res) {
    if(req.method === 'POST'){
        const wishlistdata = req.body.wishlistdata

        const client = await MongoClient.connect("mongodb+srv://admin:admin123@testing.dc4lc.mongodb.net/travel_x?retryWrites=true&w=majority&appName=Testing");
        const db = client.db()
        const wishlistCollection = db.collection('wishlist')

        const result = await wishlistCollection.insertOne(wishlistdata)

        client.close();

        res.status(200).json({message:'WishList saved successfully',value:true, wishlistdata:result})
    }
    else if (req.method === 'GET'){

        const client = await MongoClient.connect("mongodb+srv://admin:admin123@testing.dc4lc.mongodb.net/travel_x?retryWrites=true&w=majority&appName=Testing");
        const db = client.db()
        const wishlistCollection = db.collection('wishlist')

        const result = await wishlistCollection.find().toArray()

        client.close();

        res.status(200).json({data:result})
    }
    else if(req.method === 'DELETE'){
        const id = req.body.did

        const client = await MongoClient.connect("mongodb+srv://admin:admin123@testing.dc4lc.mongodb.net/travel_x?retryWrites=true&w=majority&appName=Testing");
        const db = client.db()
        const wishlistCollection = db.collection('wishlist')

        const result = await wishlistCollection.deleteOne({id})

        client.close()

        res.status(200).json({ message: 'Removed from wishlist' });
    }

}