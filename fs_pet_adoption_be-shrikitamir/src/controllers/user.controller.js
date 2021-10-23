const UserSql = require("../sql/user.sql");
const AuthSql = require("../sql/auth.sql");
const logger = require("../../config/winston");

class UserController {
  async getUsers(req, res) {
    try {
      const response = await UserSql.getUsersQuery();
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }

  async userPage(req, res) {
    try {
      const userId = req.params.id;
      const response = await UserSql.userQuery(userId);
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }

  async editUser(req, res) {
    try {
      const { email, phone, oldEmail, oldPhone } = req.body;
      if (email !== oldEmail || phone !== oldPhone) {
        const response = await AuthSql.checkUniqueQuery(email, phone);
        const { error } = response;
        if (error) return res.status(501).send({ error: error });
        if (response[0]) {
          response.forEach((e) => {
            if (e.email !== oldEmail && e.email === email) {
              return res.status(400).send({ error: "Email already used." });
            }
            if (e.phone !== oldPhone && e.phone === phone) {
              return res.status(400).send({ error: "Phone already used." });
            }
          });
        }
      }
      const response = await UserSql.editUserQuery(req.body);
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }
}

module.exports = new UserController();
