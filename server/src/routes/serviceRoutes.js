// import express from "express";
// import multer from "multer";
// import path from "path";
// import { createService, deleteService, getAllServices, updateService } from "../controllers/servicesController.js";


// const router = express.Router();

// // Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/services");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) cb(null, true);
//   else cb(new Error("Only image files allowed"));
// };

// const upload = multer({ storage, fileFilter });

// router.get("/all", getAllServices);
// router.post("/", upload.single("image"), createService);
// router.put("/:id", upload.single("image"), updateService);
// router.delete("/:id", deleteService);

// export default router;
