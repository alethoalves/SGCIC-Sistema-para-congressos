import { Request, Response } from 'express';
 
export const form_signin = (req: Request, res: Response)=>{
    res.render("pages/signin",{
        cpf: req.flash("cpf"),
        notify_success: req.flash("notify_success"),
        notify_error: req.flash("notify_error")
    }) 
};//OK
export const redirectSignin = (req: Request, res: Response)=>{
    res.redirect("/")
};//OK
export const form_signup= (req: Request, res: Response)=>{
    res.render("pages/signup")
};//OK
export const form_signupReviewer= (req: Request, res: Response)=>{
    res.render("pages/signupReviewer")
};//OK
export const form_resetPassword = (req: Request, res: Response)=>{
    res.render("pages/resetPassword")
};//ok

