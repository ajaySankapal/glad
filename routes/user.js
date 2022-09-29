import express from "express";
import userController from "../controllers/user.js";
import upload from "../middleware/upload.js";
import middile from '../middleware/require.js';
import authenticate from "../middleware/authenticate.js";



 
const router = express.Router();
//authentication
router.use( '/register',upload.fields([{name:'pimage',maxcount:1}]));
// router.use( '/registers',upload.fields([{name:'pimage',maxcount:1}]));

//post request
 router.post ('/register', userController.register);
 router.post ('/login',userController.login);
 router.post ('/addProduct',userController.addProduct);
 router.post ('/addLoaction',userController.addLoaction);
//  router.post ('/registers', userController.registers);
 

// router.post('/login', UserController.userLogin)
 router.post('/verify', userController.verifyOTP)

//get request
// router.get ('/getLocation',userController.getLocation);

router.get ('/costumersInvoice', userController.costumersInvoice);
router.get ('/GetdailyDetails',authenticate, middile.admin, userController.GetdailyDetails);

//patch request
router.patch ('/editProfile',authenticate, userController.editProfile);
router.patch('/changeUserPasswordbyId/:id',authenticate,middile.admin,userController.changeUserPasswordbyId);

 export default router;