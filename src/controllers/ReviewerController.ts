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
export const getArticle = async (req:Request, res:Response) => {
    let id = req.body.id;
    let subarea = req.body.subarea;
    let dateNow = new Date()
    let cpf = req.session.user != undefined ? req.session.user.cpf : ''
    let userName = req.session.user != undefined ? req.session.user.name : ''
    let dataArticle = await Article.getById(id)
    let reviewerIsOwner = await Article.getArticleByCpfAndId(cpf,id)
    if (reviewerIsOwner) {
        req.flash("notify_error","Você não pode avaliar seu próprio resumo! Selecione outro!!")
        res.redirect(`/user/reviewer/subareas/${subarea}`)
        return
    }
    if(dataArticle!= undefined && dataArticle.resumo_status == 'Resumo em avaliação'){
        dataArticle = await Article.getById(id)
        req.flash("notify_error","Ops!! Outro avaliador foi mais rápido que você. Selecione outro resumo.")
        res.redirect(`/user/reviewer/subareas/${subarea}`)
        return
    }
    if(dataArticle){
        dataArticle.resumo_status = "Resumo em avaliação";
        dataArticle.resumo_inicio_avaliacao = dateNow.toString();
        dataArticle.resumo_avaliador_cpf = cpf
        await Article.updateArticle(dataArticle,userName)
        req.flash("notify_success","Resumo incluído em Minhas Avaliações. Para avaliar os resumos, volte para a página anterior")
        res.redirect(`/user/reviewer/subareas/${subarea}`)
    }
    
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
export const viewFormReviewerArticle = async (req:Request, res:Response) => {
    let id = req.query.id;
    let schema = await formArticleConstructor.edit_articleReviewer();
    formArticleConstructor.clearValuesAndErrorMsg(schema);
    let path = `/user/reviewer/article/${id}`
    // the id is not a valid object id
    if (!isValidObjectId(id)) {
        req.flash("notify_error", "Não encontrado!");
        res.redirect(path);
        return
    }
    
    let values = await Article.getOneById(req,schema)
    res.render('pages/form_ArticleReviewer',{data:schema, values})
    
};//OK
export const updateReviewerArticle = async (req: Request, res: Response)=>{
    let user = req.session.user;
    let values = req.body;
    let schema = await formArticleConstructor.edit_articleReviewer();
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
    formArticleConstructor.clearValuesAndErrorMsg(schema)
    msg = "Resumo avaliado!"
    
    req.flash("notify_success",msg)
    res.redirect('/user/reviewer/myReviews')
};//OK
