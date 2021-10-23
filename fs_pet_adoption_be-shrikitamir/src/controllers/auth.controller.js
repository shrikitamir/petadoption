const AuthSql = require("../sql/auth.sql");
const UserSql = require("../sql/user.sql");
const { sign } = require("../../middlewares/authorization");
const bcrypt = require("bcrypt");
const logger = require("../../config/winston");

class AuthController {
  async getLogin(req, res) {
    try {
      if (req.user) {
        const userId = req.user.userId;
        const response = await UserSql.userQuery(userId);
        const { error } = response;
        if (error) return res.status(501).send({ error: error });
        res.send(response[0]);
      } else {
        return res.status(401).send({ error: "Please re-login" });
      }
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }

  async postLogin(req, res) {
    try {
      const { email, password } = req.body;
      const response = await AuthSql.loginQuery(email);
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      if (!response[0])
        return res.status(404).send({ error: "Email doesn't exists!" });
      const passCheck = await bcrypt.compare(password, response[0].password);
      if (!passCheck) return res.status(401).send({ error: "Wrong password!" });
      const token = sign(response[0].userId);
      res.send({ user: response[0], token: token });
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }

  async register(req, res) {
    try {
      const { email, phone, password } = req.body;
      let response = await AuthSql.checkUniqueQuery(email, phone);
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      if (response[0]) {
        if (response[0].email === email) {
          return res.status(400).send({ error: "Email already used." });
        }
        if (response[0].phone === phone) {
          return res.status(400).send({ error: "Phone already used." });
        }
      }
      const passCrypt = await bcrypt.hash(password, 10);
      req.body.password = passCrypt;
      response = await AuthSql.registerQuery(req.body);
      const { error: error2 } = response;
      if (error2) return res.status(501).send({ error: error });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }

  async changePass(req, res) {
    try {
      const { oldPass, newPass, userId } = req.body;
      let response = await AuthSql.userPasswordQuery(userId);
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      if (!response[0])
        return res.status(404).send({ error: "User not found" });
      const oldPassCheck = await bcrypt.compare(oldPass, response[0].password);
      if (!oldPassCheck)
        return res.status(403).send({ error: "Wrong password" });
      const newPassCrypt = await bcrypt.hash(newPass, 10);
      response = await AuthSql.changePassQuery(newPassCrypt, userId);
      const { error: error2 } = response;
      if (error2) return res.status(501).send({ error: error });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }
}

module.exports = new AuthController();
