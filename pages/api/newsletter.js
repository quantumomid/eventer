import { MongoClient } from "mongodb";

const connectDatabase = async () => {
    const client = await MongoClient.connect(
        `mongodb+srv://quantumomid:${process.env.MONGO_DB_USER_PASSWORD}@cluster0.garht.mongodb.net/events?retryWrites=true&w=majority`
    );
    return client;
}

const insertEmail = async(client, document) => {
    // connect to the database
    const db = client.db();

    // get specific collection from database
    await db.collection("newsletter").insertOne(document);
}

const newsletterHandler = async (req, res) => {
    if(req.method === "POST") {
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes("@")) {
            res.status(422).json({ message: "Invalid email address" });
            return;
        }

        let client;
        try {
            client = await connectDatabase();
        } catch (error) {
            res.status(500).json({ message: "Connection to database failed!" });
            return;
        }

        try {
            await insertEmail(client, { email: userEmail });
            //disconnect from client once done!
            client.close();
        } catch (error) {
            res.status(500).json({ message: "Inserting data to database failed!" });
            return;
        }

        // console.log({userEmail});
        res.status(201).json({ message: "Signed up!" });
    }
}

export default newsletterHandler;