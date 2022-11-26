import {checkSchema} from "express-validator"
export const FormValidator = {
    article:checkSchema({
        ano:{
            notEmpty:true,
            errorMessage:'Insira o ano do congresso no qual o seu resumo está vinculado!'
        },
        instituicao:{
            notEmpty:true,
            errorMessage:'Selecione a insituição a qual está vinculado seu resumo.'
        },
        edital:{
            notEmpty:true,
            errorMessage:'Selecione o edital ao qual está vinculado o seu resumo.'
        },
        grande_area:{
            notEmpty:true,
            errorMessage:'Selecione a grande área do seu resumo.'
        },
        subarea:{
            notEmpty:true,
            errorMessage:'Selecione a subárea do seu resumo'
        },
        orientador_nome:{
            notEmpty:true,
            trim:true,
            errorMessage:'Digite o nome do orientador.'
        },
        orientador_cpf:{
            notEmpty:true,
            isLength:{
                options:{
                    min:11,
                    max:11
                }
            },
            errorMessage:'Digite o CPF com 11 caracteres do orientador.'
        },
        autor_nome:{
            notEmpty:true,
            trim:true,
            errorMessage:'Digite o nome do autor do resumo.'
        },
        autor_cpf:{
            notEmpty:true,
            isLength:{
                options:{
                    min:11,
                    max:11
                }
            },
            errorMessage:'Digite o CPF com 11 caracteres do autor do resumo.',
        },
        link_video:{
            notEmpty:true,
            isURL:true,
            trim:true,
            errorMessage:'Insira uma URL válida para o link compartilhável do seu vídeo de apresentação.',
        },
        resumo_titulo:{
            trim:true,
            notEmpty:true,
            isLength:{
                options:{
                    max:255
                }
            },
            errorMessage:'Digite o título do resumo com no máximo 255 caracteres.'
        },
        resumo_introducao:{
            trim:true,
            notEmpty:true,
            isLength:{
                options:{
                    max:1000,min:200
                }
            },
            errorMessage:'Digite a introdução do resumo com no mínimo 200 e no máximo 1000 caracteres.'
        },
        resumo_metodologia:{
            trim:true,
            notEmpty:true,
            isLength:{
                options:{
                    max:1000,min:200
                }
            },
            errorMessage:'Digite a metodologia do resumo com no mínimo 200 e no máximo 1000 caracteres.'
        },
        resumo_resultado:{
            trim:true,
            notEmpty:true,
            isLength:{
                options:{
                    max:1000,min:200
                }
            },
            errorMessage:'Digite o resultado do resumo com no mínimo 200 e no máximo 1000 caracteres.'
        },
        resumo_conclusao:{
            trim:true,
            notEmpty:true,
            isLength:{
                options:{
                    max:1000,min:200
                }
            },
            errorMessage:'Digite a conclusão do resumo com no mínimo 200 e no máximo 1000 caracteres.'
        },
        resumo_palavras_chaves:{
            trim:true,
            isLength:{
                options:{
                    max:255
                }
            },
            errorMessage:'Esse campo deve ter no máximo 255 caracteres.'
        },
        resumo_colaboradores:{
            trim:true,
            isLength:{
                options:{
                    max:1000
                }
            },
            errorMessage:'O campo colaboradores deve ter no máximo 1000 caracteres.'
        },
    }),
    articleAdmin:checkSchema({
        ano:{
            notEmpty:true,
            errorMessage:'Insira o ano do congresso no qual o seu resumo está vinculado!'
        },
        instituicao:{
            notEmpty:true,
            errorMessage:'Selecione a insituição a qual está vinculado seu resumo.'
        },
        edital:{
            notEmpty:true,
            errorMessage:'Selecione o edital ao qual está vinculado o seu resumo.'
        },
        orientador_nome:{
            notEmpty:true,
            trim:true,
            errorMessage:'Digite o nome do orientador.'
        },
        orientador_cpf:{
            notEmpty:true,
            isLength:{
                options:{
                    min:11,
                    max:11
                }
            },
            errorMessage:'Digite o CPF com 11 caracteres do orientador.'
        },
        autor_nome:{
            notEmpty:true,
            trim:true,
            errorMessage:'Digite o nome do autor do resumo.'
        },
        autor_cpf:{
            notEmpty:true,
            isLength:{
                options:{
                    min:11,
                    max:11
                }
            },
            errorMessage:'Digite o CPF com 11 caracteres do autor do resumo.',
        },
        
        resumo_status:{
            notEmpty:true,
            errorMessage:'Insira o status do resumo.',
        },
        resumo_titulo:{
            trim:true,
            isLength:{
                options:{
                    max:255
                }
            },
            errorMessage:'Digite o título do resumo com no máximo 255 caracteres.'
        },
        resumo_introducao:{
            trim:true,
            isLength:{
                options:{
                    max:1000
                }
            },
            errorMessage:'Digite a introdução do resumo com no mínimo 200 e no máximo 1000 caracteres.'
        },
        resumo_metodologia:{
            trim:true,
            isLength:{
                options:{
                    max:1000
                }
            },
            errorMessage:'Digite a metodologia do resumo com no mínimo 200 e no máximo 1000 caracteres.'
        },
        resumo_resultado:{
            trim:true,
            isLength:{
                options:{
                    max:1000
                }
            },
            errorMessage:'Digite o resultado do resumo com no mínimo 200 e no máximo 1000 caracteres.'
        },
        resumo_conclusao:{
            trim:true,
            isLength:{
                options:{
                    max:1000
                }
            },
            errorMessage:'Digite a conclusão do resumo com no mínimo 200 e no máximo 1000 caracteres.'
        },
        resumo_palavras_chaves:{
            trim:true,
            
        },
    }),
    articleReviewer:checkSchema({
        _id:{ 
            notEmpty:true,
            errorMessage:'Insira id do resumo!'
        },
        grande_area:{
            notEmpty:true,
            errorMessage:'Selecione a grande área do seu resumo.'
        },
        subarea:{
            notEmpty:true,
            errorMessage:'Selecione a subárea do seu resumo'
        },
        resumo_titulo:{
            trim:true,
            notEmpty:true,
            isLength:{
                options:{
                    max:255
                }
            },
            errorMessage:'Digite o título do resumo com no máximo 255 caracteres.'
        },
        resumo_titulo_nota:{
            
            notEmpty:true,
            errorMessage:'Atribua notas diferentes de 0'
        },
        resumo_introducao:{
            trim:true,
            notEmpty:true,
            isLength:{
                options:{
                    max:1000,min:200
                }
            },
            errorMessage:'Digite a introdução do resumo com no mínimo 200 e no máximo 1000 caracteres.'
        },
        
        resumo_metodologia:{
            trim:true,
            notEmpty:true,
            isLength:{
                options:{
                    max:1000,min:200
                }
            },
            errorMessage:'Digite a metodologia do resumo com no mínimo 200 e no máximo 1000 caracteres.'
        },
        
        resumo_resultado:{
            trim:true,
            notEmpty:true,
            isLength:{
                options:{
                    max:1000,min:200
                }
            },
            errorMessage:'Digite o resultado do resumo com no mínimo 200 e no máximo 1000 caracteres.'
        },
        
        resumo_conclusao:{
            trim:true,
            notEmpty:true,
            isLength:{
                options:{
                    max:1000,min:200
                }
            },
            errorMessage:'Digite a conclusão do resumo com no mínimo 200 e no máximo 1000 caracteres.'
        },
        
        
    }),
    edition:checkSchema({
        year:{
            notEmpty:true,
            isNumeric:true,
            errorMessage:"Preencha um número com 4 dígitos",
            trim:true,
            isLength:{
                options:{
                    min:4,
                    max:4
                }
            }
        },
        title:{
            notEmpty:true,
            trim:true,
            errorMessage:"Digite o título do congresso",
        },
        smallTitle:{
            notEmpty:true,
            trim:true,
            errorMessage:"Digite o título do congresso",
        },
        date_artes:{
            notEmpty:true,
            trim:true,
            errorMessage:"Digite a data de apresentação de Artes e Humanidades",
        },
        date_saude:{
            notEmpty:true,
            trim:true,
            errorMessage:"Digite a data de apresentação de Saúde e Vida",
        },
        date_exatas:{
            notEmpty:true,
            trim:true,
            errorMessage:"Digite a data de apresentação de Exatas e Tecnológicas",
        },
        hour_am:{
            notEmpty:true,
            trim:true,
            errorMessage:"Digite o período da apresentação matutino",
        },
        hour_pm:{
            notEmpty:true,
            trim:true,
            errorMessage:"Digite o período da apresentação vespertino",
        }
    }),
    user:checkSchema({
        name:{
            trim:true,
            notEmpty:true,
            errorMessage:'Digite seu nome.'
        },
        email:{
            notEmpty:true,
            trim:true,
            isEmail:true,
            normalizeEmail:true,
            errorMessage:'Digite um email válido.'
        },
        cpf:{
            trim:true,
            isLength:{
                options:{
                    min:11,
                    max:11
                }
            },
            errorMessage:'CPF deve ter 11 caracteres.'

        }
    }),
    editMyProfile:checkSchema({
        name:{
            trim:true,
            notEmpty:true,
            errorMessage:'Digite seu nome.'
        },
        email:{
            notEmpty:true,
            trim:true,
            isEmail:true,
            normalizeEmail:true,
            errorMessage:'Digite um email válido.'
        },
        cpf:{
            trim:true,
            isLength:{
                options:{
                    min:11,
                    max:11
                }
            },
            errorMessage:'CPF deve ter apenas 11 caracteres.'

        }
    }),
    updatePassword:checkSchema({
        password:{
            trim:true,
            notEmpty:true,
            errorMessage:'Digita sua senha atual.'
        }
    })
}