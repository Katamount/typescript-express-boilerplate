import * as stream from 'stream';
import * as winston from 'winston';
import {logger_conf} from '../config/logger'

class Logger {
    private options: any = logger_conf;

    public logger: winston.Logger;

    constructor() {
        this.config();
    }

    private config(): void {
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.File(this.options.file),
                new winston.transports.Console(this.options.console),
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.printf(nfo => {
                    return `${nfo.level}: ${nfo.timestamp} - ${nfo.message}`;
                })
            ),
            exitOnError: false,
        });
        
        this.logger.stream = (options?: any) => new stream.Duplex({
            write: (message: string, encoding: any) => {
                this.logger.info(message.toString());
            }
        });
    }
}

export const logger = new Logger().logger;