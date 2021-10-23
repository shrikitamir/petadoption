const SQL = require("@nearform/sql");
const { query } = require("../../config/db");
const logger = require("../../config/winston");

class AuthSql {
  static async loginQuery(email) {
    try {
      const queryResult = await query(
        SQL`SELECT * FROM users WHERE email = ${email}`
      );
      return queryResult;
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }

  static async changePassQuery(newPass, userId) {
    try {
      await query(
        SQL`UPDATE users SET password = ${newPass} WHERE userId = ${userId}`
      );
      return { message: "Password Changed" };
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }

  static async userPasswordQuery(userId) {
    try {
      const queryResult = await query(
        SQL`SELECT password from users WHERE userId = ${userId}`
      );
      return queryResult;
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }

  static async registerQuery({ email, firstName, lastName, phone, password }) {
    try {
      await query(
        SQL`INSERT INTO users (email, firstName, lastName, phone, password) VALUES (${email},${firstName},${lastName},${phone},${password})`
      );
      return { message: "Registered Successfully!" };
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }

  static async checkUniqueQuery(email, phone) {
    try {
      const queryResult = await query(
        SQL`SELECT email, phone FROM users WHERE email = ${email} OR phone = ${phone}`
      );
      return queryResult;
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }
}

module.exports = AuthSql;
