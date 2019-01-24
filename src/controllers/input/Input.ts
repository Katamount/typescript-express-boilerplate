import { validate } from "class-validator";
import { UnprocessableEntityError } from "../../util/Errors";
import { logger } from "../../util/Logger";

export class Input {

    public async validate() {
        const errors = await validate(this, { validationError: { target: false } });
        if (0 < errors.length) {
            let messages = "";
            logger.debug(JSON.stringify(errors));
            errors.map((val)=>{
                for (const key in val.constraints) {
                    if (val.constraints.hasOwnProperty(key)) {
                        messages += val.constraints[key];
                        messages += ", ";
                    }
                }
            });
            throw new UnprocessableEntityError(messages);
        }
    }
}