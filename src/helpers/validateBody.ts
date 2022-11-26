import { validationResult, matchedData } from 'express-validator';
import * as formArticleConstructor from '../helpers/formArticleConstructor'

export const checkErrorForm = (req,schema,values) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        let error = errors.mapped();
        //formArticleConstructor.insertValuesAndErrorMsg(schema,values,error)
        return error
    }
};
export const checkCPF = (user,values) => {
        let cpf = user.cpf;
        if((values.orientador_cpf == cpf) || (values.autor_cpf==cpf) || (values.co_autor_cpf==cpf)){
            return 
        }else{
            let error = {orientador_cpf:{msg:''},autor_cpf:{msg:''},co_autor_cpf:{msg:''}}
            //formArticleConstructor.insertValuesAndErrorMsg(schema,values,error)
            return error
        }

};