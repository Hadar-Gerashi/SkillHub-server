import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary.js";
import { uploadImage } from "../controllers/upload.js";

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "uploads",
        format: async () => "jpg",
        public_id: (req, file) => file.originalname.split(".")[0],    
    },
});

const upload = multer({ storage })


router.post("/", upload.single("image"), uploadImage)

export default router
