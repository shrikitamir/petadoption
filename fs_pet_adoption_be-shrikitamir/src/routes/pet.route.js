const router = require("express").Router();
const { authorize } = require("../../middlewares/authorization");
const adminAuth = require("../../middlewares/adminAuth");
const petController = require("../controllers/pet.controller");
const {
  validationMid,
  addPetSchema,
  setStatusSchema,
  editPetSchema,
} = require("../../middlewares/validation");

router.post(
  "/addpet",
  authorize,
  adminAuth,
  validationMid(addPetSchema),
  petController.addPet
);
router.put(
  "/editpet/:id",
  authorize,
  adminAuth,
  validationMid(editPetSchema),
  petController.editPet
);
router.put(
  "/:id/setstatus",
  authorize,
  validationMid(setStatusSchema),
  petController.setStatus
);
router.get("/petslist", authorize, adminAuth, petController.petsList);
router.get("/getmysavedpets/:id", authorize, petController.mySavedPets);
router.get("/getmyownedpets/:id", authorize, petController.myOwnedPets);
router.get("/petpage/:id", petController.petPage);
router.get("/searchpets", petController.searchPets);
router.get("/getuserpets/:id", authorize, adminAuth, petController.userPets);

module.exports = router;
