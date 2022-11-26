import {checkSchema} from "express-validator"
export const FormAuthValidator = { 
    signup:checkSchema({
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

        },
        password:{notEmpty:true,errorMessage:'Digite uma senha!'}
    }),
    signupReviewer:checkSchema({
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

        },
        vinculo_institucional:{
            trim:true,
            notEmpty:true,
            errorMessage:"Selecione a instituição na qual você está vinculado."
        },
        password:{notEmpty:true,errorMessage:'Digite uma senha!'}
    }),
    signinReviewer:checkSchema({
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
    signin:checkSchema({
        cpf:{
            trim:true,
            isLength:{
                options:{
                    min:11,
                    max:11
                }
            },
            errorMessage:'CPF deve ter 11 caracteres.'

        },
        password:{notEmpty:true,errorMessage:'Digite uma senha!'}
    }),
    addNewUser:checkSchema({
        name:{
            trim:true,
            notEmpty:true,
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

        },
        password:{notEmpty:true,errorMessage:'Digite uma senha!'},
        isEvaluator:{
            notEmpty:true,
        },
        isAdmin:{
            notEmpty:true,
        }
    }),
    resetPassword:checkSchema({
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
    })
}
