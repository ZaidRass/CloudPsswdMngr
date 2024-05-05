const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const authenticate = async (req, res, next) =>
{
    try
    {
        const token = req.cookies.jwtoken;
        const verify = jwt.verify(token, process.env.SECRET_KEY);

        var rootUser = await User.getUserById(verify._id);

        if (!rootUser || !rootUser.tokens.some(t => t.token === token))
        {
            throw new Error("User not found or token not valid");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
    }
    catch (error)
    {
        res.status(401).json({ error: "Unauthorized user." });
        console.log("Error in authentication middleware:", error);
    }
};

module.exports = authenticate;
