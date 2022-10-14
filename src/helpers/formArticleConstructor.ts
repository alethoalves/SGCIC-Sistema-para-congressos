import {Edition} from "../models/Edition";

export let schemaArticle = [
    {legend:"Dados gerais",
    id:"dados-gerais",
    view:true,
        labels:[
            {legend:"_id",
                input:true, view:true, // input|select
                options:[],
                type:"text", // text|number|hidden
                name:"_id",
                readonly: true,
                placeholder:"", 
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false 
            },
            {legend:"id_unb",
                input:true, view:true, // input|select
                options:[],
                type:"text", // text|number|hidden
                name:"id_unb",
                readonly: false,
                placeholder:"",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Resumo vinculado ao congresso de",
                select:true, view:true, // input|select
                options:[],
                type:"", // text|number|hidden
                name:"ano",
                readonly: false,
                placeholder:"",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Resumo vinculado à instituição:",
                select:true, view:true, // input|select
                options:["UNICEUB","UDF","UCB","IESB","IFG-AGUAS_LINDAS","IFB","ESCS"],
                type:"", // text|number|hidden
                name:"instituicao",
                readonly: false,
                placeholder:"",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Resumo vinculado ao EDITAL:",
                select:true, view:true, // input|select
                options:["PIBIC","PIBITI","PIBIC-AF","PIBIC-EM"],
                type:"", // text|number|hidden
                name:"edital",
                readonly: false,
                placeholder:"",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Grande Área:",
                select:true, view:true, // input|select
                options:["Artes e Humanidades","Saúde e Vida","Exatas e Tecnológicas"],
                type:"", // text|number|hidden
                name:"grande_area",
                readonly: false,
                placeholder:"", 
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false 
            },
            {legend:"Subárea:",
                select:true, view:true, // input|select
                options:[
                    "Administração",
                    "Agronomia",
                    "Antropologia",
                    "Arqueologia",
                    "Arquitetura e Urbanismo",
                    "Astronomia",
                    "Ciência da Computação",
                    "Ciência da Informação",
                    "Ciência e Tecnologia de Alimentos",
                    "Ciência Política",
                    "Ciências Biológicas",
                    "Comunicação",
                    "Demografia",
                    "Direito",
                    "Economia",
                    "Educação",
                    "Educação Física",
                    "Enfermagem",
                    "Engenharia Aeroespacial",
                    "Engenharia Agrícola",
                    "Engenharia Biomédica",
                    "Engenharia Civil",
                    "Engenharia de Materiais e Metalúrgica",
                    "Engenharia de Minas",
                    "Engenharia de Produção",
                    "Engenharia de Transportes",
                    "Engenharia Elétrica",
                    "Engenharia Mecânica",
                    "Engenharia Naval e Oceânica",
                    "Engenharia Nuclear",
                    "Engenharia Química",
                    "Engenharia Sanitária",
                    "Farmácia",
                    "Filosofia",
                    "Física",
                    "Fisioterapia e Terapia Ocupacional",
                    "Fonoaudiologia",
                    "GeoCiências",
                    "Geografia",
                    "História",
                    "Lingüística, Letras e Artes",
                    "Matemática",
                    "Medicina",
                    "Medicina Veterinária",
                    "Museologia",
                    "Nutrição",
                    "Oceanografia",
                    "Odontologia",
                    "Planejamento Urbano e Regional",
                    "Probabilidade e Estatística",
                    "Psicologia",
                    "Química",
                    "Recursos Florestais e Engenharia Florestal",
                    "Recursos Pesqueiros e Engenharia de Pesca",
                    "Saúde Coletiva",
                    "Serviço Social",
                    "Sociologia",
                    "Zootecnia"
                ],
                type:"", // text|number|hidden
                name:"subarea",
                readonly: false,
                placeholder:"",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            }
        ]
    },
    {legend:"Dados do(a) orientador(a)",
    id:"dados-orientador",
    view:true,
        labels:[
            {legend:"Nome",
                input:true, view:true, // input|select
                options:[],
                type:"text", // text|number|hidden
                name:"orientador_nome",
                readonly: false,
                placeholder:"Digite o nome", 
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false 
            },
            {legend:"CPF",
                input:true, view:true, // input|select
                options:[],
                type:"text", // text|number|hidden
                name:"orientador_cpf",
                readonly: false,
                placeholder:"Digite o CPF, apenas números",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            }
        ]
    },
    {legend:"Dados do(s) autor(es)",
    id:"dados-autor",
    view:true,
        labels:[
            {legend:"Nome do aluno(a)",
                input:true, view:true, // input|select
                options:[],
                type:"text", // text|number|hidden
                name:"autor_nome",
                readonly: false,
                placeholder:"Digite o nome do autor",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"CPF do aluno(a)",
                input:true, view:true, // input|select
                options:[],
                type:"text", // text|number|hidden
                name:"autor_cpf",
                readonly: false,
                placeholder:"Digite o CPF, apenas números",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Nome do co-autor",
                input:true, view:true, // input|select
                options:[],
                type:"text", // text|number|hidden
                name:"co_autor_nome",
                readonly: false,
                placeholder:"Digite o nome do co-autor",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"CPF do co-autor",
                input:true, view:true, // input|select
                options:[],
                type:"text", // text|number|hidden
                name:"co_autor_cpf",
                readonly: false,
                placeholder:"Digite o CPF, apenas números",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Alunos de ensino médio (se houver)",
                input:true, view:true, // input|select
                options:[],
                type:"text", // text|number|hidden
                name:"multiplos_autores_em",
                readonly: false,
                placeholder:"Digite o nome dos autores (PIBIC - Ensino Médio)",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            }
        ]
    },
    {legend:"Dados do vídeo",
    id:"dados-video",
    view:true,
        labels:[
            {legend:"Vídeo de apresentação do projeto",
                input:true, view:true, // input|select
                options:[],
                type:"url", // text|number|hidden
                name:"link_video",
                readonly: false,
                placeholder:"https://",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false 
            },
            {legend:"Código <frame>",
                textarea:true, view:true, // input|select|textarea
                options:[],
                type:"", // text|number|hidden
                name:"iframe_video",
                readonly: false,
                placeholder:"Digite o código iframe",  
            }
        ]
    },
    {legend:"Dados do Pôster",
    id:"dados-poster",
    view:true,
        labels:[
            {legend:"Status de apresentação",
                select:true, view:true, // input|select
                options:["Pôster aguardando checkin","Pôster aguardando avaliação","Pôster em avaliação","Pôster avaliado"],
                type:"", // text|number|hidden
                name:"poster_status",
                readonly: false,
                placeholder:"",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Dia",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"text", // text|number|hidden
                name:"poster_dia",
                readonly: false,
                placeholder:"Digite o dia da apresentação do pôster",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false 
            },
            {legend:"Turno",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"text", // text|number|hidden
                name:"poster_turno",
                readonly: false,
                placeholder:"Digite o turno da apresentação do pôster",  
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Nº do pôster",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"number", // text|number|hidden
                name:"poster_numero",
                readonly: false,
                placeholder:"Digite o número do tótem/pôster",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"CPF do avaliador do pôster",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"text", // text|number|hidden
                name:"poster_avaliador_cpf",
                readonly: false,
                placeholder:"CPF do avaliador",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Qualidade do material de exposição",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"range",range:true, // text|number|hidden
                name:"poster_nota_1",
                readonly: false,
                placeholder:"Notas entre 0 e 10",
                max:"10",
                min:"0",
                step:"0.5",
                oninput:"javascript:(Number(this.value)>10)?this.value=10:this.value ; (Number(this.value)<0)?this.value=0:this.value ; document.getElementById(this.name).innerHTML= this.value",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Clareza e exposição",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"range",range:true, // text|number|hidden
                name:"poster_nota_2",
                readonly: false,
                placeholder:"Notas entre 0 e 10",
                max:"10",
                min:"0",
                step:"0.5",
                oninput:"javascript:(Number(this.value)>10)?this.value=10:this.value ; (Number(this.value)<0)?this.value=0:this.value ; document.getElementById(this.name).innerHTML= this.value",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Domínio dos conceitos",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"range",range:true, // text|number|hidden
                name:"poster_nota_3",
                readonly: false,
                placeholder:"Notas entre 0 e 10",
                max:"10",
                min:"0",
                step:"0.5",
                oninput:"javascript:(Number(this.value)>10)?this.value=10:this.value ; (Number(this.value)<0)?this.value=0:this.value ; document.getElementById(this.name).innerHTML= this.value",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Capacidade de responder aos questionamentos",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"range",range:true, // text|number|hidden
                name:"poster_nota_4",
                readonly: false,
                placeholder:"Notas entre 0 e 10",
                max:"10",
                min:"0",
                step:"0.5",
                oninput:"javascript:(Number(this.value)>10)?this.value=10:this.value ; (Number(this.value)<0)?this.value=0:this.value ; document.getElementById(this.name).innerHTML= this.value",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Capacidade de exposição dentro do tempo",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"range",range:true, // text|number|hidden
                name:"poster_nota_5",
                readonly: false,
                placeholder:"Notas entre 0 e 10",
                max:"10",
                min:"0",
                step:"0.5",
                oninput:"javascript:(Number(this.value)>10)?this.value=10:this.value ; (Number(this.value)<0)?this.value=0:this.value ; document.getElementById(this.name).innerHTML= this.value",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Início da avaliação do pôster",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"text", // text|number|hidden
                name:"poster_inicio_avaliacao",
                readonly: false,
                disabled:false,
                placeholder:"",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Fim da avaliação do pôster",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"text", // text|number|hidden
                name:"poster_fim_avaliacao",
                readonly: false,
                disabled:false,
                placeholder:"",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            }
        ]
    },
    {legend:"Dados do resumo",
    id:"dados-resumo",
    view:true,
        labels:[
            {legend:"Status do resumo",
                select:true, view:true, // input|select
                options:["Resumo pendente","Resumo aguardando avaliação","Resumo em avaliação","Resumo avaliado"],
                type:"", // text|number|hidden
                name:"resumo_status",
                readonly: false,
                placeholder:"",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Início da avaliação do resumo",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"text", // text|number|hidden
                name:"resumo_inicio_avaliacao",
                readonly: false,
                disabled:false,
                placeholder:"",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Fim da avaliação do resumo",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"text", // text|number|hidden
                name:"resumo_fim_avaliacao",
                readonly: false,
                disabled:false,
                placeholder:"",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"CPF do avaliador",
                input:true, view:true, // input|select
                options:[],
                type:"text", // text|number|hidden
                name:"resumo_avaliador_cpf",
                readonly: false,
                placeholder:"Digite o CPF, apenas números",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Título",
                input:true, view:true, // input|select
                options:[],
                type:"text", // text|number|hidden
                name:"resumo_titulo",
                readonly: false,
                placeholder:"Título do resumo",
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Nota título",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"range",range:true, // text|number|hidden
                name:"resumo_titulo_nota",
                readonly: false,
                placeholder:"Notas entre 0 e 10",
                max:"10",
                min:"0",
                step:"0.5",
                oninput:"javascript:(Number(this.value)>10)?this.value=10:this.value ; (Number(this.value)<0)?this.value=0:this.value ; document.getElementById(this.name).innerHTML= this.value",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Introdução",
                textarea:true, view:true, // input|select|textarea
                options:[],
                type:"", // text|number|hidden
                name:"resumo_introducao",
                readonly: false,
                placeholder:"Digite a introdução (até 1000 caracteres)",
                onkeyup:"",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Nota introdução",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"range",range:true, // text|number|hidden
                name:"resumo_introducao_nota",
                readonly: false,
                placeholder:"Notas entre 0 e 10",
                max:"10",
                min:"0",
                step:"0.5",
                oninput:"javascript:(Number(this.value)>10)?this.value=10:this.value ; (Number(this.value)<0)?this.value=0:this.value ; document.getElementById(this.name).innerHTML= this.value",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Metodologia",
                textarea:true, view:true, // input|select
                options:[],
                type:"text", // text|number|hidden
                name:"resumo_metodologia",
                readonly: false,
                placeholder:"Metodologia (até 1000 caracteres)",
                oninput:"javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(1000, this.maxLength);",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Nota metodologia",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"range",range:true, // text|number|hidden
                name:"resumo_metodologia_nota",
                readonly: false,
                placeholder:"Notas entre 0 e 10",
                max:"10",
                min:"0",
                step:"0.5",
                oninput:"javascript:(Number(this.value)>10)?this.value=10:this.value ; (Number(this.value)<0)?this.value=0:this.value ; document.getElementById(this.name).innerHTML= this.value",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Resultado",
                textarea:true, view:true, // input|select
                options:[],
                type:"text", // text|number|hidden
                name:"resumo_resultado",
                readonly: false,
                placeholder:"Resultado (até 1000 caracteres)",
                oninput:"javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(1000, this.maxLength);",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Nota resultados",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"range",range:true, // text|number|hidden
                name:"resumo_resultado_nota",
                readonly: false,
                placeholder:"Notas entre 0 e 10",
                max:"10",
                min:"0",
                step:"0.5",
                oninput:"javascript:(Number(this.value)>10)?this.value=10:this.value ; (Number(this.value)<0)?this.value=0:this.value ; document.getElementById(this.name).innerHTML= this.value",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Conclusão",
                textarea:true, view:true, // input|select
                options:[],
                type:"text", // text|number|hidden
                name:"resumo_conclusao",
                readonly: false,
                placeholder:"Conclusão (até 1000 caracteres)",
                oninput:"javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(1000, this.maxLength);",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Nota conclusão",
                input:true, view:true, // input|select|textarea
                options:[],
                type:"range",range:true, // text|number|hidden
                name:"resumo_conclusao_nota",
                readonly: false,
                placeholder:"Notas entre 0 e 10",
                max:"10",
                min:"0",
                step:"0.5",
                oninput:"javascript:(Number(this.value)>10)?this.value=10:this.value ; (Number(this.value)<0)?this.value=0:this.value ; document.getElementById(this.name).innerHTML= this.value",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Palavras-chaves",
                textarea:true, view:true, // input|select
                options:[],
                type:"text", // text|number|hidden
                name:"palavras_chaves",
                readonly: false,
                placeholder:"Palavras-chaves (até 255 caracteres)",
                oninput:"javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(255, this.maxLength);",
                maxlength:"",
                minlength:"",
                required:false
            },
            {legend:"Colaboradores",
                textarea:true, view:true, // input|select
                options:[],
                type:"text", // text|number|hidden
                name:"colaboradores",
                readonly: false,
                placeholder:"Colaboradores (até 1000 caracteres)",
                oninput:"javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(255, this.maxLength);",
                maxlength:"",
                minlength:"",
                required:false
            }       
        ]
    },
    {legend:"Premiação",
    id:"dados-premiacao",
    view:true,
        labels:[
            {legend:"Indicação a:",
                select:true, view:true, // input|select
                options:["Menção honrosa","Indicação a prêmio destaque","Vencedor prêmio destaque"],
                type:"", // text|number|hidden
                name:"premio",
                readonly: false,
                placeholder:"", 
                oninput:"",
                maxlength:"",
                minlength:"",
                required:false
            }  
        ]
    },
]
function resetSchemaArticle() {
    schemaArticle[0].labels[2].options = []
    schemaArticle.forEach((e)=>{
        e.view = true;
        e.labels.forEach((e)=>{
            e.view = true;
            e.readonly = false;
        })
    })
}
type arrayFindIndexObj = ({legend: string; id: string; labels: ({legend: string; input: boolean; view: boolean; options: never[];type: string; name: string; readonly: boolean;placeholder: string; select?: undefined;} | { legend: string; select: boolean; view: boolean; options: number[]; type: string; name: string; readonly: boolean; placeholder: string; input?: undefined; } | { legend: string; select: boolean; view: boolean; options: string[]; type: string; name: string; readonly: boolean; placeholder: string; input?: undefined; })[];} | { legend: string; id: string; labels: ({ legend: string; select: boolean; view: boolean; options: string[]; type: string; name: string; readonly: boolean; placeholder: string; input?: undefined; disabled?: undefined; range?: undefined; max?: undefined; min?: undefined; step?: undefined; textarea?: undefined; } | { legend: string; input: boolean; view: boolean; options: never[]; type: string; name: string; readonly: boolean; disabled: boolean; placeholder: string; select?: undefined; range?: undefined; max?: undefined; min?: undefined; step?: undefined; textarea?: undefined; } | { legend: string; input: boolean; view: boolean; options: never[]; type: string; name: string; readonly: boolean; placeholder: string; select?: undefined; disabled?: undefined; range?: undefined; max?: undefined; min?: undefined; step?: undefined; textarea?: undefined; } | { legend: string; input: boolean; view: boolean; options: never[]; type: string; range: boolean; name: string; readonly: boolean; placeholder: string; max: string; min: string; step: string; select?: undefined; disabled?: undefined; textarea?: undefined; } | { legend: string; textarea: boolean; view: boolean; options: never[]; type: string; name: string; readonly: boolean; placeholder: string; select?: undefined; input?: undefined; disabled?: undefined; range?: undefined; max?: undefined; min?: undefined; step?: undefined; })[]; })[];
function findIndexObj(array: arrayFindIndexObj,id: string,name: string) {
    return schemaArticle[schemaArticle.findIndex( e => e.id == id)].labels[schemaArticle[schemaArticle.findIndex( e => e.id == id)].labels.findIndex( e => e.name == name)]
}
export let newArticle = async ()=>{
    let years = new Array;
    let data = await Edition.getByStatus('Congresso online')
    data.forEach(e => {
        years.push(e.year)
    });
    resetSchemaArticle()

    findIndexObj(schemaArticle,"dados-gerais","_id").view = false;
    findIndexObj(schemaArticle,"dados-gerais","id_unb").view = false;
    findIndexObj(schemaArticle,"dados-gerais","ano").options = years;
    findIndexObj(schemaArticle,"dados-video","iframe_video").view = false;
    schemaArticle[schemaArticle.findIndex(e=>e.id=="dados-poster")].view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_status").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_inicio_avaliacao").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_fim_avaliacao").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_avaliador_cpf").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_titulo_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_introducao_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_metodologia_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_resultado_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_conclusao_nota").view = false;
    schemaArticle[schemaArticle.findIndex(e=>e.id=="dados-premiacao")].view = false;
    

    return schemaArticle
};
export const insertValuesAndErrorMsg =  (schema,values,error = {})=>{
     schema.forEach((e)=>{
        e.labels.forEach((element: any) => {
            let name = element.name
            element.value=values[`${name}`];
            element.error=error[`${name}`];
            
        });
    });
};
export const clearValuesAndErrorMsg = (schema)=>{
    schema.forEach((e)=>{
        e.labels.forEach((element: any) => {
            element.value="";
            element.error="";
            
        });
    });
};
export let edit_meuResumo_externo = async ()=>{
    let years = new Array;
    let data = await Edition.getByStatus('Congresso online')
    data.forEach(e => {
        years.push(e.year)
    });
    resetSchemaArticle()
    
    findIndexObj(schemaArticle,"dados-gerais","_id").readonly = true;
    findIndexObj(schemaArticle,"dados-gerais","id_unb").view = false;
    findIndexObj(schemaArticle,"dados-gerais","ano").options = years;
    findIndexObj(schemaArticle,"dados-video","iframe_video").view = false;
    schemaArticle[schemaArticle.findIndex(e=>e.id=="dados-poster")].view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_status").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_inicio_avaliacao").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_fim_avaliacao").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_avaliador_cpf").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_titulo_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_introducao_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_metodologia_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_resultado_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_conclusao_nota").view = false;
    schemaArticle[schemaArticle.findIndex(e=>e.id=="dados-premiacao")].view = false;
    return schemaArticle
};
export let edit_meuResumo_unb = ()=>{
    
    resetSchemaArticle()
    
    findIndexObj(schemaArticle,"dados-gerais","_id").view = true;
    findIndexObj(schemaArticle,"dados-gerais","_id").readonly = true;
    findIndexObj(schemaArticle,"dados-gerais","id_unb").view = true;
    findIndexObj(schemaArticle,"dados-gerais","id_unb").readonly = true;
    findIndexObj(schemaArticle,"dados-gerais","ano").readonly = true;
    findIndexObj(schemaArticle,"dados-gerais","instituicao").readonly = true;
    findIndexObj(schemaArticle,"dados-gerais","edital").readonly = true;
    findIndexObj(schemaArticle,"dados-orientador","orientador_nome").readonly = true;
    findIndexObj(schemaArticle,"dados-orientador","orientador_cpf").readonly = true;
    findIndexObj(schemaArticle,"dados-autor","autor_nome").readonly = true;
    findIndexObj(schemaArticle,"dados-autor","autor_cpf").readonly = true;
    findIndexObj(schemaArticle,"dados-autor","co_autor_nome").view = false;
    findIndexObj(schemaArticle,"dados-autor","co_autor_cpf").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_titulo").readonly = true;
    findIndexObj(schemaArticle,"dados-video","iframe_video").view = false;
    schemaArticle[schemaArticle.findIndex(e=>e.id=="dados-poster")].view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_status").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_inicio_avaliacao").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_fim_avaliacao").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_avaliador_cpf").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_titulo_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_introducao_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_metodologia_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_resultado_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_conclusao_nota").view = false;
    schemaArticle[schemaArticle.findIndex(e=>e.id=="dados-premiacao")].view = false;
    

    return schemaArticle
};
export let edit_adminArticle = async (year)=>{
    let years = new Array;
    let data = await Edition.getAll()
    data.forEach(e => {
        years.push(e.year)
    });
    resetSchemaArticle()
    
    schemaArticle[schemaArticle.findIndex(e=>e.id=="dados-poster")].view = false;
    findIndexObj(schemaArticle,"dados-gerais","_id").readonly = true;
    findIndexObj(schemaArticle,"dados-gerais","ano").options = years;

    findIndexObj(schemaArticle,"dados-resumo","resumo_status").readonly = true;

    findIndexObj(schemaArticle,"dados-resumo","resumo_inicio_avaliacao").readonly = true;
    findIndexObj(schemaArticle,"dados-resumo","resumo_fim_avaliacao").readonly = true;
    findIndexObj(schemaArticle,"dados-resumo","resumo_avaliador_cpf").readonly = true;
    findIndexObj(schemaArticle,"dados-resumo","resumo_titulo_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_introducao_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_metodologia_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_resultado_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_conclusao_nota").view = false;



    

    return schemaArticle
};
export let new_adminArticle = async (year)=>{
    let years = new Array;
    let data = await Edition.getAll()
    data.forEach(e => {
        years.push(e.year)
    });
    resetSchemaArticle()
    
    schemaArticle[schemaArticle.findIndex(e=>e.id=="dados-poster")].view = false;
    findIndexObj(schemaArticle,"dados-gerais","_id").view = false;
    findIndexObj(schemaArticle,"dados-gerais","ano").options = years;

    findIndexObj(schemaArticle,"dados-resumo","resumo_status").readonly = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_inicio_avaliacao").readonly = true;
    findIndexObj(schemaArticle,"dados-resumo","resumo_fim_avaliacao").readonly = true;
    findIndexObj(schemaArticle,"dados-resumo","resumo_avaliador_cpf").readonly = true;
    findIndexObj(schemaArticle,"dados-resumo","resumo_titulo_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_introducao_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_metodologia_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_resultado_nota").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_conclusao_nota").view = false;



    

    return schemaArticle
};
export const choiceSchemaArticle = (req)=>{
    if (req.body._id == undefined) {
        return newArticle()
    }
    if (req.body.instituicao == "UNB") {
        return edit_meuResumo_unb();
    } else {
        return edit_meuResumo_externo();
    }
}
export let edit_articleReviewer = async ()=>{
   
    resetSchemaArticle()
    schemaArticle[schemaArticle.findIndex(e=>e.id=="dados-orientador")].view = false;
    schemaArticle[schemaArticle.findIndex(e=>e.id=="dados-autor")].view = false;
    schemaArticle[schemaArticle.findIndex(e=>e.id=="dados-video")].view = false;
    schemaArticle[schemaArticle.findIndex(e=>e.id=="dados-poster")].view = false;
    findIndexObj(schemaArticle,"dados-premiacao","premio").options = findIndexObj(schemaArticle,"dados-premiacao","premio").options.slice(0,2);

    findIndexObj(schemaArticle,"dados-gerais","id_unb").view = false;
    findIndexObj(schemaArticle,"dados-gerais","ano").view = false;
    findIndexObj(schemaArticle,"dados-gerais","instituicao").view = false;
    findIndexObj(schemaArticle,"dados-gerais","edital").view = false;
    findIndexObj(schemaArticle,"dados-gerais","_id").readonly = true;
    findIndexObj(schemaArticle,"dados-gerais","grande_area").readonly = true;
    findIndexObj(schemaArticle,"dados-gerais","subarea").readonly = true;

    findIndexObj(schemaArticle,"dados-resumo","resumo_status").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_inicio_avaliacao").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_fim_avaliacao").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_avaliador_cpf").view = false;
    findIndexObj(schemaArticle,"dados-resumo","resumo_titulo").readonly = true;
    findIndexObj(schemaArticle,"dados-resumo","resumo_introducao").readonly = true;
    findIndexObj(schemaArticle,"dados-resumo","resumo_metodologia").readonly = true;
    findIndexObj(schemaArticle,"dados-resumo","resumo_resultado").readonly = true;
    findIndexObj(schemaArticle,"dados-resumo","resumo_conclusao").readonly = true;
    findIndexObj(schemaArticle,"dados-resumo","palavras_chaves").view = false;
    findIndexObj(schemaArticle,"dados-resumo","colaboradores").view = false;

    return schemaArticle
};