const SQL = require("@nearform/sql");
const { query } = require("../../config/db");
const logger = require("../../config/winston");

class LikeSql {
  static async likePetQuery(userId, petId) {
    try {
      await query(
        SQL`INSERT INTO likes VALUES (${petId}, ${userId});UPDATE pets SET likes = (SELECT COUNT(*) FROM likes WHERE likePetId = ${petId}) WHERE petId = ${petId};`
      );
      return { message: "Pet liked" };
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }

  static async unlikePetQuery(userId, petId) {
    try {
      await query(
        SQL`DELETE FROM likes WHERE likeUserId = ${userId};UPDATE pets SET likes = (SELECT COUNT(*) FROM likes WHERE likePetId = ${petId}) WHERE petId = ${petId};`
      );
      return { message: "Pet unliked" };
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }
}

module.exports = LikeSql;
