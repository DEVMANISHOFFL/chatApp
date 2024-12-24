import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res.status(401).json({ message: "Invalid token." });
    }

    req.id = decode.userId; // Attach userId to req for use in other routes
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle different types of errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token." });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired." });
    }
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default isAuthenticated;
