import { Request, Response } from 'express';
import {Article} from "../models/Article";
import * as menuHelpers from '../helpers/menu'
import * as formArticleConstructor from '../helpers/formArticleConstructor'
import { isValidObjectId } from 'mongoose';
import * as validations from '../helpers/validateBody';
import { validationResult} from 'express-validator';
import { User } from '../models/User';
import { Edition } from '../models/Edition';
import { cpfValidator } from "../helpers/cpfValidator";

export const getMyArticles = async (req: Request, res: Response)=>{
    let menu = menuHelpers.createMenuObject(req,'myArticles')
    let user = req.session.user;
    let searchValue = req.query.search;
    
    if (user!=undefined){
        //get articles by cpf
        let data = await Article.getManyByCPF(user.cpf)
        let dataArticle = data;
        //or get articles by keyword
        if(searchValue){
            dataArticle = await Article.search(data,searchValue)
        }
        res.render("pages/myArticles",
        {
            menu,
            dataSession:user,
            dataArticle,
            searchValue,
            notify_error: req.flash("notify_error"),
            notify_success:req.flash("notify_success"),
        })
    }
};//OK
export const viewFormNewArticle = async (req: Request, res: Response)=>{
    let schema = await formArticleConstructor.newArticle();
    formArticleConstructor.clearValuesAndErrorMsg(schema)
    res.render('pages/form_newArticle',{data:schema,notify_error: req.flash("notify_error"),notify_success: req.flash("notify_success")})
};//OK
export const createOrUpdateMyArticle = async (req: Request, res: Response)=>{
    let user = req.session.user;
    let values = req.body;
    let schema = await formArticleConstructor.choiceSchemaArticle(req);
    let path = values._id != undefined ? 'pages/form_editArticle' : 'pages/form_newArticle';
    let userName = user ? user.name : ""
    
    let errorBody = validations.checkErrorForm(req,schema,values)
    if(errorBody != undefined){
        let notify_error="Erro no formulário."
            res.render(path,{data:schema,notify_error, values})
            return
    }
    let cpfArray = [values.orientador_cpf,values.autor_cpf,values.co_autor_cpf]
    let cpfOK = true;
    cpfArray.forEach(e => {
        console.log(e)
        if(e != ""){
            if (e!=undefined) {
                console.log(e)
                cpfOK = cpfOK && cpfValidator(e);
            }
            
        }
    }); 
    
    if (!cpfOK) {
        let error = {noError:{msg:''}}
        formArticleConstructor.insertValuesAndErrorMsg(schema,values,error)
        let notify_error="Algum CPF está inválido."
        res.render(path,{data:schema,notify_error, values})
        return
    }
    

    let errorCPF = validations.checkCPF(user,schema,values)
    if (errorCPF!=undefined){
        res.render(path,{data:schema,notify_error:"Você está tentando submeter um resumo para outro CPF. Seu CPF deve estar em algum dos campos correspondentes.", values})
        return
    }
    let msg;
    if (values._id != undefined) {
        await Article.updateArticle(values,userName)
        formArticleConstructor.clearValuesAndErrorMsg(schema)
        msg = "Resumo editado!"
    } else {
        await Article.createArticle(values,userName);
        msg = "Resumo enviado!"
    }
    
    req.flash("notify_success",msg)
    res.redirect('/user/myArticles')
};//OK
export const viewFormEditArticle = async (req:Request, res:Response) => {
    let schema = await formArticleConstructor.edit_meuResumo_externo();
    formArticleConstructor.clearValuesAndErrorMsg(schema);
    let path = "/user/myArticles"
    // the id is not a valid object id
    if (!isValidObjectId(req.params.id)) {
        req.flash("notify_error", "Não encontrado!");
        res.redirect(path);
        return
    }
    
    let values = await Article.getOneByCpfAndId(req,schema)
    let edition = await Edition.getByYear(values?.ano)
    if (edition?.status != 'Congresso online') {
        req.flash("notify_error", `O congresso de ${values?.ano} não está recebendo resumos!`);
        res.redirect(path);
        return
    }
    if (values!=undefined) {
        //the id exists
        switch (values.resumo_status) {
            // the article cannot be edited
            case "Resumo em avaliação": 
            case "Resumo avaliado":
                req.flash("notify_error", "Resumo não disponível para edição!");
                res.redirect(path);
                break;
            // the article can be edited
            default:
                res.render('pages/form_editArticle',{data:schema, values})
                break;
        }  
    }else{
        //the id does not exist
        req.flash("notify_error", "Não encontrado!");
        res.redirect(path)
    } 
};//OK

export const myProfile = async (req: Request, res: Response)=>{
    let menu = menuHelpers.createMenuObject(req,'myProfile');
    
    if (req.session.user) {
        let values = await User.getOneByCPF({cpf:req.session.user.cpf});
        console.log(values)
        res.render('pages/myProfile',{values,menu})
    }
    
};
export const updateMyProfile = async (req: Request, res: Response)=>{
    let values = req.body;//store form data
    let errors = validationResult(req); //store form errors
    let path = "pages/myProfile"; //store the path for render
    let user; //store user data 
    let menu = menuHelpers.createMenuObject(req,'myProfile');
    
    let notify = {
        type:"danger",
        msg:"CPF não encontrado!"
    } //store notification message for user 

    //form have errors
    if(!errors.isEmpty()){
        res.render(path,{
            error:errors.mapped(), 
            values,menu})
    }else{
        console.log(values)
        let user = await User.getOneById(values._id);
        if(user){
            await User.userUpdate(values);
            user = await User.getOneById(values._id);
            if(req.session.user != undefined){req.session.user.cpf = values.cpf}
            let success = "Alteração efetuada!"
            res.render('pages/myProfile',{values:user,menu,success})
        }
    }  
};
export const updatePassword = async (req: Request, res: Response)=>{
    let values = req.body;//store form data
    let errors = validationResult(req); //store form errors
    let path = "pages/myProfile"; //store the path for render
    let user ; //store user data 
    let menu = menuHelpers.createMenuObject(req,'myProfile');
    
    //form have errors
    if(!errors.isEmpty()){
        res.render(path,{
            error:errors.mapped(), 
            values:user,menu})
    }else{
        let user = await User.getOneById(values._id);
        if(user){
            await User.userUpdate(values);
            user = await User.getOneById(values._id);
            let success = "Alteração efetuada!"
            res.render('pages/myProfile',{values:user,menu,success})
        }
        
    }  
};




