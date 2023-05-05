const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // res.json({ decoded });
    req.userId = decoded.sub;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token", token: token });
  }
};
