// routes/newsRoutes.js
import express from "express";
import multer from "multer";
import {
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/", getNews);
router.post("/", upload.single("image"), createNews);
router.put("/:id", upload.single("image"), updateNews);
router.delete("/:id", deleteNews);


export default router;
