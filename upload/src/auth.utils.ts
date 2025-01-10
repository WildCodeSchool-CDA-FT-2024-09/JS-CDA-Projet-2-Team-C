const jwt = require("jsonwebtoken");
const Cookies = require("cookies");

// This method checks for validity of a JWT contained in a cookie
// the parameter req.user.sub contains the user id from the database

const verifyCookie = (req, res, next) => {
    const cookies = new Cookies(req, res);
    const token = cookies.get("token");
  
    if (!token) {
      res.status(401).send("Access denied. No token provided.");
    }
  
    try {
      // decypher jwt and add its contents to request
      const decoded = jwt.verify(token, process.env.APP_SECRET);
      req.user = decoded; /// what if nothing is decoded then ? eh ? 
  
      next();
    } catch (err) {
      res.status(401).send("Invalid token.");
    }
  };