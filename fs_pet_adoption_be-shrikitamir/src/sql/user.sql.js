const SQL = require("@nearform/sql");
const { query } = require("../../config/db");
const logger = require('../../config/winston')

class UserSql {
  static async getUsersQuery() {
    try {
      const queryResult = await query(SQL`SELECT userId, email FROM users`);
      return queryResult;
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }

  static async userQuery(userId) {
    try {
      const queryResult = await query(
        SQL`SELECT * FROM users WHERE userId = ${userId}`
      );
      return queryResult;
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }

  static async editUserQuery({
    userId,
    firstName,
    lastName,
    email,
    phone,
    bio,
    img,
  }) {
    try {
      const queryResult = await query(
        SQL`UPDATE users SET firstName = ${firstName}, lastName = ${lastName}, email = ${email}, phone = ${phone}, bio = ${bio}, img = ${img} WHERE userId = ${userId}`
      );
      return { message: "User updated" };
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }
}

module.exports = UserSql;
