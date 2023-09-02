const dotenv = require("dotenv");
dotenv.config();

const checkAdminAccess = (req, res, next) => {
    const adminToken = req.headers["x-admin-token"];
    if (adminToken === process.env.ADMIN_TOKEN) {
        next();
    } else {
        res.status(403).json({ message: "Access denied" })
    }
}

module.exports = checkAdminAccess;