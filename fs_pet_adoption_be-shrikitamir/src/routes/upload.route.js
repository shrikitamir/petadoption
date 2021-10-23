const router = require("express").Router();
const { urlFromCloudinary, upload } = require("../../config/cloudinary");

router.post("/", upload.single("file"), urlFromCloudinary, async (req, res) => {
  try {
    res.send(req.body.image);
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

module.exports = router;
