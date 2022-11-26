import { Request, Response } from 'express';
import {Article} from "../models/Article";
import {Edition} from "../models/Edition";
import {User} from "../models/User";

import { Result, validationResult} from 'express-validator';
import { delDuplicate } from '../helpers/delDuplicate';
import * as formArticleConstructor from '../helpers/formArticleConstructor'
import { isValidObjectId } from 'mongoose';
import * as validations from '../helpers/validateBody'
import * as menuHelpers from '../helpers/menu'
import { cpfValidator } from "../helpers/cpfValidator";

const sortAscAutor = (a, b) => {
    let x = a.autor_nome.toUpperCase(),
        y = b.autor_nome.toUpperCase();
        return x == y ? 0 :x > y ? 1 : -1;
}
const sortAscAvaliador = (a, b) => {
let x = a.orientador_nome.toUpperCase(),
    y = b.orientador_nome.toUpperCase();
    return x == y ? 0 :x > y ? 1 : -1;
}
const sortBySubareaOrientadorAutor =  (x, y) => {
    // classifica primeiro pelo campo 'subarea'
    if (x.subarea < y.subarea) {
        return -1;
    }
 
    if (x.subarea > y.subarea) {
        return 1;
    }

    if (x.orientador_nome < y.orientador_nome) {
        return -1;
    }
 
    if (x.orientador_nome > y.orientador_nome) {
        return 1;
    }
 
    // se os nomes forem iguais, então ordena por 'year'
    return x.autor_nome - y.autor_nome;
}
async function insertNumeroTurno(data,qnt) {
    if (qnt == 1) {
        data.sort(sortBySubareaOrientadorAutor)
        for (let i = 0; i < data.length; i++) {
            await Article.updateArticle({
                _id:data[i]._id,
                poster_status:data[i].poster_status,
                resumo_status:data[i].resumo_status,
                poster_numero:100+i+1,
                poster_turno:'Matutino'
            },"SGCIC")
            
        }
    }else if(qnt ==2){
        let data_1 = data.slice(0,Math.trunc(data.length/2)-1).sort(sortBySubareaOrientadorAutor);
        let data_2 = data.slice(data_1.length,data.length).sort(sortBySubareaOrientadorAutor);
       
        for (let i = 0; i < data_1.length; i++) {
            await Article.updateArticle({
                _id:data_1[i]._id,
                poster_numero:100+(+ i + 1),
                poster_turno:'Matutino'
            },"SGCIC")
        }
        for (let i = 0; i < data_2.length; i++) {
            await Article.updateArticle({
                _id:data_2[i]._id,
                poster_numero:100+(+ i + 1),
                poster_turno:'Vespertino'
            },"SGCIC")
        }
    }
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
export const users = async (req:Request, res:Response) => {
    let searchValue = req.query.searchValue;
    let data = await User.getAll();
    if(searchValue){
        data = await User.search(data,searchValue) 
    }
    
    res.render("private/pages/admin/users",
    {   
        modal:false, 
        data,
        searchValue,
        error_float:req.flash("error_float"),
        success_float:req.flash("success_float"),
    })
};
export const delUser = async (req:Request, res:Response) => {
    let cpf = req.params.cpf
    await User.delUserByCPF(cpf);
    req.flash("success_float", `Exclusão realizada!`);
    res.redirect('/admin/users')
};
export const updateUser = async (req: Request, res: Response)=>{
    let values = req.body; //store form data
    let errors = validationResult(req); //store form errors

    values.isAdmin = values.isAdmin == 'true'?true:false;
    values.isReviewer = values.isReviewer == 'true'?true:false;
    let data = await User.getAll();
    if(values.searchValue){
        data = await User.search(data,values.searchValue) 
    }
    //form have errors
    if(!errors.isEmpty()){
        res.render(`private/pages/admin/users`,
            {   
                modal:true,
                values, 
                formErrors:errors.mapped(),
                data,
                searchValue:values.searchValue,
                error_float:req.flash("error_float"),
                success_float:req.flash("success_float"),
            })
        return
    }
    await User.userUpdate(values)
        data = await User.getAll();
        if(values.searchValue){
            data = await User.search(data,values.searchValue) 
        }
        res.render(`private/pages/admin/users`,
        {   
            modal:false,
            values, 
            data,
            searchValue:values.searchValue,
            error_float:false,
            success_float:'Alteração realizada!',
        })
    
};
export const editions = async (req:Request, res:Response) => {
    //let user = req.session.user;//get user data
    //let menu = menuHelpers.createMenuObject(req,'events');//create menu items
    let searchValue = req.query.searchValue;
    let data = await Edition.getAll();
    if(searchValue){
        data = await Edition.search(data,searchValue) 
    }
    //console.log(data)
    res.render("private/pages/admin/editions",
    {   
        modal:false, 
        data,
        searchValue,
        error_float:req.flash("error_float"),
        success_float:req.flash("success_float"),
        notify_error:req.flash("notify_error"),
        notify_success:req.flash("notify_success")
    })

};
export const createOrUpdateEdition = async (req: Request, res: Response)=>{
    let values = req.body; //store form data
    
    let errors = validationResult(req); //store form errors
    values.statusSubmit = values.statusSubmit == 'true'?true:false;
    let data = await Edition.getAll();
    if(values.searchValue){
        data = await Edition.search(data,values.searchValue) 
    }
    let year = req.body.year
    //form have errors
    if(!errors.isEmpty()){
        res.render(`private/pages/admin/editions`,
            {   
                modal:true,
                values, 
                formErrors:errors.mapped(),
                data,
                searchValue:values.searchValue,
                error_float:req.flash("error_float"),
                success_float:req.flash("success_float"),
            })
        return
    }
    //Check type of form (New or Update)
    if(values._id){
        //save
        await Edition.updateEdition(values)
        data = await Edition.getAll();
        if(values.searchValue){
            data = await Edition.search(data,values.searchValue) 
        }
        res.render(`private/pages/admin/editions`,
            {   
                modal:false,
                values, 
                data,
                searchValue:values.searchValue,
                error_float:false,
                success_float:'Edição realizada!',
            });
    }else{
        //Check year
        let checkYear = await Edition.getOneByYear(year);
        if (checkYear){
            let msg = `Já existe uma edição do congresso para o ano de ${year}!`
            res.render(`private/pages/admin/editions`,
            {   
                modal:true,
                values, 
                data,
                searchValue:values.searchValue,
                notify_error:msg,
            });
        }else{
            //save
            delete values._id;

            await Edition.saveEdition(values)
            let msg = 'Edição criada com sucesso!'
            req.flash("success_float",msg)
            res.redirect('/admin/editions')
        }

    }
    
    
    
};
export const delEdition = async (req:Request, res:Response) => {
    let year = req.params.year
    await Edition.delEditionByYear(year);
    req.flash("success_float", `Exclusão realizada!`);
    res.redirect('/admin/editions')
};
export const schedule = async (req:Request, res:Response) => {
    let year = req.params.year
    //Existe resumos para esse ano?
        
    let articles1 = await Article.getByStatusAndYear('Resumo aguardando avaliação',year);
    let articles2 = await Article.getByStatusAndYear('Resumo em avaliação',year);
    let articles3 = await Article.getByStatusAndYear('Resumo avaliado',year)
    let articles = articles1.concat(articles2).concat(articles3)
    
    if(articles.length==0){
        req.flash("error_float", "Não há resumos aptos para gerar a programação.");
        res.redirect('/admin/editions')
    }else if(articles[10].poster_numero  || articles[100].poster_numero|| articles[800].poster_numero){
        req.flash("error_float", "Programação já gerada!");
        res.redirect('/admin/editions')
    }else{
        //Ordenar em ordem alfabetica
        articles.sort(sortAscAutor)

        //ARTES E HUMANIDADES
        
        let articlesArtesPIBIC_EM = articles.filter((value)=>{
            let result = value.edital=='PIBIC-EM' && value.grande_area=='Artes e Humanidades'
            return result
        }) 
        insertNumeroTurno(articlesArtesPIBIC_EM,1)
        
        let articlesArtesWithoutPIBIC_EM = articles.filter((value)=>{
            let result = value.grande_area == 'Artes e Humanidades' && value.edital != 'PIBIC-EM'
            return result
        }) 
        insertNumeroTurno(articlesArtesWithoutPIBIC_EM,2)
        
        //SAÚDE E VIDA
        
        let articlesSaudePIBIC_EM = articles.filter((value)=>{
            let result = value.edital=='PIBIC-EM' && value.grande_area=='Saúde e Vida'
            return result
        }) 
        insertNumeroTurno(articlesSaudePIBIC_EM,1)
        
        let articlesSaudeWithoutPIBIC_EM = articles.filter((value)=>{
            let result = value.grande_area == 'Saúde e Vida' && value.edital != 'PIBIC-EM'
            return result
        }) 
        insertNumeroTurno(articlesSaudeWithoutPIBIC_EM,2)

        //EXATAS E TECNOLÓGICAS
                
        let articlesExatasPIBIC_EM = articles.filter((value)=>{
            let result = value.edital=='PIBIC-EM' && value.grande_area=='Exatas e Tecnológicas'
            return result
        }) 
        insertNumeroTurno(articlesExatasPIBIC_EM,1)

        let articlesExatasWithoutPIBIC_EM = articles.filter((value)=>{
            let result = value.grande_area == 'Exatas e Tecnológicas' && value.edital != 'PIBIC-EM'
            return result
        }) 
        insertNumeroTurno(articlesExatasWithoutPIBIC_EM,1)
        
        
        
        req.flash("success_float", "Programação gerada");
        res.redirect('/admin/editions')
    }
    
    
};
export const articles = async (req:Request, res:Response) => {
    let year = req.params.year;
    let searchValue = req.query.searchValue;
    let data = await Article.getManyByYear(year);
    if(searchValue){
        data = await Article.search(data,searchValue) 
    }
    res.render("private/pages/admin/articles",
    {   
        modal:false, 
        data,
        year,
        searchValue,
        error_float:req.flash("error_float"),
        success_float:req.flash("success_float"),
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

    res.render("private/pages/admin/article",
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
export const createArticle = async (req:Request, res:Response) => {
    let year = req.params.year; 
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId();
    let values = {
        _id:id,
        ano:year,
        resumo_status:'Rascunho',
        poster_status:'Rascunho'
    }
    await Article.createArticle(values,"Admin sgcic");
    req.flash("success_float","Rascunho criado! Insira os dados faltantes :)")
    res.redirect(`/admin/article/${id}`)
    
};
export const deleteArticle = async (req:Request, res:Response) => {
    let id = req.params.id;
    let year = req.params.year;
    let data = await Article.getManyByYear(year);
    let dataArticle = await Article.getById(id);
    if(dataArticle?.resumo_introducao || dataArticle?.resumo_metodologia || dataArticle?.resumo_resultado || dataArticle?.resumo_conclusao){
        dataArticle.ano = 1000;
        dataArticle.resumo_status = 'Excluído';
        dataArticle.poster_status = 'Excluído'
        await Article.updateArticle(
            dataArticle,"Admin sgcic")
    }else{
        await Article.deleteArticle(id)
    }
    req.flash("success_float","Artigo excluído!")
    res.redirect(`/admin/articles/${year}`,)
    
    
};
export const createOrUpdateArticle = async (req: Request, res: Response)=>{
    let values = req.body; //store form data
    if (values.poster_status == "Pôster arquivado") {
        values.poster_numero = null;
        values.poster_turno = null;
    }
    let errors = validationResult(req); //store form errors
    let data = await Article.getById(values._id);
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
    //form have errors
    if(!errors.isEmpty()){
        res.render(`private/pages/admin/article`,
            {   
                modal:false, 
                dataPosters,
                data,
                day,hour,local_apresentacao,codVideo,
                nameEdition: dataEdition ? dataEdition.title : null,
                values, 
                formErrors:errors.mapped(),
                error_float:req.flash("error_float"),
                success_float:req.flash("success_float"),
                notify_error:req.flash("notify_error"),
                notify_success:req.flash("notify_success"),
            })
        return
    }
    //Check type of form (New or Update)
    if(values._id){
        //save
        if (values.grande_area && values.grande_area != data?.grande_area) {
            values.poster_numero = null;
            values.poster_turno = null;
        }
        await Article.updateArticle(values,"Admin sgcic")
        req.flash("success_float","Edição realizada com sucesso!")
        res.redirect(`/admin/article/${values._id}`)
        
    }else{
        

    }
    
    
    
};


export const dashboardPoster = async (req: Request, res: Response)=>{
    let year = req.params.year;
    let dataAllArticles;
    let dataPosters;
    let grande_area = req.params.grande_area? req.params.grande_area : "Artes e Humanidades";
    let turno = req.params.turno? req.params.turno =="Matutino"?true:false : true;
    //turno == false -> mostra matutino
    //turno == true -> mostra vespertino
    dataAllArticles = await Article.getAllByYearAreaLessPosterArquivado(year,grande_area)
    dataPosters =  createTurno(dataAllArticles,grande_area)
    //Totais
    let turnoText = req.params.turno? req.params.turno =="Matutino"?'Matutino':'Vespertino' : 'Matutino';
    let dataSubareasAll = dataAllArticles.filter(item=>{
        return (
            item.poster_turno == turnoText
            )
    })
    let reservado = dataSubareasAll.filter(item=>{
        return (
            item.poster_status == "Pôster aguardando checkin"
            )
    });
    let aguardandoAvaliacao = dataSubareasAll.filter(item=>{
        return (
            item.poster_status == "Pôster aguardando avaliação"
            )
    });
    let emAvaliacao = dataSubareasAll.filter(item=>{
        return (
            item.poster_status == "Pôster em avaliação"
            )
    });
    let avaliado = dataSubareasAll.filter(item=>{
        return (
            item.poster_status == "Pôster avaliado"
            )
    });
    let mencaoHonrosa = dataSubareasAll.filter(item=>{
        return (
            item.poster_status == "Pôster avaliado" &&
            item.premio == "Menção honrosa"
            )
    });
    let indicacaoPremio = dataSubareasAll.filter(item=>{
        return (
            item.poster_status == "Pôster avaliado" &&
            item.premio == "Indicação a prêmio destaque"
            )
    });
    let dataAll = {
        all:dataSubareasAll.length,
        reservado:reservado.length,
        aguardandoAvaliacao:aguardandoAvaliacao.length,
        emAvaliacao:emAvaliacao.length,
        avaliado:avaliado.length,
        mencaoHonrosa:mencaoHonrosa.length,
        indicacaoPremio:indicacaoPremio.length
    };
    let arraySubareas = new Array;
    dataSubareasAll.forEach(e => {
        arraySubareas.push(e.subarea)
    });
    let arraySubareasUnique = new Set(arraySubareas);
    let dataSubareas = new Array;
    arraySubareasUnique.forEach(subarea => {
        let all = dataSubareasAll.filter(item=>{
            return (
                item.subarea == subarea 
                )
        })
        let reservado = dataSubareasAll.filter(item=>{
            return (
                item.subarea == subarea &&
                item.poster_status == "Pôster aguardando checkin"
                )
        });
        let aguardandoAvaliacao = dataSubareasAll.filter(item=>{
            return (
                item.subarea == subarea &&
                item.poster_status == "Pôster aguardando avaliação"
                )
        });
        let emAvaliacao = dataSubareasAll.filter(item=>{
            return (
                item.subarea == subarea &&
                item.poster_status == "Pôster em avaliação"
                )
        });
        let avaliado = dataSubareasAll.filter(item=>{
            return (
                item.subarea == subarea &&
                item.poster_status == "Pôster avaliado"
                )
        });
        dataSubareas.push(
            {
                subarea,
                all:all.length,
                reservado:reservado.length,
                aguardandoAvaliacao:aguardandoAvaliacao.length,
                emAvaliacao:emAvaliacao.length,
                avaliado:avaliado.length,
            }
        )
    });
    dataSubareas.sort((a,b)=> b.aguardandoAvaliacao - a.aguardandoAvaliacao);
    let arrayCPF = new Array;
    dataSubareasAll.forEach(e => {
        if(e.poster_status == "Pôster avaliado"){
            arrayCPF.push(e.poster_avaliador_cpf)
        }
    });
    let arrayCPFUnique = [...new Set(arrayCPF)]
    let dataReviewer = new Array;
    let users =  await User.getAll()
    arrayCPFUnique.forEach( e => {
        let userData =  users.filter(item=>{
            return (
                item.cpf == e
                )
        });
        let qnt = dataSubareasAll.filter(item=>{
            return (
                item.poster_avaliador_cpf == e
                )
        });
        let subareas = new Array;
        qnt.forEach(e => {
            subareas.push(e.subarea)
        });
        dataReviewer.push({name:userData[0].name,qnt:qnt.length,subareas})
    });
    dataReviewer.sort((a,b)=> b.qnt - a.qnt);

    res.render(`private/pages/admin/dashboardPoster`,{
        dataPosters,
        grande_area,
        year,
        turno,
        dataAll,
        dataSubareas,
        dataReviewer
    })    
}



export const dashboardArticle = async (req: Request, res: Response)=>{
    let year =  req.params.year;
    let data =  await Article.getManyByYear(year);
    let subareas = delDuplicate(data,'subarea');
    let viewData = data[0] ? false : true;
    let filter1 = req.query["filter1"] != undefined ? req.query["filter1"] : "instituicao"
    let filter1_value = req.query["filter1_value"] != undefined ? req.query["filter1_value"] : "all"
    let filter2 = req.query["filter2"] != undefined ? req.query["filter2"] : "grande_area"
    let filter2_value = req.query["filter2_value"] != undefined ? req.query["filter2_value"] : "all"
    let linkDashboard;
    if(req.session.user){
        linkDashboard = `?filter1=${filter1}&filter1_value=${filter1_value}&filter2=${filter2}&filter2_value=${filter2_value}`
        req.session.user.filterDashboard = linkDashboard
    }
    /****
    if(!data[0]){
        req.flash("error_float", "Não há artigos para esse ano!");
        res.redirect('/admin/editions');
        return
    }
     */
    let column;
    
    let variaveis = ["instituicao","edital","grande_area"]
    let index;
    for (let i = 0; i < variaveis.length; i++) {
        if (variaveis[i] != filter1 && variaveis[i] != filter2) {
            column = delDuplicate(data,variaveis[i])
            index = i
        }
    }
    let columnName = variaveis[index];
   
    let dataTable;
    if(filter1_value != "all" && filter2_value != "all"){
        dataTable = data.filter((value)=>{
            let result = value[`${filter1}`]==filter1_value && value[`${filter2}`]==filter2_value
            return result
        }) 
    }
    if(filter1_value != "all" && filter2_value == "all"){
        dataTable = data.filter((value)=>{
            let result = value[`${filter1}`]==filter1_value
            return result
        }) 
    }
    if(filter1_value == "all" && filter2_value != "all"){
        dataTable = data.filter((value)=>{
            let result = value[`${filter2}`]==filter2_value
            return result
        }) 
    }
    if(filter1_value == "all" && filter2_value == "all"){
        dataTable = data
    }
    //["Resumo pendente","Resumo aguardando avaliação","Resumo em avaliação","Resumo avaliado"],
    let rows = new Array();

    column.forEach(e  => {
        let resumo_pendente = dataTable.filter((value)=>{
            let result = value[`${variaveis[index]}`] == e && value.resumo_status == "Resumo pendente";
            return result
        }).length  
        let resumo_aguardando = dataTable.filter((value)=>{
            let result = value[`${variaveis[index]}`] == e && value.resumo_status == "Resumo aguardando avaliação";
            return result
        }).length  
        let resumo_em_avaliacao = dataTable.filter((value)=>{
            let result = value[`${variaveis[index]}`] == e && value.resumo_status == "Resumo em avaliação";
            return result
        }).length  
        let resumo_avaliado = dataTable.filter((value)=>{
            let result = value[`${variaveis[index]}`] == e && value.resumo_status == "Resumo avaliado";
            return result
        }).length 
        rows.push({
            title:e,
            total: resumo_pendente + resumo_aguardando + resumo_em_avaliacao +resumo_avaliado,
            resumo_pendente:resumo_pendente,
            resumo_aguardando:resumo_aguardando,
            resumo_em_avaliacao:resumo_em_avaliacao,
            resumo_avaliado:resumo_avaliado,
        })

        
    });

    let newData = data.filter((value)=>{
        return value.resumo_status == "Resumo avaliado"
    })
    let notas = [
        {title:'Total resumos avaliados',qnt:0,filter:'all'},
        {title:'Notas de 0 a 10',qnt:0,filter:'0-10'},
        {title:'Notas de 10 a 20',qnt:0,filter:'10-20'},
        {title:'Notas de 20 a 30',qnt:0,filter:'20-30'},
        {title:'Notas de 30 a 40',qnt:0,filter:'30-40'},
        {title:'Notas de 40 a 50',qnt:0,filter:'40-50'},
    ];
    newData.forEach(e => {
        notas[0].qnt += 1;
        let total = 
        e.resumo_titulo_nota +
        e.resumo_introducao_nota +
        e.resumo_metodologia_nota +
        e.resumo_resultado_nota +
        e.resumo_conclusao_nota;
        if(total <= 10){
            notas[1].qnt += 1
            return
        }
        if(total > 10 && total <= 20){
            notas[2].qnt += 1
            return
        }
        if(total > 20 && total <= 30){
            notas[3].qnt += 1
            return
        }
        if(total > 30 && total <= 40){
            notas[4].qnt += 1
            return
        }
        if(total > 40 && total <= 50){
            notas[5].qnt += 1
            return
        }
    });
    let subareaList = new Array();
    
    subareas.forEach(e  => {
        let filterResult = data.filter((value)=>{
            let result = value.subarea == e && value.resumo_status == "Resumo aguardando avaliação"
            return result
        }) 
        if(filterResult.length > 0){
            subareaList.push({
                title:e,
                qnt:filterResult.length
            })
        }
        
    });
    subareaList.sort((a,b)=>b.qnt-a.qnt)
    //["Resumo pendente","Resumo aguardando avaliação","Resumo em avaliação","Resumo avaliado"]
    let totalColumn = [{value:0,title:"Resumo pendente"},{value:0,title:"Resumo aguardando avaliação"},{value:0,title:"Resumo em avaliação"},{value:0,title:"Resumo avaliado"},{value:0,title:"all"}];
    for (let i = 0; i < rows.length; i++) {
        totalColumn[0].value += rows[i].resumo_pendente
        totalColumn[1].value += rows[i].resumo_aguardando
        totalColumn[2].value += rows[i].resumo_em_avaliacao
        totalColumn[3].value += rows[i].resumo_avaliado
        totalColumn[4].value += rows[i].total
    }
    let mini_cards = [
        {
            title: "Total de resumos",
            value: data.length,
            link:`/admin/articles/${year}/instituicao/all/grande_area/all/edital/all/resumo_status/all`
        },
        {
            title: "Total pendentes",
            value: data.filter(item => item.resumo_status == "Resumo pendente").length,
            link:`/admin/articles/${year}/instituicao/all/grande_area/all/edital/all/resumo_status/Resumo%20pendente`
        },
        {
            title: "Total aguardando avaliação",
            value: data.filter(item => item.resumo_status == "Resumo aguardando avaliação").length,
            link:`/admin/articles/${year}/instituicao/all/grande_area/all/edital/all/resumo_status/Resumo%20aguardando%20avaliação`
        }
    ]
    let dataEdition = await Edition.getOneByYear(year)
    res.render('pages/dashboardArticle',{
        filter1:{key:filter1.toString().replace(/\s/g, '+'),value:filter1_value.toString().replace(/\s/g, '+')},
        filter2:{key:filter2.toString().replace(/\s/g, '+'),value:filter2_value.toString().replace(/\s/g, '+')},
        filter3:{key:columnName.toString().replace(/\s/g, '+')},
        year,
        dataEdition,
        viewData,
        rows:rows,
        totalColumn,
        subareaList,
        notas,
        mini_cards,
        notify_error: req.flash("notify_error"),
        notify_success:req.flash("notify_success"),
    });
};
/** 
export const articlesOld = async (req:Request, res:Response) => {
    let year = req.params.year;
    let filters = {
        filter1:{key:req.params.filter1,value:req.params.filter1_value},
        filter2:{key:req.params.filter2,value:req.params.filter2_value},
        filter3:{key:req.params.filter3,value:req.params.filter3_value},
        filter4:{key:req.params.filter4,value:req.params.filter4_value}
    }
    let subarea = req.query.subarea
    let notas = req.query.notas
    let linkFilter;
    let linkDashboard;
    if(req.session.user!= undefined){
        req.session.user.filter = `/admin/articles/${year}/${filters.filter1.key}/${filters.filter1.value}/${filters.filter2.key}/${filters.filter2.value}/${filters.filter3.key}/${filters.filter3.value}/${filters.filter4.key}/${filters.filter4.value}`;
        linkFilter = req.session.user.filter
        linkDashboard = req.session.user.filterDashboard;
    }
    
    let dataArticle;
    let searchValue = req.query.searchValue;
    let data;
    if (year != undefined) {
        dataArticle = await Article.getManyByYear(year)
    }else{
        dataArticle = await Article.getAll() 
    }
    if(
        filters.filter1.key && filters.filter1.value &&
        filters.filter2.key && filters.filter2.value &&
        filters.filter3.key && filters.filter3.value
        ){
            data = await Article.filter(dataArticle,filters,year)
            dataArticle = data
        }
    if(searchValue){
        data = await Article.search(dataArticle,searchValue)
        dataArticle = data;
    }
    if(subarea){
        let data = await Article.getManyByYear(year)
        dataArticle = data.filter((value)=>{
            //console.log(value)
            return value.resumo_status == "Resumo aguardando avaliação" && value.subarea == subarea
        });
    }
    if(notas){
        let data = await Article.getManyByYear(year)
        let dataByStatus = data.filter((value)=>{
            return value.resumo_status == "Resumo avaliado"
        })
        dataArticle = dataByStatus.filter((value)=>{
            let total = 
            value.resumo_titulo_nota +
            value.resumo_introducao_nota +
            value.resumo_metodologia_nota +
            value.resumo_resultado_nota +
            value.resumo_conclusao_nota
            switch (notas) {
                case 'all':
                    return value;
                    break;
                case '0-10':
                    return total <= 10
                    break;
                case '10-20':
                    return total > 10 && total <= 20
                    break;
                case '20-30':
                    return total > 20 && total <= 30
                    break;
                case '30-40':
                    return total > 30 && total <= 40
                    break;
                case '40-50':
                    return total > 40 && total <= 50
                    break;
                default:
                    break;
            }
            return value.resumo_status == "Resumo aguardando avaliação" && value.subarea == subarea
        });
        
    }
    //console.log(dataArticle)
    // = Article.getManyByYear(re)
    res.render('pages/adminArticles',{
        dataArticle,
        year,
        searchValue,
        filters,
        success:req.flash("success"),
        linkFilter,
        linkDashboard
    })
};
export const viewFormAdminNewArticle = async (req: Request, res: Response)=>{
    let year = req.query.year
    let searchValue = req.query.searchValue
    let schema = await formArticleConstructor.new_adminArticle(year);
    formArticleConstructor.clearValuesAndErrorMsg(schema);
    let linkFilter;
    if(req.session.user!= undefined){
        linkFilter = req.session.user.filter
    }
    
    res.render('pages/form_admin_newArticle',{
        data:schema,
        year,
        error: req.flash("error"),
        linkFilter,
        searchValue
    })
};
export const viewFormAdminEditArticle = async (req: Request, res: Response)=>{
    let schema;
    let searchValue = req.query.searchValue
    let year = req.query.year;
    let linkFilter;
    if(req.session.user!= undefined){
        linkFilter = req.session.user.filter
    }
    schema = await formArticleConstructor.edit_adminArticle(year);
    formArticleConstructor.clearValuesAndErrorMsg(schema);
    let path = linkFilter
    // the id is not a valid object id
    if (!isValidObjectId(req.params.id)) {
        req.flash("error", "Não encontrado!");
        res.redirect(path);
        return
    }
    let values = await Article.getOneById(req,schema)
    if (values!=undefined) {
        res.render('pages/form_admin_editArticle',{
            data:schema, 
            values,
            year,
            linkFilter,
            searchValue,
            id: req.params.id,
            notify_success: req.flash("notify_success")
        })
    }else{
        //the id does not exist
        req.flash("error", "Não encontrado!");
        res.redirect(path)
    } 
};
*/
/** 
export const createOrUpdateArticleOld = async (req: Request, res: Response)=>{
    let user = req.session.user;
    let searchValue = req.query.searchValue
    let userName = user ? user.name : ""
    let values = req.body;
    let year = req.query.year
    let path = values._id != undefined ? 'pages/form_admin_editArticle' : 'pages/adminArticles';
    let linkFilter;
    if(req.session.user!= undefined){
        linkFilter = req.session.user.filter
    }
    let schema;
    if(isValidObjectId(values._id)){
        schema = await formArticleConstructor.edit_adminArticle(year);
    }else{
        schema = await formArticleConstructor.new_adminArticle(year);
    }
    let errorBody = validations.checkErrorForm(req,schema,values)
    if(errorBody != undefined ){
        let error="Erro no formulário."
            if(values._id){
                res.render('pages/form_admin_editArticle',{
                    data:schema,error, values,year,linkFilter,searchValue})
            }else{
                res.render('pages/form_admin_newArticle',{
                    data:schema,error, values,year,linkFilter,searchValue})
            }
            
            return
    }
    let cpfArray = [values.orientador_cpf,values.autor_cpf,values.co_autor_cpf]
    let cpfOK = true;
    cpfArray.forEach(e => {
        if(e != ""){
            cpfOK = cpfOK && cpfValidator(e);
        }
    });
    if (!cpfOK) {
        let error = {noError:{msg:''}}
        formArticleConstructor.insertValuesAndErrorMsg(schema,values,error)
        let notify_error="Algum CPF está inválido."
        if(values._id){
            res.render('pages/form_admin_editArticle',{
                data:schema,notify_error,error, values,year,linkFilter,searchValue})
        }else{
            res.render('pages/form_admin_newArticle',{
                data:schema,notify_error,error, values,year,linkFilter,searchValue})
        }
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
    if(!searchValue){
        searchValue = values.autor_nome
    }
    req.flash("success",msg)
    res.redirect(linkFilter+`?searchValue=${searchValue}`)
};


*/