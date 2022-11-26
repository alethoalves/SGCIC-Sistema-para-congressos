import { Router } from 'express';
// Import de middlewares
import { query, Request, Response } from 'express';
import { validationResult, matchedData } from 'express-validator';
import * as Auth from '../middlewares/Auth'
import { FormValidator } from '../validators/FormValidator';
import Edition from "../models/Edition";
import Article from "../models/Article"; 
import User from "../models/User"; 


// Import de controllers
import * as AdminController from '../controllers/AdminController';
import * as UserController from '../controllers/UserController';
const router = Router(); 
import * as menuHelpers from '../helpers/menu'
import { isValidObjectId } from 'mongoose';
import { KeyObject } from 'crypto';

//Users
router.get('/users',Auth.admin,AdminController.users);
router.get('/users/del/:cpf',Auth.admin,AdminController.delUser);
router.post('/users',Auth.admin,FormValidator.user,AdminController.updateUser);

//Editions
//router.get('/editions',Auth.sessionOn,Auth.admin,AdminController.editions)
router.get('/editions',Auth.admin,AdminController.editions);
router.get('/editions/del/:year',Auth.admin,AdminController.delEdition);
router.post('/editions',Auth.admin,FormValidator.edition,AdminController.createOrUpdateEdition)
router.get('/schedule/:year',Auth.admin,AdminController.schedule)
router.get('/articles/:year',Auth.admin,AdminController.articles);
router.get('/article/:id',Auth.admin,AdminController.article);
router.post('/article',Auth.admin,AdminController.createOrUpdateArticle);
router.get('/article/create/:year',Auth.admin,AdminController.createArticle);
router.get('/article/del/:year/:id',Auth.admin,AdminController.deleteArticle);
router.get('/dashboard/poster/:year/:grande_area?/:turno?',AdminController.dashboardPoster);


 



router.get('/dashboard/article/:year',Auth.admin,AdminController.dashboardArticle)
router.get('/articles/:year/:filter1?/:filter1_value?/:filter2?/:filter2_value?/:filter3?/:filter3_value?/:filter4?/:filter4_value?',Auth.admin,AdminController.articles)
//router.get('/form/article/:id',Auth.admin,AdminController.viewFormAdminEditArticle)
router.post('/form/article',Auth.admin,FormValidator.articleAdmin,AdminController.createOrUpdateArticle)
router.post('/form/article/del',Auth.admin,FormValidator.articleAdmin,AdminController.deleteArticle)

//router.get('/form/new/article',Auth.admin,AdminController.viewFormAdminNewArticle)

//Lista de congressos




export default router;