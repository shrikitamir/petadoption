const router = require("express").Router();
const userController = require("../controllers/user.controller");
const adminAuth = require("../../middlewares/adminAuth");
const {
  validationMid,
  editUserSchema,
} = require("../../middlewares/validation");

router.put(
  "/edituser/:id",
  validationMid(editUserSchema),
  userController.editUser
);
router.get("/getusers", adminAuth, userController.getUsers);
router.get("/userpage/:id", adminAuth, userController.userPage);

module.exports = router;
