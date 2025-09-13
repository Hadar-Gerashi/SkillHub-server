
//  העלאת תמונה לענן - cloudinary 
export const uploadImage = (req, res) => {
    if (!req.file || !req.file.path) {
        return res.status(400).json({ error: "No file selected" })
    }
    console.log("Image uploaded to:", req.file.path)
    res.json({ filePath: req.file.path })
}
