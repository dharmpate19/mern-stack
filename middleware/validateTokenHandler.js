const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader =  req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.user = decoded.user;
            next(); 
    } else{
            res.status(401);
            throw new Error("User is not Authorized or token is missing")
        }
});

module.exports = validateToken;