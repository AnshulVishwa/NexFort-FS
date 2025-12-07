import multer from "multer";
import fs from "fs";

fs.mkdirSync("./uploads", { recursive: true });

console.log("Folder ensured");  // Always safe

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage });
