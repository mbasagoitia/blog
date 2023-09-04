const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken (req, res, next) {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(403).json({ error: "Token is missing" })
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        console.log(decoded);
        if (err) {
            return res.status(401).json({ error: "Token is invalid" })
        }
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    })
}

module.exports = { verifyToken };