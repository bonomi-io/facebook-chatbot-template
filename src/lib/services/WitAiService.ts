import MyLogger from '../logger/logging';
import request = require('request');
import IWitAiResult from './IWitAiResult';

const logger = new MyLogger(__filename);
const token = process.env.WITAI_TOKEN;
const apiVersion = '20190923';

export class WitAiService {
    public static getEntities = async (message: string) => {
        logger.info(`Getting entities for '${message}' language.`);

        const encodedMessage = encodeURI(message);
        const url = `https://api.wit.ai/message?v=${apiVersion}&q=${encodedMessage}`;

        return await new Promise<IWitAiResult>((resolve, reject) => {
            request.get(
                url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    time: true,
                },
                (error: Error, response: request.Response) => {
                    if (error) {
                        reject(error);
                    }
                    const responseJson = JSON.parse(response.body);
                    const timeElapsed = response.elapsedTime;
                    logger.info(`Entities returned in ${timeElapsed}ms.`);
                    resolve(responseJson as IWitAiResult);
                },
            );
        })
            .then(res => {
                return res;
            })
            .catch((error: Error) => {
                logger.error(`Could not retrieve entities.`);
                console.log(error);
                return null;
            });
    };
}
