import { MongoClient } from "mongodb";

const newsletterHandler = async (req, res) => {
    if(req.method === "POST") {
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes("@")) {
            res.status(422).json({ message: "Invalid email address" });
            return;
        }

        const client = await MongoClient.connect(
            `mongodb+srv://quantumomid:${process.env.MONGO_DB_USER_PASSWORD}@cluster0.garht.mongodb.net/events?retryWrites=true&w=majority`
        );

        // connect to the database
        const db = client.db();

        // get specific collection from database
        await db.collection("newsletter").insertOne({ email: userEmail });

        //disconnect from client once done!
        client.close();

        // console.log({userEmail});
        res.status(201).json({ message: "Signed up!" });
    }
}

export default newsletterHandler;