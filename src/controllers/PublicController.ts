import { Request, Response } from 'express';
import {Article} from "../models/Article"; 
import { Edition } from '../models/Edition';
const sortAscAutor = (a, b) => {
    let x = a.autor_nome.toUpperCase(),
        y = b.autor_nome.toUpperCase();
        return x == y ? 0 :x > y ? 1 : -1;
}
export const index = async (req: Request, res: Response)=>{
    let data = await Edition.getOneByYear('2022');
    
    res.render("public/pages/index",{
        data
    }) 
}; 
export const schedule = async (req: Request, res: Response)=>{
    let searchValue = req.query.searchValue,
        poster_turno = req.query.poster_turno,
        grande_area = req.query.grande_area,
        subarea = req.query.subarea;
    let year = req.params.year;
    let dataArticle1 = await Article.getAllByYearAreaLessPosterArquivado(year,'Artes e Humanidades');
    let dataArticle2 = await Article.getAllByYearAreaLessPosterArquivado(year,'Saúde e Vida');
    let dataArticle3 = await Article.getAllByYearAreaLessPosterArquivado(year,'Exatas e Tecnológicas');
    
    let dataArticle = dataArticle1.concat(dataArticle2).concat(dataArticle3).sort(sortAscAutor);
    let listSubAreas = new Array;
    dataArticle.forEach(e => {
        listSubAreas.push(e.subarea)
    });
    let listSubAreasUnique = [...new Set(listSubAreas)];
    if(searchValue){
        dataArticle = await Article.search(dataArticle,searchValue) 
    }
    if(grande_area){
        dataArticle = await Article.filterByArea(dataArticle,grande_area);
    }
    if(subarea){
        dataArticle = await Article.filterBySubarea(dataArticle,subarea);
    }
    if(poster_turno){
        dataArticle = await Article.filterByPosterTurno(dataArticle,poster_turno);
    }

    
    
    let newDataArticle = dataArticle.slice(0,600);
    let dataEdition = await Edition.getOneByYear(year)
    const dayArtes = dataEdition?.date_artes;
    const daySaude = dataEdition?.date_saude;
    const dayExatas = dataEdition?.date_exatas;
    const hour_am = dataEdition?.hour_am;
    const hour_pm = dataEdition?.hour_pm;

    newDataArticle.forEach(e => {
        switch (e.grande_area) {
            case 'Artes e Humanidades':
                e.poster_dia = dayArtes?dayArtes:''
                break;
            case 'Saúde e Vida':
                e.poster_dia = daySaude?daySaude:''
                break;
            case 'Exatas e Tecnológicas':
                e.poster_dia = dayExatas?dayExatas:''
                break;
            
            default:
                break;
        }
        switch (e.poster_turno) {
            case 'Matutino':
                e.poster_turno = `Matutino - ${hour_am?hour_am:''}`
                break;
            case 'Vespertino':
                e.poster_turno = `Vespertino - ${hour_pm?hour_pm:''}`
                break;
            default:
                break;
        }

    });
    res.render("public/pages/schedule",{
        dataArticle:newDataArticle,
        searchValue,
        year,
        listSubAreasUnique,
        filter:{
            grande_area,
            subarea,
            poster_turno
        }
    }) 
};
export const awards = async (req: Request, res: Response)=>{
    let searchValue = req.query.searchValue,
        edital = req.query.edital,
        grande_area = req.query.grande_area,
        subarea = req.query.subarea;
    let year = req.params.year;
    let dataArticle1 = await Article.getPosterAvaliadoForAwards(year,'Artes e Humanidades');
    let dataArticle2 = await Article.getPosterAvaliadoForAwards(year,'Saúde e Vida');
    let dataArticle3 = await Article.getPosterAvaliadoForAwards(year,'Exatas e Tecnológicas');
    
    let dataArticle = dataArticle1.concat(dataArticle2).concat(dataArticle3).sort(sortAscAutor);
    let listSubAreas = new Array;
    dataArticle.forEach(e => {
        listSubAreas.push(e.subarea)
    });
    let listSubAreasUnique = [...new Set(listSubAreas)];
    if(searchValue){
        dataArticle = await Article.search(dataArticle,searchValue) 
    }
    if(grande_area){
        dataArticle = await Article.filterByArea(dataArticle,grande_area);
    }
    if(subarea){
        dataArticle = await Article.filterBySubarea(dataArticle,subarea);
    }
    if(edital){
        dataArticle = await Article.filterByPosterEdital(dataArticle,edital);
    }

    
    
    let newDataArticle = dataArticle.slice(0,600);
    let dataEdition = await Edition.getOneByYear(year)
    const dayArtes = dataEdition?.date_artes;
    const daySaude = dataEdition?.date_saude;
    const dayExatas = dataEdition?.date_exatas;
    const hour_am = dataEdition?.hour_am;
    const hour_pm = dataEdition?.hour_pm;

    newDataArticle.forEach(e => {
        switch (e.grande_area) {
            case 'Artes e Humanidades':
                e.poster_dia = dayArtes?dayArtes:''
                break;
            case 'Saúde e Vida':
                e.poster_dia = daySaude?daySaude:''
                break;
            case 'Exatas e Tecnológicas':
                e.poster_dia = dayExatas?dayExatas:''
                break;
            
            default:
                break;
        }
        switch (e.poster_turno) {
            case 'Matutino':
                e.poster_turno = `Matutino - ${hour_am?hour_am:''}`
                break;
            case 'Vespertino':
                e.poster_turno = `Vespertino - ${hour_pm?hour_pm:''}`
                break;
            default:
                break;
        }

    });
    res.render("public/pages/awards",{
        dataArticle:newDataArticle,
        searchValue,
        year,
        listSubAreasUnique,
        filter:{
            grande_area,
            subarea,
            edital
        }
    }) 
};
export const article = async (req:Request, res:Response) => {
    let id = req.params.id;
    let data = await Article.getById(id);
    let views;
    if(data){
        if(data.views){
            views = 1 + data.views
        }else{
            views = 1
        }
    }
    let obj = {
        _id: id,
        views
    }
    await Article.updateViews(obj)
    let dataEdition = data? await Edition.getOneByYear(data.ano) : null;
    let local_apresentacao = dataEdition?.local_apresentacao;
    let codVideo = data?.link_video.slice(-11);
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
    
    res.render("public/pages/article",
    
    {   
        modal:false, 
        data,
        day,hour,local_apresentacao,codVideo,
        nameEdition: dataEdition ? dataEdition.title : null,
        error_float:req.flash("error_float"),
        success_float:req.flash("success_float"),
        notify_error:req.flash("notify_error"),
        notify_success:req.flash("notify_success")
    })

};






export const form_signin = (req: Request, res: Response)=>{
    res.render("public/pages/signin",{
        cpf: req.flash("cpf"),
        notify_success: req.flash("notify_success"),
        notify_error: req.flash("notify_error"),
        
    }) 
};//OK
export const redirectSignin = (req: Request, res: Response)=>{
    res.redirect("/")
};//OK
export const form_signup= (req: Request, res: Response)=>{
    res.render("public/pages/signup")
};//OK
export const form_signinReviewer= (req: Request, res: Response)=>{
    res.render("public/pages/signinReviewer")
};//OK
export const form_signupReviewer= (req: Request, res: Response)=>{
    res.render("public/pages/signupReviewer",{cpf:req.flash("cpf"),notify_success:req.flash("notify_success")})
};//OK
export const form_resetPassword = (req: Request, res: Response)=>{
    res.render("public/pages/resetPassword")
};//ok

