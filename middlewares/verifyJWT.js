const jwt = require('jsonwebtoken');
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //     return res.status(401).json({ message: "Unauthorized access" });
    // }
    // const token = authHeader.split(" ")[1];
    // jwt.verify(token, process.env.JWT_TOKEN_secret, function(err, decoded){
    //     if(err){
    //         return res.status(403).json({message:"Forbidden access"});
    //     }
    //     req.decoded = decoded;
    //     next();
    // })
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const {username, userId} = decoded;
        req.username = username;
        req.userId = userId;
        next();
    } catch (error) {
        next("Authentication fail!")
    }
}
module.exports = verifyJWT;