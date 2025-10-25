import express, {Request, Response, NextFunction, Router} from 'express'; 
import authMiddleware from '../middlewares/authMiddleware';
import { ForgetPassword,resetPassword } from '../controllers/AgentController';
import { CreateAgent,GetAgent,loginAgent,QuickEmail,GetBookingByAgentId,GetBill,OneWayTrip,RoundTrip,GetOneWayTrip,GetRoundTrip,UpdateOneWayTrip, sendOtp, verifyOtp } from '../controllers'; 
import { Emailotps } from '../controllers/EmailotpsController'; 
import { dashboard } from '../controllers/LoginController';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
const multer = require('multer');
import fs from 'fs';
import path from 'path';
const uploadDir = "/uploads";



// Configure Multer
const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: (error: Error | null, destination: string) => void) => {
        cb(null, uploadDir);
    },
    filename: (req: Request, file: any, cb: (error: Error | null, filename: string) => void) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });
const router = express.Router(); 

router.post(
  '/registration',
  upload.fields([
    { name: 'Gst_Tax_Certificate', maxCount: 1 },
    { name: 'COI_Certificate', maxCount: 1 }
  ]),
  CreateAgent
);

// router.post('/registration',upload.single('Gst_Tax_Certificate') ,upload.single('COI_Certificate'), CreateAgent); 
// router.post('/forgotpassword',forgotPassword); 
// router.post('/resetpassword',resetpassword);
router.post('/ForgetPassword',ForgetPassword); 
router.post('/ResetPassword',resetPassword);
router.get('/GetAgent',GetAgent); 
router.post('/login',loginAgent);  
// router.post('/emailsend',EmailSend); 
router.post('/getbill',GetBill); 
router.post('/Emailotps',Emailotps); 
router.post('/OneWayTrip',OneWayTrip); 
router.get('/GetOneWayTrip',GetOneWayTrip); 
router.put('/UpdateOneWayTrip',UpdateOneWayTrip); 
router.post('/RoundTrip',RoundTrip); 
router.get('/GetRoundTrip',GetRoundTrip);
router.post('/send-otp', sendOtp);
router.post('/QuickEmail',QuickEmail);
router.post('/verify-otp', verifyOtp);
router.get('/GetBookingByAgentId/:id',GetBookingByAgentId);
router.get('/dashboard', authMiddleware, dashboard);
export {router as AgentRoute}; 
