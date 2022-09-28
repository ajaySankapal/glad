import express from 'express';
import staffController from '../controllers/staff.js';
import upload from '../middleware/upload.js';
import authenticate from "../middleware/authenticate.js";
import middile from '../middleware/require.js';

const router = express.Router()
//authentication
router.use(
  '/storeInvoice',
  upload.fields([{ name: 'addAttachment', maxcount: 1 }])
)
router.use(
  '/Miscellaneous',
  upload.fields([{ name: 'addAttachment', maxcount: 1 }])
)
//post request
router.post('/costumersInvoice' ,authenticate,middile.staff, staffController.costumersInvoice)
router.post('/storeInvoice',authenticate ,middile.staff,  staffController.storeInvoice)
// router.post('/Miscellaneous', staffController.Miscellaneous)

//  router.post ('/login',userController.login);
//  router.post ('/addProduct',userController.addProduct);
//  router.post ('/addLoaction',userController.addLoaction);

// router.post('/login', UserController.userLogin)
//  router.post('/verify', userController.verifyOTP)

//get request
 router.get ('/getPofile',authenticate, staffController.getPofile);
 router.get ('/getProduct', staffController.getProduct);
 router.get ('/getLocation', staffController.getLocation);
 
 
export default router
