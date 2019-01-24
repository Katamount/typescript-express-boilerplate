import resourceDAO from '../models/ResourceDAO';
import { ResourcePost, ResourceGet } from './input/Resource';
import { handleError } from '../util/Errors';

class Controller {

    public async newResource(body){
        try{
            const input = new ResourcePost(body.name, body.description);
            input.validate();

            await resourceDAO.saveResource(input);
            return {message: "Resource created",
                    body: input
                    }
        } catch (error){
            handleError(error);
        }
    }

    public async getResource(query){
        try{
            const input = new ResourceGet(query.name, query.description);
            input.validate();

            
            return await resourceDAO.getResource(input);
        } catch (error){
            handleError(error);
        }
    }
}

export const controller = new Controller();