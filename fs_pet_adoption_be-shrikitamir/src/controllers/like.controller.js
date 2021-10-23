const LikeSql = require("../sql/like.sql");
const logger = require("../../config/winston");

class LikeController {
  async likePet(req, res) {
    try {
      const userId = req.user.userId;
      const petId = req.params.id;
      const response = await LikeSql.likePetQuery(userId, petId);
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }

  async unlikePet(req, res) {
    try {
      const userId = req.user.userId;
      const petId = req.params.id;
      const response = await LikeSql.unlikePetQuery(userId, petId);
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }
}

module.exports = new LikeController();
