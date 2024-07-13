import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            // console.log("No token provided");
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded token:", decoded); // Log the decoded token

        if (!decoded) {
            // console.log("Invalid token");
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.id).select("-password");
        // console.log("User found:", user); // Log the user found

        if (!user) {
            // console.log("User not found");
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protect route middleware", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;
