import * as express from 'express';
import { resource } from './routes/Resource';
import { NotFoundError } from './util/Errors';



class Router {
    private app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
        this.configure();
    }

    private configure(): void {
        this.app.use('/api/v1/resource', resource);
        this.app.all('*', (req: express.Request, res: express.Response) => {
            const error = new NotFoundError("API Endpoint Doesn't Exist");
            res.status(error.status).send(error.body());
        });
    }
}

export default Router;