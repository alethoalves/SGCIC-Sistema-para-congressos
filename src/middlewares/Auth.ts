import User from "../models/User"; 

export const sessionOn = async (req: any,res: any,next: () => void)=> {
    if(req.session.user!= undefined){
        next() 
        return 
    }
    req.flash("notify_error","Faça o login para acessar o SGCIC")
    res.redirect('/signin') 
};//OK
export const admin = async (req: any,res: any,next: () => void)=> {
    if(req.session.user != undefined){
        if(req.session.user.isAdmin){
            next()
            return
        }
    }
    res.render(
        'public/pages/notAllowed') 
};
export const reviewer = async (req: any,res: any,next: () => void)=> {
    if(req.session.user != undefined){
        if(req.session.user.isReviewer){
            next()
            return
        }
    }
    res.render(
        'public/pages/notAllowed') 
}