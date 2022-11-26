import { Schema,Model, model, connection } from "mongoose";

type EditionType = {
    number: number,
    title: string,
    smallTitle:string,
    year: number,
    statusSubmit: boolean,
    statusPoster: boolean,
    date_artes:string,
    date_saude:string,
    date_exatas:string,
    hour_pm:string,
    hour_am:string,
    local_abertura:string,
    local_apresentacao:string,
    local_encerramento:string,
    checkinArtesMatutino:boolean,
    checkinArtesVespertino:boolean,
    checkinSaudeMatutino:boolean,
    checkinSaudeVespertino:boolean,
    checkinExatasMatutino:boolean,

}

const schema = new Schema<EditionType>({
    number: Number,
    title: String,
    smallTitle:String,
    year: Number,
    statusSubmit: Boolean,
    statusPoster: Boolean,
    date_artes:String,
    date_saude:String,
    date_exatas:String,
    hour_pm:String,
    hour_am:String,
    local_abertura:String,
    local_apresentacao:String,
    local_encerramento:String,
    checkinArtesMatutino:Boolean,
    checkinArtesVespertino:Boolean,
    checkinSaudeMatutino:Boolean,
    checkinSaudeVespertino:Boolean,
    checkinExatasMatutino:Boolean,
})

const modelName: string = 'Edition'; 
const editionModel = connection && connection.models[modelName] 
? 
(connection.models[modelName] as Model<EditionType>)
:
model<EditionType>(modelName, schema)

export default editionModel;

export const Edition = {
    getAll:async ()=>{
        let dataEdition = editionModel.find({}).sort({year:'desc'});
        return dataEdition
    },
    getOneByYear:async (year)=>{
        let dataEdition = editionModel.findOne({year:parseInt(year)}).sort({year:'desc'});
        return dataEdition
    },
    getByStatusSubmit:async (status)=>{
        let dataEdition = editionModel.find({statusSubmit:status}).sort({year:'desc'});
        return dataEdition
    },
    getByStatusPoster:async (status)=>{
        let dataEdition = editionModel.find({statusSubmit:status}).sort({year:'desc'});
        return dataEdition
    },
    saveEdition:async(data)=>{
       return editionModel.create(data)
    },
    updateEdition:async(obj)=>{
        return editionModel.updateOne({_id:obj._id},obj)
     },
    deleteEdition:async(year)=>{
        await editionModel.deleteOne({year:year})
     },
     delEditionByYear:async(year)=>{
        await editionModel.deleteOne({year:year})
     },
    search:async (data,value)=>{
        
        return data.filter(item=>{
            
            return (
                item.title.toLowerCase().trim().indexOf(value.toLowerCase().trim()) >-1 
                ||
                item.year.toString().trim().indexOf(value.trim()) >-1 
               
                )
        })
    }
     ,
}
