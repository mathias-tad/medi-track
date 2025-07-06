//Make access routes protected routes
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  var token;
  var authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer"))
    token = authHeader.split(" ")[1];

  if (!token) return res.json({ message: "Access denied!!" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    //console.log("Decoded user: ", req.user);
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
