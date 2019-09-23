import * as winston from 'winston';
import * as path from 'path';

const { createLogger: createWinstonLogger, format, transports } = winston;
const logLevel = process.env.NODE_ENV === 'dev' ? 'debug' : 'info';
console.log(`Log level is ${logLevel}.`);
const options = {
    console: {
        level: logLevel,
        handleExceptions: true,
        json: false,
        colorize: false,
    },
};

export const winstonLogger = createWinstonLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize(),
        format.printf((info: any) => {
            if (info.message instanceof Object || info.message instanceof Array) {
                info.message = JSON.stringify(info.message);
            }
            return `${info.timestamp} ${info.level} ${info.message}`;
        }),
    ),
    transports: [new transports.Console(options.console)],
    exitOnError: false,
});

// instantiate a new Winston Logger with the settings defined above
export default class MyLogger {
    fileName: string;
    constructor(fileName: string) {
        this.fileName = `${path
            .dirname(fileName)
            .split(path.sep)
            .pop()}/${path.basename(fileName)}`;
    }

    private formatMessage(message: string) {
        return `file="${this.fileName}" message="${message}"`;
    }

    public info(message: string) {
        winstonLogger.info(this.formatMessage(message));
    }

    public debug(message: string) {
        winstonLogger.debug(this.formatMessage(message));
    }

    public error(message: Error | string | Object) {
        if (message instanceof Error) {
            winstonLogger.error(this.formatMessage(message.message));
            //Sentry.captureException(message);
        } else if (message instanceof Object) {
            winstonLogger.error(this.formatMessage(JSON.stringify(message)));
        } else {
            winstonLogger.error(this.formatMessage(message));
        }
    }

    public validationErrors(...messages: any[]) {
        winstonLogger.error(messages);
    }
}
