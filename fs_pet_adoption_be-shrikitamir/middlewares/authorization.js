const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  if (!req.headers.authorization)
    return res
      .status(401)
      .send({ message: "Must provide an authorization header" });
  const token = req.headers.authorization.replace("Bearer ", "");
  if (!token) return res.status(401).send({ error: "Unauthorized" });
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.status(403).send({ error: "Please re-login" });
    req.user = user;
    next();
  });
};

const sign = (userId) => {
  return jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN, {
    expiresIn: "4h",
  });
};

module.exports = { sign, authorize };
