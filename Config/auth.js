const jwt = require("jsonwebtoken");

const validation = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(`Received Token: ${token}`);

  if (token) {
    try {
      const extractedToken = token.split(" ")[1];
      console.log(`Extracted Token: ${extractedToken}`);

      const decoded = jwt.verify(extractedToken, "SID");
      console.log("Decoded Token:", decoded);

      req.user = { userId: decoded.userId, userRole: decoded.userRole };
      console.log("req.user:", req.user); 
      next();
    } catch (error) {
      console.error("Token Verification Error:", error.message);
      res.status(401).send({ msg: "Invalid Token" });
    }
  } else {
    console.error("Authorization header is missing.");
    res.status(401).send({ msg: "You are not logged in" });
  }
};

const Auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, "SID")
    req.user = { userId: decodedToken.userId, userRole: decodedToken.userRole }    
    if (req.user.userRole === 'admin') {
      return next()
    } else {
     return res.status(401).send({ data : 'Access denied' });
    }
  } catch (error) {
   return  res.status(401).json({ message: 'your not authorazetion' });
  }
};

module.exports = { validation, Auth };
