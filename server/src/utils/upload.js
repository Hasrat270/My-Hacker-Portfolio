import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary.js'

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hacker-portfolio',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    resource_type: 'image',
  },
})

const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hacker-portfolio',
    allowed_formats: ['pdf'],
    resource_type: 'raw',
  },
})

export const uploadImage  = multer({ storage: imageStorage })
export const uploadResume = multer({ storage: resumeStorage })