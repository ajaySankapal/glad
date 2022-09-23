import express from "express";
import staffController from "../controllers/staff.js";
import upload from "../middleware/upload.js";



 
const router = express.Router();
//authentication
// router.use( '/register',upload.fields([{name:'pimage',maxcount:1}]));

//post request
router.post ('/costumersInvoice', staffController.costumersInvoice);
//  router.post ('/login',userController.login);
//  router.post ('/addProduct',userController.addProduct);
//  router.post ('/addLoaction',userController.addLoaction);

// router.post('/login', UserController.userLogin)
//  router.post('/verify', userController.verifyOTP)

//get request
// router.get ('/getLocation',userController.getLocation);


 export default router