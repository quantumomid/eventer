import { hashPassword } from "../../../lib/auth";
import { connectDatabase } from "../../../mongodb/utils";

const registerHandler = async (req, res) => {

    if (req.method !== "POST") {
        return;
    }

    const { email, password } = req.body;

    // Validations
    if (
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 7
      ) {
        res.status(422).json({
          message:
            'Invalid input - password should also be at least 7 characters long.',
        });
        return;
    }

    const client = await connectDatabase();
    const db = client.db();
    
    // Do a check if user already exists
    const existingUser = await db.collection('users').findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: 'User exists already!' });
      client.close();
      return;
    }

    // Now can proceed to registering a new user! :)
    const hashedPassword = await hashPassword(password);
    const result = await db.collection('users').insertOne({
      email: email,
      password: hashedPassword,
    });

    
    res.status(201).json({ message: 'Created user!' });
    client.close();
}

export default registerHandler;