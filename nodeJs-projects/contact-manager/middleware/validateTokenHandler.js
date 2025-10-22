const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateCookieToken = asyncHandler(async (req, res, next) => {
  // 1️⃣ Check if the token exists in cookies
  const token = req.cookies?.token;

  if (!token) {
    res.status(401);
    throw new Error("User not authorized, token missing");
  }

  // 2️⃣ Verify the token
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user; // attach user info to req
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Token is invalid or expired");
  }
});

module.exports = validateCookieToken;
