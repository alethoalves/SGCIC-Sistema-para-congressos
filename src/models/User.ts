import { Schema,Model, model, connection, FilterQuery } from "mongoose";
import bcrypt from 'bcrypt'; 


type UserType = {
    name: string,
    email: string,
    cpf: string,
    isAdmin:boolean,
    isReviewer:boolean,
    passwordHash: string,
    vinculo_institucional:string
}

const schema = new Schema<UserType>({
    name: String,
    email: String,
    cpf: String,
    isAdmin:Boolean,
    isReviewer:Boolean,
    passwordHash: String,
    vinculo_institucional:String

})

const modelName: string = 'User';
const userModel = connection && connection.models[modelName]?(connection.models[modelName] as Model<UserType>):model<UserType>(modelName, schema)
export default userModel;

export const User = {
    getOneByCPF: (obj:{cpf:string})=>{
         return  userModel.findOne(obj)
    },
    getOneById: (id)=>{

        return  userModel.findOne({_id:id})
   },
    userCreate: async (obj)=>{
        console.log(obj.isReviewer)
        //encrypt password
        const passwordHash = await bcrypt.hash(obj.password,10);
        //create user data
        obj.isAdmin = false;
        obj.isReviewer = false;
        obj.passwordHash = passwordHash;
        await userModel.create(obj);
        
        let user = await userModel.findOne({cpf:obj.cpf});
        if(user){
            return true
        }else{
            return false
        }
    },
    userUpdate: async (obj)=>{
        if(obj.password){
            //encrypt password
            const passwordHash = await bcrypt.hash(obj.password,10);
            //create user data
            obj.passwordHash = passwordHash;
        }
        await userModel.findOneAndUpdate({_id:obj._id}, obj);
    }
}
