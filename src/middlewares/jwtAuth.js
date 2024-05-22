const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    // const authToken =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI4MjlhYjlkLTQ0Y2EtNDVmYS1iZDBmLTFkNmIxZjE4NGNkZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMTQzODI3NCwiZXhwIjoxNzExNDQxODc0fQ.6yT-46SZ8uVhEpFKt5-fthF0eXdF2lvS7TcdZsmQeUI";
     var authToken = req.headers["x-access-token"];
    //   const authToken = req.headers.authorization;
    console.log("Received authToken:", authToken);

    if (!authToken) {
      return res
        .status(403)
        .json({ error: "Invalid Token. Authorization header missing." });
    }


    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    console.log("Decoded Token:", decodedToken);

    res.locals.user = decodedToken;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Unauthorized. Token Expired." });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized. Invalid Token." });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const authorizeUser = (roles) => {
  return (req, res, next) => {
    console.log("-------------------",  res.locals.user);
    const userRole = res.locals.user.role;
    if (!roles.includes(userRole)) {
      return res
        .status(403)
        .json({ error: "You are not allowed to perform this action." });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeUser };
