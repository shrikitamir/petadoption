const router = require("express").Router();
const likeController = require("../controllers/like.controller");

router.put("/like/:id", likeController.likePet);
router.delete("/unlike/:id", likeController.unlikePet);

module.exports = router;
