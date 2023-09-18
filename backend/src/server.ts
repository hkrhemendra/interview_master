import * as express from 'express';
import * as bodyParser from 'body-parser';
import ContactRouter  from './routes/ContactRouter';
import { AppDataSource } from './data-source';

export class Server{

    public app: express.Application = express();

    constructor(){
        this.setConfiguration();
        this.setRoutes()
        this.error404Handler();
        this.handleError();
    }

    setConfiguration(){
        this.connectToSQLite();
        this.configureBodyParser();
    }

    connectToSQLite(){
        AppDataSource.initialize().then(() =>  {
            console.log("Database connected successfully")
        }).catch((error) => {
            console.log("error --------> ", error)
        })
    }

    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({
            extended: true
        }))
    }

    setRoutes(){
        this.app.use('/api/contacts/', ContactRouter);
    }

    error404Handler(){
        this.app.use((req, res) => {
            res.status(404).json({
                message: "Not Found", 
                statusCode: 404
            })
        })
    }

    handleError(){
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || "Something went wrong. Please try again",
                errorStatus,
            })
        })
    }

}