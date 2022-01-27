import { connectDatabase, insertDocument } from "../../mongodb/utils";

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
            await insertDocument(client, "newsletter", { email: userEmail });
            //disconnect from client once done!
            client.close();
        } catch (error) {
            res.status(500).json({ message: "Inserting data to database failed!" });
            return;
        }
        res.status(201).json({ message: "Signed up!" });
    }
}

export default newsletterHandler;