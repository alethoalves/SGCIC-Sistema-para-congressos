import { Request, Response } from 'express';
import {Article} from "../models/Article";
import {Edition} from "../models/Edition";
import { validationResult} from 'express-validator';
import { delDuplicate } from '../helpers/delDuplicate';
import * as formArticleConstructor from '../helpers/formArticleConstructor'
import { isValidObjectId } from 'mongoose';
import * as validations from '../helpers/validateBody'
import * as menuHelpers from '../helpers/menu'
import { cpfValidator } from "../helpers/cpfValidator";

export const editions = async (req:Request, res:Response) => {
    let user = req.session.user;//get user data
    let menu = menuHelpers.createMenuObject(req,'events');//create menu items
    let dataEdition = await Edition.getAll() //get all editions from db
    res.render("pages/editions",
    {
        menu,
        dataEdition,
        error_float:req.flash("error_float"),
        success_float:req.flash("success_float"),
    })
};//OK
export const viewFormAdminEdition = async (req: Request, res: Response)=>{
    let year, values, editForm, status ;
    year = req.params.year; //get year by parms
    //Is the year params defined?
    if (year) {
        values = await Edition.getByYear(year);//get edition`s data
        status = values && values.status =="Congresso online" ? true : false; //Is the data empty?
        editForm = values ? true : false;
    } else {
        status = false
        editForm = false
    }
    res.render('pages/form_edition',{
        editForm,
        values,
        year,
        status
    })
};//ok
export const createOrUpdateEdition = async (req: Request, res: Response)=>{
    let values = req.body; //store form data
    let errors = validationResult(req); //store form errors
    let year = req.body.year
    let status = req.body.status
    //form have errors
    if(!errors.isEmpty()){
        res.render('pages/form_edition',{
            error:errors.mapped(),
            error_float:"Erro no formulário", 
            values})
        return
    }
    //Check year
    let checkYear = await Edition.getByYear(year);
    if (checkYear){
        await Edition.updateEdition(year,values)
        let msg = 'Edição editada com sucesso!'
        req.flash("success_float",msg)
        res.redirect(`/admin/dashboard/article/${year}`)
    }else{
        //save
        await Edition.saveEdition(values)
        let msg = 'Edição criada com sucesso!'
        req.flash("success_float",msg)
        res.redirect('/admin/editions')
    }
};
export const updateEdition = async (req: Request, res: Response)=>{
    let values = req.body; //store form data
    let errors = validationResult(req); //store form errors
    let year = req.body.year
    let status = req.body.status
    //form have errors
    if(!errors.isEmpty()){
        res.render('pages/form_edition',{
            error:errors.mapped(),
            notify_float:"Erro no formulário", 
            values})
        return
    }
    //Check year
    let checkYear = await Edition.getByYear(year);
    if (!checkYear){
        res.render('pages/form_edition',{
            error:errors.mapped(),
            notify_float:`Não existe congresso para o ano informado`, 
            values})
        return
    }else{
        //update
        await Edition.updateEdition(year,values)
        let msg = 'Edição editada com sucesso!'
        req.flash("success_float",msg)
        res.redirect(`/admin/dashboard/article/${year}`)
    }
    

};
export const deleteEdition = async (req:Request, res:Response) => {
    let user = req.session.user;
    let menu = menuHelpers.createMenuObject(req,'events');
    let year = req.params.year
    let del = await Edition.deleteEdition(year);
    console.log(del)
    req.flash("success_float", `O Congresso de ${year} foi excluído.`);
    res.redirect('/admin/editions')
};
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
    let dataEdition = await Edition.getByYear(year)
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

export const articles = async (req:Request, res:Response) => {
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
export const createOrUpdateArticle = async (req: Request, res: Response)=>{
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
export const deleteArticle = async (req:Request, res:Response) => {
    let id = req.body._id;
    let year = req.body.ano;
    let linkFilter;
    let searchValue = req.query.searchValue
    
    console.log(searchValue)
    if(req.session.user!= undefined){
        linkFilter = req.session.user.filter
    }
    console.log(linkFilter)
    await Article.deleteArticle(id)
    req.flash("success","Resumo excluído")
    
    res.redirect(`${linkFilter}?searchValue=${searchValue}`)
};

