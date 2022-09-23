import express from "express";
import userController from "../controllers/user.js";
import upload from "../middleware/upload.js";



 
const router = express.Router();
//authentication
router.use( '/register',upload.fields([{name:'pimage',maxcount:1}]));

//post request
router.post ('/register', userController.register);
 router.post ('/login',userController.login);
 router.post ('/addProduct',userController.addProduct);
 router.post ('/addLoaction',userController.addLoaction);

// router.post('/login', UserController.userLogin)
 router.post('/verify', userController.verifyOTP)

//get request
router.get ('/getLocation',userController.getLocation);


 export default router