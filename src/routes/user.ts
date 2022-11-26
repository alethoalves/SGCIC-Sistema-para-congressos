import { Router } from 'express'; 
import * as Auth from '../middlewares/Auth'
import { FormValidator } from '../validators/FormValidator'; 
import { FormAuthValidator } from '../validators/FormAuthValidator'; 

import * as UserController from '../controllers/UserController';
import * as ReviewerController from '../controllers/ReviewerController';

const router = Router();  


//User 
router.get('/myArticles',Auth.sessionOn,UserController.getMyArticles);//OK
router.post('/article/create',Auth.sessionOn,FormValidator.article,UserController.createArticle);
router.get('/article/:id',Auth.sessionOn,UserController.article);
router.post('/article/checkin',Auth.sessionOn,UserController.checkin);



/** 
router.get('/newArticle',Auth.sessionOn,UserController.viewFormNewArticle);//OK
router.post('/createOrUpdateMyArticle',Auth.sessionOn,FormValidator.article,UserController.createOrUpdateMyArticle)
router.get('/editArticle/:id',Auth.sessionOn,UserController.viewFormEditArticle)
//router.get('/myCertificates',Auth.sessionOn,UserController.myCertificates);
router.get('/myProfile',Auth.sessionOn,UserController.myProfile);  
router.post('/myProfile',Auth.sessionOn,FormValidator.editMyProfile,UserController.updateMyProfile)
router.post('/myProfile/update/password',Auth.sessionOn,FormValidator.updatePassword,UserController.updatePassword)
*/
//Reviewer
router.get('/reviewer/articles/:year',Auth.sessionOn,Auth.reviewer,ReviewerController.articles);//OK
router.post('/reviewer/article',Auth.sessionOn,Auth.reviewer,ReviewerController.getArticle);//OK
router.get('/reviewer/article/:id',Auth.sessionOn,Auth.reviewer,ReviewerController.article);//OK
router.get('/reviewer/myArticles',Auth.sessionOn,Auth.reviewer,ReviewerController.myArticles);//OK
router.get('/reviewer/return/:id',Auth.sessionOn,Auth.reviewer,ReviewerController.returnArticle);//OK
router.post('/reviewer/article/submit',Auth.sessionOn,Auth.reviewer,ReviewerController.submitReview);//OK


router.get('/reviewer/subareas',Auth.sessionOn,Auth.reviewer,ReviewerController.getSubAreas);//OK
router.get('/reviewer/subareas/:subareas',Auth.sessionOn,Auth.reviewer,ReviewerController.getSubAreasArticles);//OK
router.post('/reviewer/getArticle',Auth.sessionOn,Auth.reviewer,ReviewerController.getArticle);//OK
router.get('/reviewer/myReviews',Auth.sessionOn,Auth.reviewer,ReviewerController.getMyReviews);//OK
router.get('/reviewer/clearReviewer/:id?',Auth.sessionOn,Auth.reviewer,ReviewerController.clearReviewer);//OK
//router.get('/reviewer/article',Auth.sessionOn,Auth.reviewer,ReviewerController.viewFormReviewerArticle);//OK
//router.post('/reviewer/article',Auth.sessionOn,Auth.reviewer,FormValidator.articleReviewer,ReviewerController.updateReviewerArticle);//OK


export default router; 