import express, {Application} from "express";
import userRoutes from '../routes/usuario.routes';
import cors from "cors";
import db from "../database/connection";

class Server{
    
    private app: Application;    
    private port: string;
    private appPaths = {
        usuarios: '/api/usuarios',
    }
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        // métodos iniciales
        this.conectarDBMySQL();
        this.middlewares();
        this.routes();
    }
    
    // database
    async conectarDBMySQL(){
        try {
            await db.authenticate();
            console.log("Database online...");
        } catch (error: any) {
            throw new Error(error);
        }
    }

    middlewares(){
        // CORS
        this.app.use( cors() );

        // lectura del body
        this.app.use( express.json() );
        
        // carpeta pública
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use(this.appPaths.usuarios,userRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto: " + this.port);
        })
    }
}

export default Server;
