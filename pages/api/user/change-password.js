import { getSession } from "next-auth/client";
import { connectDatabase } from "../../../mongodb/utils";
import { verifyPassword, hashPassword } from "../../../lib/auth";

const changePasswordHandler = async (req, res) => {
    if(req.method !== "PATCH") return;
    
    const session = await getSession({ req: req });

    if (!session) {
        res.status(401).json({ message: 'Not authenticated!' });
        return;
    }

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    // Get user details from MongoDB 
    const client = await connectDatabase();
    const usersCollection = client.db().collection("users");

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
        res.status(404).json({ message: 'User not found.' });
        client.close();
        return;
    }

    // Check if password user provided now at front end matches the current password in database
    const currentPassword = user.password;

    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
  
    if (!passwordsAreEqual) {
        // status code 401 indicates authenticated user but NOT authorised 
        res.status(403).json({ message: 'Invalid password.' });
        client.close();
        return;
    }

    // Now that we have verified user is authenticated and authorised - lets hash the new password and 
    // send to the MongoDB 
    const hashedPassword = await hashPassword(newPassword);

    const result = await usersCollection.updateOne(
      { email: userEmail },
      { $set: { password: hashedPassword } }
    );

    client.close();
    res.status(200).json({ message: 'Password updated!' });
}

export default changePasswordHandler;