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
    getAll:async ()=>{
        let data = userModel.find({});
        return data
    },
    search:async (data,value)=>{
        
        return data.filter(item=>{
            return (
                item.name.toLowerCase().trim().indexOf(value.toLowerCase().trim()) >-1 
                ||
                item.email.toLowerCase().trim().indexOf(value.toLowerCase().trim()) >-1 
                ||
                item.cpf.toLowerCase().trim().indexOf(value.toLowerCase().trim()) >-1 
                
                )
        })
    },
    getOneByCPF:async (cpf)=>{
        let data =  userModel.findOne({cpf:cpf});
        return data
    },
    getOneById: (id)=>{

        return  userModel.findOne({_id:id})
   },
   delUserByCPF: async (cpf)=>{
    await userModel.deleteOne({cpf})
    },
    userCreate: async (obj)=>{
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
