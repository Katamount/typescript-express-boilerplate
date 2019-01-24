import * as express from 'express';
import { controller } from '../controllers/Controller';
import * as HttpStatus from 'http-status-codes';
import { logger } from '../util/Logger';

class Resource {
    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.post('/', async (req: express.Request, res: express.Response) => {
            try {
                logger.debug("POST /resource: " + JSON.stringify(req.body))
                let r = await controller.newResource(req.body);
                res.status(HttpStatus.CREATED).send(r);
            } catch (error) {
                res.status(error.status).send(error.body());
            }
        });

        this.router.get('/', async (req: express.Request, res: express.Response) => {
            try {
                logger.debug("GET /resource: " + JSON.stringify(req.query))
                let r = await controller.getResource(req.query);
                res.status(HttpStatus.OK).send(r);
            } catch (error) {
                res.status(error.status).send(error.body());
            }
        });

    }
}

export const resource = new Resource().router;