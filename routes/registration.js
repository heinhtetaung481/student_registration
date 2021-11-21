import express from 'express'
const router = express.Router();

import {
  registerStudent,
  getCommonStudents,
  suspendStudent,
  getNotificationRecipients
} from '../controllers/registration.controller.js'

router.post('/register', registerStudent);
router.get('/commonstudents', getCommonStudents);
router.post('/suspend', suspendStudent);
router.post('/retrievefornotifications', getNotificationRecipients)

export default router
