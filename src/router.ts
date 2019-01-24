import * as express from 'express';
import { resource } from './routes/Resource';



class Router {
    private app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
        this.configure();
    }

    private configure(): void {
        this.app.use('/api/v1/resource', resource);
       

    }
}

export default Router;