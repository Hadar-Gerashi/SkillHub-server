import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./config/cloudinary.js";


import { connectToDB } from "./config/DB.js"
import courseRouter from "./routes/course.js";
import userRoutes from "./routes/user.js";
import orderRouter from "./routes/order.js";



dotenv.config()
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectToDB()
app.use(cors())
app.use(express.json())
app.use(express.static("public"));


app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
// Cloudinary storage setup
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "uploads",
      format: async (req, file) => "jpg",
      public_id: (req, file) => file.originalname.split(".")[0],
    },
  });
  
  const upload = multer({ storage });
  
  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "לא נבחר קובץ" });
    }
    console.log("📤 התמונה הועלתה ל:", req.file.path);
    res.json({ filePath: req.file.path });
  });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/uploads/"); // ✔ תיקיית שמירת קבצים
//     },
//     filename: (req, file, cb) => {
//         const fileName = req.body.fileName || file.originalname; // אם לא נשלח שם, נשמור את השם המקורי
//         // חיתוך שם הקובץ עד לנקודה האחרונה (למשל "image.test" מתוך "image.test.jpg")
//         const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
//         const fileExtension = path.extname(file.originalname); // סיומת הקובץ
//         cb(null, nameWithoutExtension + fileExtension); // שמירה בשם הקובץ עם הסיומת
//     }
// });

// const upload = multer({ storage }); // ✔ כאן הגדר
// app.post("/upload", upload.single("image"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: "לא נבחר קובץ" });
//     }

//     console.log("📂 התמונה נשמרה ב:", req.file.path); // ✅ מציג את הנתיב שבו נשמר הקובץ

//     res.json({ filePath: `/uploads/${req.file.filename}` });
// });


app.use("/api/course", courseRouter)
app.use("/api/user", userRoutes)
app.use("/api/order", orderRouter)
let port = process.env.PORT;


app.use((err, req, res, next) => {
    return res.status(500).json({ title: "שגיאה בשרת", message: err.message });
});


app.listen(port, () => {
    console.log("app is listening in port " + port)
})



