import { MongoClient } from "mongodb";

const commentsHandler = async (req, res) => {

    // The parameter is called eventID since I named this file as such!
    const eventID = req.query.eventID;
    console.log(req.query);
    const client = await MongoClient.connect(`mongodb+srv://quantumomid:${process.env.MONGO_DB_USER_PASSWORD}@cluster0.garht.mongodb.net/events?retryWrites=true&w=majority`);

    if(req.method === "POST") {
        const { email, name, text } = req.body;
        // server side validation
        if(
            !email || 
            !email.includes("@") || 
            !name || 
            name.trim() === "" ||
            !text ||
            text.trim() === ""
            ) {
                res.status(422).json({ message: "Invalid input" });
                return;
        }

        const newComment = {
            email,
            name, 
            text,
            eventID,
        }
        console.log({ newComment });

        const db = client.db();

        const result = await db.collection("comments").insertOne(newComment);
        // console.log({ result });

        //MongoDB will automatically add an Id for us - can add 
        //this now so that frontend data also has access to the id
        newComment.id = result.insertedId;

        res.status(201).json({ message: "Comment successfully added!", comment: newComment });
    }

    if(req.method === "GET") {

        const db = client.db();

        // get only comments belonging to specific event id comments from database and sort in descending order of _id
        // so that the latest comment is first comment
        const comments = await db.collection("comments")
            .find({ eventID: eventID })
            .sort({ _id: -1 })
            .toArray();
        // const dummyList = [
        //     { id: "c1", name: "John", text: "Did not like this!" },
        //     { id: "c2", name: "Stacey", text: "It was okay" }
        // ];

        res.status(200).json({ comments });
    }

    client.close();
}

export default commentsHandler;