const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const { authorize } = require("../../middlewares/authorization");
const {
  validationMid,
  registerSchema,
  loginSchema,
  changePassSchema,
} = require("../../middlewares/validation");

router.post(
  "/register",
  validationMid(registerSchema),
  authController.register
);
router.put(
  "/changepass",
  authorize,
  validationMid(changePassSchema),
  authController.changePass
);
router.post("/login", validationMid(loginSchema), authController.postLogin);
router.get("/login", authorize, authController.getLogin);

module.exports = router;
