import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import path from "path";


const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpg|jpeg|png|webp/;
  const allowedDocs = /pdf|doc|docx/;

  const ext = path.extname(file.originalname).toLowerCase();

  if (file.fieldname === "image") {
    if (allowedImageTypes.test(ext)) return cb(null, true);
  }

  if (file.fieldname === "resume") {
    if (allowedDocs.test(ext)) return cb(null, true);
  }

  return cb(new Error("Invalid file type"), false);
};


const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "hacker-portfolio/images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    resource_type: "image",
    public_id: `image-${Date.now()}`,
  }),
});

const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);

    return {
      folder: "hacker-portfolio/resumes",
      resource_type: "raw",
      public_id: `${baseName}-${Date.now()}`,
      type: "upload", 
    };
  },
});


export const uploadImage = multer({
  storage: imageStorage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

export const uploadResume = multer({
  storage: resumeStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
