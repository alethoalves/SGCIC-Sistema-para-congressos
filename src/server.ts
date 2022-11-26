import express, { Request, Response } from 'express';
import flash from "connect-flash";
import path from 'path'; 
import mustache from 'mustache-express';
import dotenv from 'dotenv'; 
import { mongoConnect } from "./database/mongo";
import session from 'express-session';
import adminRoutes from './routes/admin'
import publicRoute from './routes/public'
import userRoutes from './routes/user' 
dotenv.config();
mongoConnect();

const server = express();

server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, 'views'));
server.engine('mustache', mustache());

server.use(express.static(path.join(__dirname,'../public')));

server.use(express.urlencoded({extended: true}));
//Configuração da sessão
    server.use(session({ 
        resave: false,
        saveUninitialized: false,
        secret: "anyrandomstring",
        cookie:{maxAge:3*36000000}
    })) 
//Fim da configuração da sessão
server.use(express.json())
server.use(flash()); 

server.use('/',publicRoute);
server.use('/user',userRoutes)
server.use('/admin',adminRoutes);

server.use('/notAvailable',(req: Request, res: Response)=>{
    res.render('public/pages/notAvailable');
});
server.use((req: Request, res: Response)=>{
    res.status(404).render('public/pages/404');
});

server.listen(8080,()=>{
    console.log('Servidor rodando!')
})