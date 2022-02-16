import { getSession } from "next-auth/client";

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
}

export default changePasswordHandler;