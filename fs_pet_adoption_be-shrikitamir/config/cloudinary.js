const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./" + "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploadToCloudinary = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

const urlFromCloudinary = async (req, res, next) => {
  try {
    const response = await uploadToCloudinary(req.file.path);
    fs.unlinkSync(req.file.path);
    const fileUrl = response.secure_url;
    req.body.image = fileUrl;
    next();
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

module.exports.upload = multer({ storage });
module.exports.urlFromCloudinary = urlFromCloudinary;
