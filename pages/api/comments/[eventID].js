

const commentsHandler = (req, res) => {

    // The parameter is called eventID since I named this file as such!
    const eventID = req.query.eventID;

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
            id: new Date().toISOString(),
            email,
            name, 
            text,
        }
        console.log({ newComment });

        res.status(201).json({ message: "Comment successfully added!", comment: newComment });
    }

    if(req.method === "GET") {

        const dummyList = [
            { id: "c1", name: "John", text: "Did not like this!" },
            { id: "c2", name: "Stacey", text: "It was okay" }
        ];

        res.status(200).json({ comments: dummyList });
    }
}

export default commentsHandler;