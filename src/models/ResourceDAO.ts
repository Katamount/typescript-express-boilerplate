import {handleError} from '../util/Errors';
import { ResourcePost, ResourceGet } from '../controllers/input/Resource';

// Data Access Object. Set up your own database and access it throught this object
class ResourceDAO{
    /**
     * saveResource
     */
    public async saveResource(input:ResourcePost) {
        try {
            return input;
        } catch (error) {
            handleError(error);
        }
    }

    public async getResource(input:ResourceGet){
        try {
            return input;
        } catch (error) {
            handleError(error);
        }
    }
}

export default new ResourceDAO();