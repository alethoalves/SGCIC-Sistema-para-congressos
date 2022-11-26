import { Request, Response } from 'express';
import {Article} from "../models/Article";
import * as menuHelpers from '../helpers/menu'
import * as formArticleConstructor from '../helpers/formArticleConstructor'
import { isValidObjectId } from 'mongoose';
import * as validations from '../helpers/validateBody';
import { validationResult} from 'express-validator';
import { User } from '../models/User';
import { Edition } from '../models/Edition';
import { delDuplicate } from '../helpers/delDuplicate';


export const articles = async (req:Request, res:Response) => {
    let year = req.params.year;
    let searchValue = req.query.subarea;
    let edition = await Edition.getOneByYear(year);
    let data;
    let arrayUniqueSubareas;
    if(!edition){
        res.render("private/pages/reviewer/articles",
        {   
            modal:false, 
            error_float:`Não há congresso para o ano de ${year}`,
        })
        return
    }else{
        let cpf = req.session.user != undefined ? req.session.user.cpf : ''
        let dataByCPF = await Article.getByStatusPosterAndCpf("Pôster em avaliação",cpf)
        if(dataByCPF.length > 0){
            req.flash("error_float","Avalie ou devola este poster!")
            res.redirect(`/user/reviewer/article/${dataByCPF[0]._id}`)
            return
        }
        let allData = await Article.getManyByYear(year);
        let arraySubareas = new Array;
        
        if(edition.statusPoster){
            data = allData.filter(item=>{
                return (
                    item.poster_status == 'Pôster aguardando avaliação'
                    )
            })
            data.forEach(e => {
                arraySubareas.push(e.subarea)
            });
            arrayUniqueSubareas = [...new Set(arraySubareas)]
            if(searchValue){
                data = allData.filter(item=>{
                    return (
                        item.poster_status == 'Pôster aguardando avaliação' &&
                        item.subarea == searchValue
                        )
                })
            }
        }
    }
    //let data = await Article.;
    //let status = "Resumo aguardando avaliação"
    //let dataArticle = await Article.getAllBySubareaAndStatus(subarea,status)
    res.render("private/pages/reviewer/articles",
    {   
        modal:false, 
        data,
        arrayUniqueSubareas,
        year,
        //btnSubmission,
        searchValue,
        error_float:req.flash("error_float"),
        success_float:req.flash("success_float"),
        notify_error:req.flash("notify_error"),
        notify_success:req.flash("notify_success")
    })
    
};
export const getArticle = async (req:Request, res:Response) => {
    let id = req.body._id;
    let searchValue = req.body.searchValue ;
    let year = req.body.year;
    let dateNow = new Date()
    let cpf = req.session.user != undefined ? req.session.user.cpf : ''
    let userName = req.session.user != undefined ? req.session.user.name : ''
    let reviewerIsOwner = await Article.getArticleByCpfAndId(cpf,id)
    
    if (reviewerIsOwner) {
        req.flash("error_float","Você não pode avaliar seu próprio resumo! Selecione outro!!")
        res.redirect(`/user/reviewer/articles/${year}?subarea=${searchValue}`)
        return
    }
    let dataArticle = await Article.getById(id)
    if(dataArticle!= undefined && dataArticle.poster_status != 'Pôster aguardando avaliação'){
        dataArticle = await Article.getById(id)
        req.flash("error_float","Ops!! Outro avaliador foi mais rápido que você. Selecione outro resumo.")
        res.redirect(`/user/reviewer/articles/${year}?subarea=${searchValue}`)
        return
    }
    if(dataArticle){
        dataArticle.poster_status = "Pôster em avaliação";
        dataArticle.poster_inicio_avaliacao = dateNow.toString();
        dataArticle.poster_avaliador_cpf = cpf
        await Article.updateArticle(dataArticle,userName)
        req.flash("success_float","Avalie este Pôster")
        res.redirect(`/user/reviewer/article/${id}`)
    }
    
};
export const submitReview = async (req:Request, res:Response) => {
    let id = req.body._id;
    let searchValue = req.body.searchValue ;
    
    let dateNow = new Date()
    let year = dateNow.getFullYear();
    let cpf = req.session.user != undefined ? req.session.user.cpf : ''
    let userName = req.session.user != undefined ? req.session.user.name : ''
    let reviewerIsOwner = await Article.getArticleByCpfAndId(cpf,id)
    
    
    let dataArticle = await Article.getById(id)
    
    if(dataArticle){
        dataArticle.poster_status = "Pôster avaliado";
        dataArticle.poster_fim_avaliacao = dateNow.toString();
        dataArticle.poster_avaliador_cpf = cpf;
        dataArticle.poster_nota_1 = req.body.poster_nota_1;
        dataArticle.poster_nota_2 = req.body.poster_nota_2;
        dataArticle.poster_nota_3 = req.body.poster_nota_3;
        dataArticle.poster_nota_4 = req.body.poster_nota_4;
        dataArticle.poster_nota_5 = req.body.poster_nota_5;
        dataArticle.premio = req.body.premio;

        await Article.updateArticle(dataArticle,userName)
        req.flash("success_float","Escolha outro Pôster para avaliar!")
        res.redirect(`/user/reviewer/articles/${year}`)
    }
    
};
export const returnArticle = async (req:Request, res:Response) => {
    let id = req.params.id;

    let dateNow = new Date()
    let year = dateNow.getFullYear();
    let userName = req.session.user != undefined ? req.session.user.name : ''
    
    
    let dataArticle = await Article.getById(id)

    if(dataArticle){
        dataArticle.poster_status = "Pôster aguardando avaliação";
        dataArticle.poster_inicio_avaliacao = '';
        dataArticle.poster_avaliador_cpf = ''
        await Article.updateArticle(dataArticle,userName)
        res.redirect(`/user/reviewer/articles/${year}`)
    }
    
};
export const myArticles = async (req:Request, res:Response) => {
    //let menu = menuHelpers.createMenuObject(req,'myReviews')
    let cpf = req.session.user != undefined ? req.session.user.cpf : ''
    let data = await Article.getByStatusPosterAndCpf("Pôster em avaliação",cpf)
    const dataAtual = new Date();
    let year = dataAtual.getFullYear();

    res.render("private/pages/reviewer/myArticles",
    {   
        modal:false, 
        data,
        year,
        //btnSubmission,
        error_float:req.flash("error_float"),
        success_float:req.flash("success_float"),
        notify_error:req.flash("notify_error"),
        notify_success:req.flash("notify_success")
    })
};
export const article = async (req:Request, res:Response) => {
    let id = req.params.id;
    let dateNow = new Date()
    let year = dateNow.getFullYear();
    let data = await Article.getById(id)
    res.render('private/pages/reviewer/form_ArticleReviewer',{ 
        data,
        year,
        error_float:req.flash("error_float"),
        success_float:req.flash("success_float"),
        notify_error:req.flash("notify_error"),
        notify_success:req.flash("notify_success")
    })
    
};//OK
 
export const getSubAreas = async (req: Request, res: Response)=>{
    let menu = menuHelpers.createMenuObject(req,'subareas')
    let user = req.session.user;
    let searchValue = req.query.search;
    let subareas;

    if (user!=undefined){
        //get articles by cpf
        let data = await Article.getByStatusResumo("Resumo aguardando avaliação")
        subareas = delDuplicate(data,'subarea');
        
        let subareaList = new Array();
        subareas.forEach(e  => {
            let filterResult = data.filter((value)=>{
                let result = value.subarea == e
                return result
            }) 
            subareaList.push({
                title:e,
                qnt:filterResult.length
            })
        });
        subareaList.sort((x,y)=>{
            let a = x.title.toUpperCase()
            let b = y.title.toUpperCase()
            return a==b ? 0 : a>b ? 1 : -1
        })
        res.render("pages/reviewer_subareas",
        {
            menu,
            dataSession:user,
            subareaList,
            searchValue,
            notify_error: req.flash("notify_error"),
            notify_success:req.flash("notify_success"),
        })
    }
};//OK
export const getSubAreasArticles = async (req:Request, res:Response) => {
    let subarea = req.params.subareas;
    let status = "Resumo aguardando avaliação"
    let dataArticle = await Article.getAllBySubareaAndStatus(subarea,status)

    res.render('pages/reviewerArticles',{
        dataArticle,
        subarea,
        //searchValue,
        //filters,
        notify_success:req.flash("notify_success"),
        notify_error:req.flash("notify_error"),
    })
};

export const getMyReviews = async (req:Request, res:Response) => {
    let menu = menuHelpers.createMenuObject(req,'myReviews')
    let cpf = req.session.user != undefined ? req.session.user.cpf : ''
    let dataArticle = await Article.getByStatusResumoAndCpf("Resumo em avaliação",cpf)

    res.render('pages/myReviews',{
        menu,
        dataArticle,
        notify_success:req.flash("notify_success"),
        notify_error:req.flash("notify_error"),
    })
};
export const clearReviewer = async (req:Request, res:Response) => {
    let id = req.params.id != undefined ? req.params.id : req.query.backto;
    let backto = req.query.backto;
    let dataArticle = await Article.getById(id);
    let userName = req.session.user != undefined ? req.session.user.name : ''
    if(dataArticle){
        dataArticle.resumo_status = "Resumo aguardando avaliação";
        dataArticle.resumo_avaliador_cpf = "";
        dataArticle.resumo_inicio_avaliacao = "";
        dataArticle.resumo_fim_avaliacao = "";
        dataArticle.resumo_titulo_nota = 0;
        dataArticle.resumo_introducao_nota = 0;
        dataArticle.resumo_metodologia_nota = 0;
        dataArticle.resumo_resultado_nota = 0;
        dataArticle.resumo_conclusao_nota = 0;
    }
    await Article.updateArticle(dataArticle,userName)
    req.flash("notify_success","Resumo devolvido para avaliação")
    if(backto){
        let ano = await Article.getById(backto)
        res.redirect(`/admin/dashboard/article/${ano != undefined ? ano.ano :''}`)
    }else{
        res.redirect(`/user/reviewer/myReviews`)
    }
    
};

export const updateReviewerArticle = async (req: Request, res: Response)=>{
    let user = req.session.user;
    let values = req.body;
    let schema// = await formArticleConstructor.edit_articleReviewer();
    let path = values._id != undefined ? 'pages/form_ArticleReviewer' : 'pages/form_newArticle';
    let userName = user ? user.name : ""
    let errorBody = validations.checkErrorForm(req,schema,values)
    let dateNow = new Date()
    if(errorBody != undefined){
        let notify_error="Insira as notas do resumo!"
            res.render(path,{data:schema,notify_error, values})
            return
    }
    
    let msg;
    values.resumo_fim_avaliacao = dateNow.toString();
    values.resumo_status = "Resumo avaliado"
    await Article.updateArticle(values,userName)
    //formArticleConstructor.clearValuesAndErrorMsg(schema)
    msg = "Resumo avaliado!"
    
    req.flash("notify_success",msg)
    res.redirect('/user/reviewer/myReviews')
};//OK
