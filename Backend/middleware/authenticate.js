const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const authenticate = async (req, res, next) =>
{
    try
    {
        const token = req.cookies.jwtoken;
        const verify = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.getUserById(verify.userId);

        if (!rootUser)
        {
            throw new Error("User not found.");
        }

        if (!rootUser.tokens.includes(token))
        {
            throw new Error("Unauthorized user.");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser.userId;

        next();
    }
    catch (error)
    {
        res.status(401).json({ error: "Unauthorized user." });
        console.log("Error in authentication middleware:", error);
    }
};

module.exports = authenticate;
