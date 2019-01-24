import * as HttpStatus from 'http-status-codes';
import {logger} from './Logger';

export class APIError extends Error {
    public name:string;
    public status:number;
    public message:string;

    constructor(message:string) {
        super(message);
        this.message = message;
    }

    /**
     * body
     * @description
     */
    public body() {
        return {status: this.status, error: this.name, message: this.message}
    }
}

export class DuplicateKeyError extends APIError {  
    
    constructor(message:string) {
        super(message);
        this.name = "DuplicateKeyError"
        this.status = HttpStatus.CONFLICT;
    }
}

export class InternalServerError extends APIError {

    constructor(message:string) {
        super(message);
        this.name = "InternalServerError";
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
// bad syntax error
export class BadRequestError extends APIError{
    constructor(message:string){
        super(message);
        this.name = "BadRequestError";
        this.status = HttpStatus.BAD_REQUEST;
    }
}

export class NotFoundError extends APIError{
    constructor(message:string){
        super(message);
        this.name = "NotFoundError";
        this.status = HttpStatus.NOT_FOUND;
    }
}
// Invalid Input
export class UnprocessableEntityError extends APIError {
    constructor(message:string) {
        super(message);
        this.name = "UnprocessableEntityError";
        this.status = HttpStatus.UNPROCESSABLE_ENTITY;
    }
}

export const handleError = function(error){
    if(error instanceof APIError){
        throw error;
    } else if ('MongoError' == error.name && 11000 == error.code) {
        logger.info(error.message);
        throw new DuplicateKeyError("This record already exists");
    } else if ("ValidationError" == error.name) {
        logger.debug(error.name + " " + error.message);
        throw new UnprocessableEntityError(error.message);
    } else if("CastError" == error.name){
        logger.info(error.name + " " + error.message);
        throw new UnprocessableEntityError("record " + error.value + " is not a valid ID");
    } else {
        logger.error(error.message);
        console.log(error);
        throw new InternalServerError(error.message);
    }
  
}