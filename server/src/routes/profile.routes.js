import { Router } from 'express'
import profileController from '../controllers/profile.controller.js'
import protect from '../middleware/protect.js'
// Yahan 'uploadResume' ko 'resumeUpload' ka alias (doosra naam) dein
import { uploadImage, uploadResume as resumeUpload } from '../utils/upload.js'

const router = Router()
// Controller se 'uploadResume' (handler) nikal rahe hain
const { getProfile, upsertProfile, uploadPic, uploadResume } = profileController()

router.get('/', getProfile)
router.put('/', protect, upsertProfile)

// Middleware mein 'resumeUpload' use karein aur handler mein 'uploadResume'
router.post('/upload-pic', protect, uploadImage.single('profilePic'), uploadPic)
router.post('/upload-resume', protect, resumeUpload.single('resume'), uploadResume)

export default router