const SQL = require("@nearform/sql");
const { query } = require("../config/db");

const adminAuth = async (req, res, next) => {
  const response = await query(
    SQL`SELECT isAdmin from users WHERE userId = ${req.user.userId}`
  );
  if (response.length === 0)
    return res.status(404).send({ error: "Please re-login" });
  if (response[0].isAdmin !== 1)
    return res.status(401).send({ error: "Not an admin" });
  next();
};

module.exports = adminAuth;
