import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hacker-portfolio",
    // Yahan 'pdf' add kiya hai taaki resume upload ho sakay
    allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"], 
  },
});

export default multer({ storage });