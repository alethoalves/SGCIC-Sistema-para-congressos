import { Router } from 'express'; 
import { FormAuthValidator } from '../validators/FormAuthValidator';
import * as AuthController from '../controllers/AuthController';
import * as PublicController from '../controllers/PublicController';
const router = Router();  

router.get('/',PublicController.index);//OK 
router.get('/schedule/:year',PublicController.schedule);//OK
router.get('/awards/:year',PublicController.awards);//OK

router.get('/article/:id',PublicController.article);
router.get('/signin',PublicController.form_signin);//OK
router.post('/signin',FormAuthValidator.signin,AuthController.signin);//OK
router.get('/signup',PublicController.form_signup);//OK

router.get('/avaliador',PublicController.form_signinReviewer);//OK
router.post('/signinReviewer',FormAuthValidator.signinReviewer,AuthController.signinReviewer);//OK

router.get('/signupReviewer/62fbeec60c32a345ca1c497b',PublicController.form_signupReviewer);//OK
router.post('/signupReviewer',FormAuthValidator.signupReviewer,AuthController.signupReviewer);//OK

router.post('/signup',FormAuthValidator.signup,AuthController.signup);//OK
router.get('/resetPassword',PublicController.form_resetPassword);//OK
router.post('/resetPassword',FormAuthValidator.resetPassword,AuthController.resetPassword);//OK
router.get('/signout',AuthController.signout);//OK


export default router;