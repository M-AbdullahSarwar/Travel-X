import { MongoClient } from "mongodb";


export default async function handler(req,res){

    if(req.method === 'POST'){
        const tripdata=req.body.tripdata;

        const client = await MongoClient.connect("mongodb+srv://admin:admin123@testing.dc4lc.mongodb.net/travel_x?retryWrites=true&w=majority&appName=Testing");
        const db = client.db()
        const bookingsCollection = db.collection('bookings');

        const result = await bookingsCollection.insertOne(tripdata)

        client.close();

        res.status(200).json({message:'Trip booked successfully', data:result})
    }
    else{
        const client = await MongoClient.connect("mongodb+srv://admin:admin123@testing.dc4lc.mongodb.net/travel_x?retryWrites=true&w=majority&appName=Testing")
        const db = client.db()
        const bookingsCollection = db.collection('bookings');

        const result = await bookingsCollection.find().toArray()

        client.close()
        
        res.status(200).json({data:result})
    }
}
