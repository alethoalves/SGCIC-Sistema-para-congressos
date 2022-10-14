import { Schema,Model, model, connection } from "mongoose";

type EditionType = {
    number: number,
    title: string,
    slug: string,
    year: number,
    status: string
}

const schema = new Schema<EditionType>({
    number: Number,
    title: String,
    slug: String,
    year: Number,
    status: String
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
    getByYear:async (year)=>{
        let dataEdition = editionModel.findOne({year:parseInt(year)}).sort({year:'desc'});
        return dataEdition
    },
    getByStatus:async (status)=>{
        let dataEdition = editionModel.find({status:'Congresso online'}).sort({year:'desc'});
        return dataEdition
    },
    saveEdition:async(data)=>{
       return editionModel.create(data)
    },
    updateEdition:async(year,data)=>{
        return editionModel.updateOne({year:year},data)
     },
    deleteEdition:async(year)=>{
        await editionModel.deleteOne({year:year})
     },
}
