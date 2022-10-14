import { connect } from "mongoose";
export const mongoConnect = async () => {
    try{
        console.log("Conectando ao MongoDB...");
        await connect('mongodb://localhost:27017/SGCIC');
        console.log("MongoDB conectado com sucesso");
    }catch (error){
        console.log("Erro conexão MongoDB:", error);
    }
}