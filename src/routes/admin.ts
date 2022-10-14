import { Router } from 'express';
// Import de middlewares
import { query, Request, Response } from 'express';
import { validationResult, matchedData } from 'express-validator';
import * as Auth from '../middlewares/Auth'
import { FormValidator } from '../validators/FormValidator';
import Edition from "../models/Edition";
import Article from "../models/Article"; 


// Import de controllers
import * as AdminController from '../controllers/AdminController';
import * as UserController from '../controllers/UserController';
const router = Router(); 
import * as menuHelpers from '../helpers/menu'
import { isValidObjectId } from 'mongoose';
import { KeyObject } from 'crypto';
router.get('/editions',Auth.sessionOn,Auth.admin,AdminController.editions)
router.get('/form/edition/:year?',Auth.sessionOn,Auth.admin,AdminController.viewFormAdminEdition)
router.post('/createOrUpdateEdition',Auth.sessionOn,FormValidator.edition,AdminController.createOrUpdateEdition)
router.post('/updateEdition',Auth.sessionOn,FormValidator.edition,AdminController.updateEdition) 

router.get('/deleteEdition/:year',Auth.sessionOn,AdminController.deleteEdition)

router.get('/dashboard/article/:year',Auth.admin,AdminController.dashboardArticle)
router.get('/articles/:year/:filter1?/:filter1_value?/:filter2?/:filter2_value?/:filter3?/:filter3_value?/:filter4?/:filter4_value?',Auth.admin,AdminController.articles)
router.get('/form/article/:id',Auth.admin,AdminController.viewFormAdminEditArticle)
router.post('/form/article',Auth.admin,FormValidator.articleAdmin,AdminController.createOrUpdateArticle)
router.post('/form/article/del',Auth.admin,FormValidator.articleAdmin,AdminController.deleteArticle)

router.get('/form/new/article',Auth.admin,AdminController.viewFormAdminNewArticle)

//Lista de congressos




export default router;