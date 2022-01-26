import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
    const client = await MongoClient.connect(
        `mongodb+srv://quantumomid:${process.env.MONGO_DB_USER_PASSWORD}@cluster0.garht.mongodb.net/events?retryWrites=true&w=majority`
    );
    return client;
}

export const insertDocument = async(client, collection, document) => {
    // connect to the database
    const db = client.db();

    // get specific collection from database
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export const getDocuments = async(client, collection, sort, filter = {}) => {
    const db = client.db();

    const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

    return documents;
}