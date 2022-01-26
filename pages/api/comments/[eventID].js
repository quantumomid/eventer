import { connectDatabase, getDocuments, insertDocument } from "../../../mongodb/utils";

const commentsHandler = async (req, res) => {

    // The parameter is called eventID since I named this file as such!
    const eventID = req.query.eventID;
    // console.log(req.query);

    let client;
    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: "Connection to database failed!" });
        return;
    }

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
                client.close();
                return;
        }

        const newComment = {
            email,
            name, 
            text,
            eventID,
        }
        // console.log({ newComment });

        let result;
        try {
            result = await insertDocument(client, "comments", newComment);
            //MongoDB will automatically add an Id for us - can add 
            //this now so that frontend data also has access to the id
            newComment._id = result.insertedId;
            res.status(201).json({ message: "Comment successfully added!", comment: newComment });
        } catch (error) {
            res.status(500).json({ message: "Inserting data to database failed!" });
            // NOT returning so that we reach the client.close() below to ensure database connected is then closed
            // return;
        }
        // console.log({ result });
    }

    if(req.method === "GET") {
        let comments;
        try {
            // get only comments belonging to specific event id comments from database and sort in descending order of _id
            // so that the latest comment is first comment
            comments = await getDocuments(client, "comments", { _id: -1 }, { eventID: eventID });
            res.status(200).json({ comments });
        } catch (error) {
            res.status(500).json({ message: "Getting comments failed" });
            // return;
        }
    }
    client.close();
}

export default commentsHandler;