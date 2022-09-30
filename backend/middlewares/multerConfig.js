const multer = require("multer");
const path = require("path");
const fs = require("fs");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads/img");
  },
  filename: (req, file, callback) => {
    const originalName = file.originalname.split(".")[0];
    const name = originalName.split(" ").join("_") + "_";

    // const name = file.fieldname + "_";
    const extension = MIME_TYPES[file.mimetype];
    callback(
      null,
      name +
        Date.now() +
        "_" +
        Math.round(Math.random() * 1e9) +
        "." +
        extension
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("gif")
  ) {
    cb(null, true);
  } else {
    cb(null, false, "cc");
  }
};

module.exports = multer({ storage, fileFilter }).single("image");
