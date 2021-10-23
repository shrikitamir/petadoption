const SQL = require("@nearform/sql");
const { query } = require("../../config/db");
const logger = require("../../config/winston");

class LikeSql {
  static async searchPetsQuery(queryArr, where) {
    try {
      const queryResult = await query(
        SQL`SELECT petId, img, name, status FROM pets ${SQL.glue(
          where
        )} ${SQL.glue(queryArr, " AND ")};`
      );
      return queryResult;
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }

  static async mySavedPetsQuery(userId) {
    try {
      const queryResult = await query(
        SQL`SELECT likeUserId, petId, img, name, status FROM pets LEFT JOIN likes ON pets.petId = likes.likePetId WHERE likeUserId = ${userId};`
      );
      return queryResult;
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }

  static async myOwnedPetsQuery(userId) {
    try {
      const queryResult = await query(
        SQL`SELECT userId, petId, img, name, status FROM pets WHERE userId = ${userId};`
      );
      return queryResult;
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }

  static async userPetsQuery(userId) {
    try {
      const queryResult = await query(
        SQL`SELECT petId, img, name, status FROM pets WHERE userId = ${userId};`
      );
      return queryResult;
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }

  static async petPageQuery(petId) {
    try {
      const queryResult = await query(
        SQL`SELECT * FROM pets LEFT JOIN likes ON pets.petId = likes.likePetId WHERE petId = ${petId};`
      );
      return queryResult;
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }

  static async setStatusQuery(userId, petId, status) {
    try {
      await query(
        SQL`UPDATE pets SET status = ${status}, userId= ${userId} WHERE petId = ${petId};`
      );
      return { message: "Status updated" };
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }

  static async addPetQuery({
    type,
    name,
    color,
    breed,
    height,
    weight,
    dietary,
    hypoallergenic,
    bio,
    photo,
  }) {
    try {
      await query(
        SQL`INSERT INTO pets (type, name, height, weight, color, hypoallergenic, dietary, breed, bio, img) VALUES(${type},${name},${height},${weight},${color},${hypoallergenic},${dietary},${breed},${bio},${photo})`
      );
      return { message: "Pet Added!" };
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }

  static async editPetQuery({
    petId,
    type,
    name,
    status,
    color,
    breed,
    height,
    weight,
    dietary,
    hypoallergenic,
    newImg,
    bio,
  }) {
    try {
      await query(
        SQL`UPDATE pets SET type = ${type}, name = ${name}, height = ${height}, weight = ${weight}, color = ${color}, status = ${status}, hypoallergenic = ${hypoallergenic}, dietary = ${dietary}, breed = ${breed}, bio = ${bio}, img = ${newImg} WHERE petId = ${petId};`
      );
      return { message: "Pet updated" };
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }

  static async petsListQuery() {
    try {
      const queryResult = await query(SQL`SELECT petId, name, type FROM pets;`);
      return queryResult;
    } catch (error) {
      logger.error(error);
      return { error: error };
    }
  }
}

module.exports = LikeSql;
