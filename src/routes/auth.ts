import { Router } from 'express'; 
import { FormAuthValidator } from '../validators/FormAuthValidator';
import * as AuthController from '../controllers/AuthController';
import * as IndexController from '../controllers/IndexController';
const router = Router(); 

router.get('/',IndexController.form_signin);//OK
router.get('/signin',IndexController.redirectSignin);//OK
router.post('/signin',FormAuthValidator.signin,AuthController.signin);//OK
router.get('/signup',IndexController.form_signup);//OK
router.get('/signupReviewer/62fbeec60c32a345ca1c497b',IndexController.form_signupReviewer);//OK
router.post('/signupReviewer',FormAuthValidator.signupReviewer,AuthController.signupReviewer);//OK

router.post('/signup',FormAuthValidator.signup,AuthController.signup);//OK
router.get('/resetPassword',IndexController.form_resetPassword);//OK
router.post('/resetPassword',FormAuthValidator.resetPassword,AuthController.resetPassword);//OK
router.get('/signout',AuthController.signout);//OK


export default router;