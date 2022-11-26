import { Schema,Model, model, connection } from "mongoose";
import * as formArticleConstructor from '../helpers/formArticleConstructor'

type ArticleType = {
    id_edition:string,
    date_created: string,
    name_creator:string,
    date_modified:string,
    name_modifier:string
    views:number,
    likes:number,
    share_count:number,
    id_unb: number,
    status:boolean,
    ano: number,
    instituicao: string,
    edital: string,
    grande_area: string,
    subarea: string,
    orientador_nome: string,
    orientador_cpf: string,
    autor_nome: string,
    autor_cpf: string,
    premio: string,
    co_autor_nome: string,
    co_autor_cpf: string,
    multiplos_autores_em: string,
    link_video: string,
    iframe_video: string,
    poster_status: string,
    poster_dia: string,
    poster_turno: string,
    poster_numero: number,
    poster_avaliador_cpf: string,
    poster_nota_1: number,
    poster_nota_2: number,
    poster_nota_3: number,
    poster_nota_4: number,
    poster_nota_5: number,
    justificativa: string,
    poster_inicio_avaliacao: string,
    poster_fim_avaliacao: string,
    resumo_status: string,
    resumo_inicio_avaliacao: string,
    resumo_fim_avaliacao: string,
    resumo_avaliador_cpf: string,
    resumo_titulo: string,
    resumo_titulo_nota: number,
    resumo_introducao: string,
    resumo_introducao_nota: number,
    resumo_metodologia: string,
    resumo_metodologia_nota: number,
    resumo_resultado: string,
    resumo_resultado_nota: number,
    resumo_conclusao: string,
    resumo_conclusao_nota: number,
    palavras_chaves: string,
    colaboradores: string,
  
}

const schema = new Schema<ArticleType>({
    id_edition:String,
    date_created: String,
    name_creator:String,
    date_modified:String,
    name_modifier:String,
    views:Number,
    likes:Number,
    share_count:Number,
    id_unb: Number,
    status:Boolean,
    ano: Number,
    instituicao: String,
    edital: String,
    grande_area: String,
    subarea: String,
    orientador_nome: String,
    orientador_cpf: String,
    autor_nome: String,
    autor_cpf: String,
    premio: String,
    co_autor_nome: String,
    co_autor_cpf: String,
    multiplos_autores_em: String,
    link_video: String,
    iframe_video: String,
    poster_status: String,
    poster_dia: String,
    poster_turno: String,
    poster_numero: Number,
    poster_avaliador_cpf: String,
    poster_nota_1: Number,
    poster_nota_2: Number,
    poster_nota_3: Number,
    poster_nota_4: Number,
    poster_nota_5: Number,
    justificativa: String,
    poster_inicio_avaliacao: String,
    poster_fim_avaliacao: String,
    resumo_status: String,
    resumo_inicio_avaliacao: String,
    resumo_fim_avaliacao: String,
    resumo_avaliador_cpf: String,
    resumo_titulo: String,
    resumo_titulo_nota: Number,
    resumo_introducao: String,
    resumo_introducao_nota: Number,
    resumo_metodologia: String,
    resumo_metodologia_nota: Number,
    resumo_resultado: String,
    resumo_resultado_nota: Number,
    resumo_conclusao: String,
    resumo_conclusao_nota: Number,
    palavras_chaves: String,
    colaboradores: String,
    
})

const modelName: string = 'Article';
const articleModel = connection && connection.models[modelName] 
?
(connection.models[modelName] as Model<ArticleType>)
:
model<ArticleType>(modelName, schema)

export default articleModel; 

export const Article = {
    getAll:async ()=>{
        let dataArticle = articleModel.find({});
        return dataArticle
    },
    getAllBySubareaAndStatus:async (subarea,status)=>{
        let dataArticle = articleModel.find({subarea,resumo_status:status});
        return dataArticle
    },
    getByStatusResumo:async (status)=>{
        let dataArticle = articleModel.find({resumo_status:status});
        return dataArticle
    },
    getByStatusResumoAndCpf:async (status,cpf)=>{
        let dataArticle = articleModel.find({resumo_status:status,resumo_avaliador_cpf:cpf});
        return dataArticle
    },
    getByStatusPosterAndCpf:async (status,cpf)=>{
        let dataArticle = articleModel.find({poster_status:status,poster_avaliador_cpf:cpf});
        return dataArticle
    },
    getByStatusAndYear:async (status,year)=>{
        let dataArticle = articleModel.find({resumo_status:status,ano:year});
        return dataArticle
    },
    getAllByYearAreaLessPosterArquivado:async (year,area)=>{
        let dataArticle = articleModel.find(
            {
                grande_area:area,
                ano:year,
                $or: [{
                    poster_status: 'Pôster aguardando checkin'
                }, {
                    poster_status: 'Pôster aguardando avaliação'
                }, {
                    poster_status: 'Pôster em avaliação'
                }, {
                    poster_status: 'Pôster avaliado'
                }]
            });
        return dataArticle
    },
    getPosterAvaliadoForAwards:async (year,area)=>{
        let dataArticle = articleModel.find(
            {
                grande_area:area,
                ano:year,
                poster_status: 'Pôster avaliado',
                $or: [{
                    premio: 'Menção honrosa'
                }, {
                    premio: 'Indicação a prêmio destaque'
                }
            ]
            });
        return dataArticle
    },
    search:async (data,value)=>{
        return data.filter(item=>{
            return (
                item.premio?.toLowerCase().trim() == value?.toLowerCase().trim()
                ||
                item.autor_nome?.toLowerCase().trim().indexOf(value.toLowerCase().trim()) >-1 
                ||
                item.resumo_titulo?.toLowerCase().trim().indexOf(value.toLowerCase().trim()) >-1 
                ||
                item.orientador_nome?.toLowerCase().trim().indexOf(value.toLowerCase().trim()) >-1 
                ||
                item.orientador_cpf?.toLowerCase().trim().indexOf(value.toLowerCase().trim()) >-1 
                ||
                item.autor_cpf?.toLowerCase().trim().indexOf(value.toLowerCase().trim()) >-1 
                ||
                item.resumo_status?.toLowerCase().trim().indexOf(value.toLowerCase().trim()) >-1 
                ||
                item.poster_status?.toLowerCase().trim().indexOf(value.toLowerCase().trim()) >-1
                ||
                item.poster_numero == parseInt(value)
                ||
                item.edital?.toLowerCase().trim().indexOf(value.toLowerCase().trim()) >-1
                )
        })
    },
    filterByArea:async (data,value)=>{
        return data.filter(item=>{
            return (
                item.grande_area?.indexOf(value) >-1 
                )
        })
    },
    filterBySubarea:async (data,value)=>{
        return data.filter(item=>{
            return (
                item.subarea?.indexOf(value) >-1 
                )
        })
    },
    filterByPosterTurno:async (data,value)=>{
        return data.filter(item=>{
            return (
                item.poster_turno?.indexOf(value) >-1 
                )
        })
    },
    filterByPosterEdital:async (data,value)=>{
        return data.filter(item=>{
            return (
                item.edital?.indexOf(value) >-1 
                )
        })
    },
    filter:async (data,filters,year)=>{
        let dataArticle;
        if (filters.filter4.value == "all") {
            if(filters.filter1.value == "all" && filters.filter2.value == "all"){
                dataArticle = articleModel.find(
                    { $and: 
                        [ 
                            { ano: year }                        ] 
                    }
                )
            }
            if(filters.filter1.value == "all" && filters.filter2.value != "all"){
                dataArticle = articleModel.find(
                    { $and: 
                        [ 
                            { ano: year }, 
                            { [`${filters.filter2.key}`]: filters.filter2.value },
                        ] 
                    }
                )
            }
            if(filters.filter1.value != "all" && filters.filter2.value == "all"){
                dataArticle = articleModel.find(
                    { $and: 
                        [ 
                            { ano: year }, 
                            { [`${filters.filter1.key}`]: filters.filter1.value },
                        ] 
                    }
                )
            }
            if(filters.filter1.value != "all" && filters.filter2.value != "all"){
                dataArticle = articleModel.find(
                    { $and: 
                        [ 
                            { ano: year }, 
                            { [`${filters.filter1.key}`]: filters.filter1.value },
                            { [`${filters.filter2.key}`]: filters.filter2.value },
                        ] 
                    }
                )
            }
        }else if(filters.filter3.value == "all"){
            if(filters.filter1.value == "all" && filters.filter2.value == "all"){
                dataArticle = articleModel.find(
                    { $and: 
                        [ 
                            { ano: year }, 
                            { [`${filters.filter4.key}`]: filters.filter4.value } 
                        ] 
                    }
                )
            }
            if(filters.filter1.value == "all" && filters.filter2.value != "all"){
                dataArticle = articleModel.find(
                    { $and: 
                        [ 
                            { ano: year }, 
                            { [`${filters.filter2.key}`]: filters.filter2.value },
                            { [`${filters.filter4.key}`]: filters.filter4.value } 
                        ] 
                    }
                )
            }
            if(filters.filter1.value != "all" && filters.filter2.value == "all"){
                dataArticle = articleModel.find(
                    { $and: 
                        [ 
                            { ano: year }, 
                            { [`${filters.filter1.key}`]: filters.filter1.value },
                            { [`${filters.filter4.key}`]: filters.filter4.value } 
                        ] 
                    }
                )
            }
            if(filters.filter1.value != "all" && filters.filter2.value != "all"){
                dataArticle = articleModel.find(
                    { $and: 
                        [ 
                            { ano: year }, 
                            { [`${filters.filter1.key}`]: filters.filter1.value },
                            { [`${filters.filter2.key}`]: filters.filter2.value },
                            { [`${filters.filter4.key}`]: filters.filter4.value } 
                        ] 
                    }
                )
            }
        }else{
            if(filters.filter1.value == "all" && filters.filter2.value == "all"){
                dataArticle = articleModel.find(
                    { $and: 
                        [ 
                            { ano: year }, 
                            { [`${filters.filter3.key}`]: filters.filter3.value }, 
                            { [`${filters.filter4.key}`]: filters.filter4.value } 
                        ] 
                    }
                )
            }
            if(filters.filter1.value == "all" && filters.filter2.value != "all"){
                dataArticle = articleModel.find(
                    { $and: 
                        [ 
                            { ano: year }, 
                            { [`${filters.filter2.key}`]: filters.filter2.value },
                            { [`${filters.filter3.key}`]: filters.filter3.value }, 
                            { [`${filters.filter4.key}`]: filters.filter4.value } 
                        ] 
                    }
                )
            }
            if(filters.filter1.value != "all" && filters.filter2.value == "all"){
                dataArticle = articleModel.find(
                    { $and: 
                        [ 
                            { ano: year }, 
                            { [`${filters.filter1.key}`]: filters.filter1.value },
                            { [`${filters.filter3.key}`]: filters.filter3.value }, 
                            { [`${filters.filter4.key}`]: filters.filter4.value } 
                        ] 
                    }
                )
            }
            if(filters.filter1.value != "all" && filters.filter2.value != "all"){
                dataArticle = articleModel.find(
                    { $and: 
                        [ 
                            { ano: year }, 
                            { [`${filters.filter1.key}`]: filters.filter1.value },
                            { [`${filters.filter2.key}`]: filters.filter2.value },
                            { [`${filters.filter3.key}`]: filters.filter3.value }, 
                            { [`${filters.filter4.key}`]: filters.filter4.value } 
                        ] 
                    }
                )
            }
        }
        
        return dataArticle
    },
    getManyByYear:async (year)=>{
        
        let dataArticle = articleModel.find({ano:year});
        return dataArticle
    },
    getManyByCPF: (cpf)=>{
        let dataArticle =  articleModel.find(
            { $or: [ { orientador_cpf: cpf }, { autor_cpf: cpf }, { co_autor_cpf: cpf } ] }
            ).sort({ano:"desc"})
         return  dataArticle
    },
    createArticle:async (obj,userName)=>{
        let dateNow = new Date()
        if(!obj.poster_status){
            obj.poster_status="Pôster aguardando checkin";
        }
        if(!obj.resumo_status){
            obj.resumo_status="Resumo aguardando avaliação";
        }
        obj.name_creator = userName;
        obj.date_created = dateNow.toString();
        obj.name_modifier = userName;
        obj.date_modified = dateNow.toString();
        await articleModel.create(obj)
    },
    updateViews:async (obj)=>{
        /** 
        if(!obj.poster_status){
            obj.poster_status="Pôster aguardando checkin";
        }
        if(!obj.resumo_status){
            obj.resumo_status="Resumo aguardando avaliação";
        }
        */
        
        await articleModel.findOneAndUpdate({_id:obj._id}, obj);
        
    },
    updateArticle:async (obj,userName)=>{
        let dateNow = new Date()
        /** 
        if(!obj.poster_status){
            obj.poster_status="Pôster aguardando checkin";
        }
        if(!obj.resumo_status){
            obj.resumo_status="Resumo aguardando avaliação";
        }
        */
        obj.name_modifier = userName;
        obj.date_modified = dateNow.toString();
        
        await articleModel.findOneAndUpdate({_id:obj._id}, obj);
        
    },
    getOneById:async (req,schema)=>{
        let id = req.params.id != undefined ? req.params.id :req.query.id;
        let dataArticle = await articleModel.findOne({
            _id:id
        });
        //formArticleConstructor.insertValuesAndErrorMsg(schema,dataArticle)
        return dataArticle
    },
    getById:async (id)=>{
        let dataArticle = await articleModel.findOne({
            _id:id
        });
        return dataArticle
    },
    getOneByCpfAndId: async (req, schema) => {
        let cpf = req.session.user.cpf;
        let id = req.params.id;
        let dataArticle = await articleModel.findOne({
            $or: [ { orientador_cpf: cpf }, { autor_cpf: cpf }, { co_autor_cpf: cpf } ],
            $and: [{_id:id}]
        });
        if(dataArticle!=undefined){
            if(dataArticle.instituicao=="UNB"){
                //schema = formArticleConstructor.edit_meuResumo_unb();
            }else{
                 //schema = await formArticleConstructor.edit_meuResumo_externo();
            }
            //formArticleConstructor.insertValuesAndErrorMsg(schema,dataArticle)
        };
        return dataArticle
    },
    getArticleByCpfAndId: async (cpf, id) => {
        
        let dataArticle = await articleModel.findOne({
            $or: [ { orientador_cpf: cpf }, { autor_cpf: cpf }, { co_autor_cpf: cpf } ],
            $and: [{_id:id}]
        });
        
        return dataArticle
    },
    deleteArticle:async (id) => {
        await articleModel.deleteOne({_id:id})
    }
}

