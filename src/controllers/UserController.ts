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
function createTurno(data,area) {
    let resultado;
    switch (area) {
    case 'Artes e Humanidades':
        resultado = createPosters(data,2) 
        break;
    case 'Saúde e Vida':
        resultado =  createPosters(data,2)
        break;
    case 'Exatas e Tecnológicas':
        resultado =createPosters(data,1)
        break;
    default:
        break;
    }
    return resultado
    }
function createPosters(data,num){
    let turnoMatutino = new Array;
    let turnoVespertino = new Array;

    let dataTurnoMatutino = data.filter(item=>{
        return (
            item.poster_turno == 'Matutino' 
            )
    });
    for (let i = 0; i < 500; i++) {
        let index = dataTurnoMatutino.map(e => e.poster_numero).indexOf(101+i);
        let status;
        if(index == -1){
            status = 'poster-desocupado'
        }else{
            switch (dataTurnoMatutino[index].poster_status) {
                case 'Pôster aguardando checkin':
                    status = 'poster-reservado'
                    break;
                case 'Pôster aguardando avaliação':
                    status = 'poster-aguardandoAvaliacao'
                    break;
                case 'Pôster em avaliação':
                    status = 'poster-emAvaliacao'
                    break;
                case 'Pôster avaliado':
                    status = 'poster-avaliado'
                    break;
                default:
                    break;
            }
        }
        turnoMatutino.push(
            {
                num: 101+i,
                status
            }
        )
    };
    if(num == 2){
        
        let dataTurnoVespertino = data.filter(item=>{
            return (
                item.poster_turno == 'Vespertino' 
                )
        });
        for (let i = 0; i < 500; i++) {
            let index = dataTurnoVespertino.map(e => e.poster_numero).indexOf(101+i);
            let status;
            if(index == -1){
                status = 'poster-desocupado'
            }else{
                switch (dataTurnoVespertino[index].poster_status) {
                    case 'Pôster aguardando checkin':
                        status = 'poster-reservado'
                        break;
                    case 'Pôster aguardando avaliação':
                        status = 'poster-aguardandoAvaliacao'
                        break;
                    case 'Pôster em avaliação':
                        status = 'poster-emAvaliacao'
                        break;
                    case 'Pôster avaliado':
                        status = 'poster-avaliado'
                        break;
                    default:
                        break;
                }
            }
            turnoVespertino.push(
                {
                    num: 101+i,
                    status
                }
            )
        };
    }
if(num == 2){
    return [
        {
            name:'Matutino',
            list: turnoMatutino
        },
        {
            name:'Vespertino',
            list: turnoVespertino
        }
    ]
}else{
    return [
        {
            name:'Matutino',
            list: turnoMatutino
        }
    ]
}
    
}
export const getMyArticles = async (req: Request, res: Response)=>{
    let submission = await Edition.getByStatusSubmit(true);
    let btnSubmission;
    if(submission[0]==undefined){
        btnSubmission = false
    }else{
        btnSubmission = true
    }
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
        res.render("private/pages/user/myArticles",
        {   

            modal:false, 
            data,
            //year:submission[0].year,
            btnSubmission,
            searchValue,
            error_float:req.flash("error_float"),
            success_float:req.flash("success_float"),
            notify_error:req.flash("notify_error"),
            notify_success:req.flash("notify_success")
        })
    }
};//OK
export const createArticle = async (req:Request, res:Response) => {
    let submission = await Edition.getByStatusSubmit(true);
    let btnSubmission;
    if(submission[0]==undefined){
        btnSubmission = false
    }else{
        btnSubmission = true
    }
    let user = req.session.user;
    let searchValue = req.query.search;
    let values = req.body;
    let userName = user ? user.name : ""
    
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.render("private/pages/user/myArticles",
        {   
            modal:true, 
            data:values,
            formErrors:errors.mapped(),
            btnSubmission,
            searchValue,
            error_float:req.flash("error_float"),
            success_float:req.flash("success_float"),
            notify_error:req.flash("notify_error"),
            notify_success:req.flash("notify_success")
        })
        return
    }
    
    
    let cpf_orientador = values.orientador_cpf != "" ? cpfValidator(values.orientador_cpf) : true,
        cpf_autor = values.autor_cpf != "" ? cpfValidator(values.autor_cpf) : true,
        cpf_co_autor = values.co_autor_cpf != "" ? cpfValidator(values.co_autor_cpf) : true
    
    let formErrors = {
        orientador_cpf: {
          value: '',
          msg:!cpf_orientador?'CPF inválido':undefined ,
          param: 'orientador_cpf',
          location: 'body'
        },
        autor_cpf: {
          value: '',
          msg: !cpf_autor?'CPF inválido':undefined,
          param: 'autor_cpf',
          location: 'body'
        },
        co_autor_cpf: {
          value: '',
          msg: !cpf_co_autor?'CPF inválido':undefined,
          param: 'co_autor_cpf',
          location: 'body'
        }
      }
    
    if(!cpf_orientador || !cpf_autor || !cpf_co_autor){
        res.render("private/pages/user/myArticles",
        {   
            modal:true, 
            data:values,
            formErrors,
            btnSubmission,
            searchValue,
            error_float:req.flash("error_float"),
            success_float:req.flash("success_float"),
            notify_error:req.flash("notify_error"),
            notify_success:req.flash("notify_success")
        })
        return
    }
    formErrors.orientador_cpf.msg = 'Seu CPF deve estar aqui ou nos outros campos de CPF';
    formErrors.autor_cpf.msg = 'Seu CPF deve estar aqui ou nos outros campos de CPF'
    formErrors.co_autor_cpf.msg = 'Seu CPF deve estar aqui ou nos outros campos de CPF'
    
    let errorCPF = validations.checkCPF(user,values)
    if (errorCPF!=undefined){
        res.render("private/pages/user/myArticles",
        {   
            modal:true, 
            data:values,
            formErrors,
            btnSubmission,
            searchValue,
            error_float:req.flash("error_float"),
            success_float:req.flash("success_float"),
            notify_error:"Você está tentando submeter um resumo para outro CPF. Seu CPF deve estar em algum dos campos correspondentes.",
            notify_success:req.flash("notify_success")
        })
        return
    }
    await Article.createArticle(values,userName);
    let data = await Article.getManyByCPF(user?.cpf);
    res.render("private/pages/user/myArticles",
        {   

            modal:false, 
            data,
            year:submission[0].year,
            btnSubmission,
            searchValue,
            error_float:req.flash("error_float"),
            success_float:"Resumo criado!",
            notify_error:req.flash("notify_error"),
            notify_success:req.flash("notify_success")
        })

};
export const article = async (req:Request, res:Response) => {
    let id = req.params.id; 
    let data = await Article.getById(id);
    let dataAllArticles;
    let dataPosters;
    if(data?.grande_area){
        dataAllArticles = await Article.getAllByYearAreaLessPosterArquivado(data?.ano,data.grande_area)
        dataPosters =  createTurno(dataAllArticles,data.grande_area)
    }
    let dataEdition = data? await Edition.getOneByYear(data.ano) : null;
    let local_apresentacao = dataEdition?.local_apresentacao;
    let codVideo = data?.link_video?.slice(-11);
    let day;
    let hour;
    switch (data?.grande_area) {
        case 'Artes e Humanidades':
            day = dataEdition?.date_artes
            break;
        case 'Saúde e Vida':
            day = dataEdition?.date_saude
            break;
        case 'Exatas e Tecnológicas':
            day = dataEdition?.date_exatas
            break;
        
        default:
            break;
    }
    switch (data?.poster_turno) {
        case 'Matutino':
            hour = dataEdition?.hour_am
            break;
        case 'Vespertino':
            hour = dataEdition?.hour_pm
            break;
        default:
            break; 
    }

    res.render("private/pages/user/article",
    {   
        modal:false, 
        dataPosters,
        data,
        day,hour,local_apresentacao,codVideo,
        nameEdition: dataEdition ? dataEdition.title : null,
        error_float:req.flash("error_float"),
        success_float:req.flash("success_float"),
        notify_error:req.flash("notify_error"),
        notify_success:req.flash("notify_success")
    })

};
export const checkin = async (req:Request, res:Response) => {
    let id = req.body._id;
    let status = req.body.poster_status;
    let user = req.session.user;
    let userName = user ? user.name : "";
    let msg;
    if(status === 'Pôster aguardando checkin' && req.body.poster_numero && req.body.poster_turno){
        req.body.poster_status = 'Pôster aguardando avaliação'
        await Article.updateArticle(req.body,userName)
        msg = 'Checkin realizado'
        req.flash("success_float", msg);
        res.redirect(`/user/article/${id}`);
    }else if(status != 'Pôster aguardando checkin' && req.body.poster_numero && req.body.poster_turno){
        msg = 'Checkin já realizado!';
        req.flash("error_float", msg);
        res.redirect(`/user/article/${id}`);
    }else{
        msg = 'Não foi possível fazer o checkin!';
        req.flash("error_float", msg);
        res.redirect(`/user/article/${id}`);
    }
    
    
}





/** 

export const viewFormNewArticle = async (req: Request, res: Response)=>{
    let schema = await formArticleConstructor.newArticle();
    formArticleConstructor.clearValuesAndErrorMsg(schema)
    req.flash("notify_error", `O congresso de 2022 não está recebendo resumos!`);
    res.redirect('/user/myArticles');
        
    
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

        if(e != ""){
            if (e!=undefined) {
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
    let edition = await Edition.getOneByYear(values?.ano)
    if (!edition?.statusSubmit) {
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
        let values = await User.getOneByCPF(req.session.user.cpf);
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




*/