import { MongoClient } from "mongodb";

const url = process.env.DB_URL;
let client;
export const connectToMongodb = () => {
    MongoClient.connect(url).then((clientInstance) => {
        client = clientInstance;
        console.log('Connect to Mongo db');
    }).catch((err) => {
        console.log(`Mongo DB error that is ${err}`)
    });
}

export const getdB = () => {
    return client.db();
}


