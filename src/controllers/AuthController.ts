import { Request, Response } from 'express';
import { validationResult} from 'express-validator';
import {User} from "../models/User";
import { cpfValidator } from "../helpers/cpfValidator";
import {createSession, destroySession} from "../helpers/session"
import bcrypt from 'bcrypt';  

export const signin =  async (req: Request, res: Response)=>{
    let values = req.body; //store form data
    let errors = validationResult(req); //store form errors
    let path = "pages/signin"; //store the path for render
    let user; //store user data  
    let notify_error = "Usuário e/ou senha incorretos"; //store notification message
    
    //there are errors in the form
    if(!errors.isEmpty()){
        res.render(path,{
            formErrors:errors.mapped(), 
            values})
        return
    }

    //get user data from db
    user = await User.getOneByCPF({cpf:values.cpf}) 

    
    if (user == undefined){
        //user doesn't exist
        res.render(path,{
            notify_error,
            values
        })
    }else{
        //user exist
        let match; 
        match = await bcrypt.compare(values.password,user.passwordHash);
        //Is the form's password the same as the user's password?
        if (!match){
            //passoword doesn't matched
            res.render(path,{notify_error, values})
        }else{ 
            //passoword matched
            let userSession = createSession(req,user) //create session
            //redirect
            if(userSession.isAdmin){
                //the user is an administrator
                res.redirect('admin/editions')
                return
            }
            if(userSession.isReviewer){
                //the user is a reviewer
                res.redirect('user/reviewer/myReviews')
                return
            }
            //the user doesn't have privilages
            res.redirect('user/myArticles')
        }
    }
    
};//OK
export const signup =  async (req: Request, res: Response)=>{
    let values = req.body;//store form data
    let errors = validationResult(req); //store form errors
    let path = "pages/signup"; //store the path for render
    let user; //store user data  
    let notify_error = "Usuário e/ou senha incorretos"; //store notification message

    //there are errors in the form
    if(!errors.isEmpty()){
        res.render(path,{
            formErrors:errors.mapped(), 
            values})
        return
    }
    if(cpfValidator(values.cpf) == false){
        notify_error = "CPF inválido!"
        res.render(path,{
            notify_error,
            values}
            )
        return
    }
    //get user data from db
    user = await User.getOneByCPF({cpf:values.cpf})  
    
    if (user != undefined){
        //There is a user in the database
        res.render(path,{
            notify_error,
            values}
            )
    }else{
        //create user
        await User.userCreate(values);
        req.flash("notify_success", "Cadastro efetuado, digite sua senha para continuar!");
        req.flash("cpf", values.cpf);
        res.redirect('/')
    }
};//OK
export const signupReviewer =  async (req: Request, res: Response)=>{
    let values = req.body;//store form data
    let errors = validationResult(req); //store form errors
    let path = "pages/signupReviewer"; //store the path for render
    let user; //store user data  
    let notify_error = "Usuário e/ou senha incorretos"; //store notification message

    //there are errors in the form
    if(!errors.isEmpty()){
        res.render(path,{
            formErrors:errors.mapped(), 
            values})
        return
    }
    //get user data from db
    user = await User.getOneByCPF({cpf:values.cpf})  

    if (user != undefined){
        //Update data user
        values.isReviewer = true;
        values._id = user._id
        await User.userUpdate(values);
        req.flash("cpf", values.cpf);
        req.flash("notify_success", "Cadastro efetuado, digite sua senha para continuar!");
        res.redirect('/')
    }else{
        //create a user
        await User.userCreate(values);
        user = await User.getOneByCPF({cpf:values.cpf})
        values.isReviewer = true; 
        values._id = user._id
        //update data user with reviewer credencials
        await User.userUpdate(values);
        req.flash("notify_success", "Cadastro efetuado, digite sua senha para continuar!");
        req.flash("cpf", values.cpf);
        res.redirect('/')
    }
};//OK
export const resetPassword = async (req: Request, res: Response)=>{
    let values = req.body;//store form data
    let errors = validationResult(req); //store form errors
    let path = "pages/resetPassword"; //store the path for render
    let user; //store user data  
    let notify_error = "CPF não encontrado"; //store notification message

    //There are error in the form
    if(!errors.isEmpty()){
        res.render(path,{
            formErrors:errors.mapped(), 
            values})
        return
    }
    //get user data from db
    user = await User.getOneByCPF({cpf:values.cpf})  
    
    if (user == undefined){
        //There isn`t a user in the database
        res.render(path,{
            notify_error,
            values}
            )
    }else{
        if(values.email.toLowerCase() != user.email.toLowerCase()){
        //email doesn`t matched
        notify_error = "Email não corresponde ao CPF informado"
        res.render(path,{
            notify_error,
            values}
            )
        }else{
            //email matches
            await User.userUpdate({_id:user._id,password:values.cpf});
            req.flash("notify_success", "Sua senha agora é seu CPF. Troque-a ao fazer o login no sistema!");
            req.flash("cpf", values.cpf);
            res.redirect('/')
        }
        
        
    }
};//OK
export const signout = (req: Request, res: Response)=>{
    destroySession(req);
    req.flash("notify_error","Faça login para entrar no SGCIC")
    res.redirect('/');
};//OK



