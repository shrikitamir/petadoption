const PetSql = require("../sql/pet.sql");
const SQL = require("@nearform/sql");
const logger = require("../../config/winston");

class PetController {
  async searchPets(req, res) {
    try {
      const query = req.query;
      const queryArr = [];
      const where = [];
      if (Object.keys(query).length !== 0) {
        where.push(SQL`WHERE `);
        if (query.type) {
          queryArr.push(SQL`type = ${query.type}`);
        }
        if (query.status) {
          queryArr.push(SQL`status = ${query.status}`);
        }
        if (query.name) {
          const queryName = `%${query.name}%`;
          queryArr.push(SQL`name LIKE ${queryName}`);
        }
        if (query.maxheight) {
          queryArr.push(SQL`height <= ${query.maxheight}`);
        }
        if (query.maxweight) {
          queryArr.push(SQL`weight <= ${query.maxweight}`);
        }
      }
      const response = await PetSql.searchPetsQuery(queryArr, where);
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }

  async mySavedPets(req, res) {
    try {
      const userId = req.params.id;
      const response = await PetSql.mySavedPetsQuery(userId);
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }

  async myOwnedPets(req, res) {
    try {
      const userId = req.params.id;
      const response = await PetSql.myOwnedPetsQuery(userId);
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }

  async userPets(req, res) {
    try {
      const userId = req.params.id;
      const response = await PetSql.userPetsQuery(userId);
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }

  async petPage(req, res) {
    try {
      const petId = req.params.id;
      const response = await PetSql.petPageQuery(petId);
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }

  async setStatus(req, res) {
    try {
      const { status, userId } = req.body;
      const petId = req.params.id;
      const response = await PetSql.setStatusQuery(userId, petId, status);
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }

  async addPet(req, res) {
    try {
      const { img } = req.body;
      let photo;
      if (!img)
        photo =
          "https://res.cloudinary.com/tamirshriki/image/upload/v1628265639/pkergdriihybpsvbmugb.jpg";
      else photo = img;
      const response = await PetSql.addPetQuery({ ...req.body, photo });
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }

  async editPet(req, res) {
    try {
      const response = await PetSql.editPetQuery(req.body);
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }

  async petsList(req, res) {
    try {
      const response = await PetSql.petsListQuery();
      const { error } = response;
      if (error) return res.status(501).send({ error: error });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: err });
    }
  }
}

module.exports = new PetController();
