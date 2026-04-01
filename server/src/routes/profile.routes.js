import { Router } from 'express'
import profileController from '../controllers/profile.controller.js'
import protect from '../middleware/protect.js'
import { uploadImage, uploadResume } from '../utils/upload.js'

const router = Router()
const { getProfile, upsertProfile, uploadPic, updateResume } = profileController()

router.get('/', getProfile)
router.put('/', protect, upsertProfile)
router.post('/upload-pic', protect, uploadImage.single('profilePic'), uploadPic)
router.post('/upload-resume', protect, uploadResume.single('resume'), updateResume)

export default router