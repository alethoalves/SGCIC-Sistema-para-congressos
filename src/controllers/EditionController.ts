import { query, Request, Response } from 'express';
import { validationResult, matchedData } from 'express-validator';
import User from "../models/User";
import bcrypt from 'bcrypt';
export const addEdition =  async (req: Request, res: Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error:errors.mapped()});
        return
    }
    const data = matchedData(req);
    const user = await User.findOne({
        cpf : data.cpf
    })
    if (user){
        res.json({
            error:{cpf:{msg:'CPF já cadastrado.'}}
        });
        return
    }
    const passwordHash = await bcrypt.hash(data.password,10);
    const newUser = new User({
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        isAdmin:data.isAdmin,
        isEvaluator:data.isEvaluator,
        passwordHash,
        
    });
    await newUser.save()
    res.json({tudoCerto:true})
};

export const getList =  async (req: Request, res: Response)=>{
    let users = await User.find({});
    users.forEach(element => {
        element.passwordHash =""
    });
    res.json({users}) 
};

export const getFilterList =  async (req: Request, res: Response)=>{
    let textSearch = req.params.textSearch;
    let e = await User.find({});
    let users = e.filter(item=>
        item.name.toString().toLowerCase().indexOf(textSearch)>-1 ||
        item.cpf.toLowerCase().indexOf(textSearch)>-1 ||
        item.email.toLowerCase().indexOf(textSearch)>-1
    )
    res.json({users})
};

export const edit =  async (req: Request, res: Response)=>{
    
};
export const del =  async (req: Request, res: Response)=>{
    let id = req.params.id;
    await User.deleteOne({_id:id});
    res.json({message:"Usuário excluído!"})
};
