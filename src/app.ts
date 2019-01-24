import * as express from 'express';
import * as bodyParser from 'body-parser';
import Router from './router';
import { logger } from './util/Logger';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

class App {
    public app: express.Application;
    private router: Router;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
    // support application/json
    this.app.use(bodyParser.json());
    this.app.use((err, req, res, next) => {
        logger.info(err);
        if (err) {
            if(err.expose){
                logger.info(err.name);
                res.status(err.status).send({status: err.status, error: err.name, message: err.message});
            } else {
                logger.error(err.name);
                logger.error(err.message);
                logger.error(err.stack);
                logger.error(err.satus);
                res.sendStatus(INTERNAL_SERVER_ERROR);
            }
        } else {
            next();
        }
    });

    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({extended: false}));

    this.app.use(function (req, res, next) {
        res.header("Content-Type",'application/json');
        next();
    });
    // Routing
    this.router = new Router(this.app);
    }
}

export default new App().app;