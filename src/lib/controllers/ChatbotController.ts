import * as Express from 'express';
import { version as appVersion, name as appName } from '../../../package.json';
import { IWebhookEvent, IWebhookEventEntry } from '../messenger/receivemessage/interfaces/IWebhookEvent';
import { ReceiveMessageHandler } from '../messenger/receivemessage/ReceiveMessageHandler';

export class ChatbotController {

    static home = async (_: Express.Request, res: Express.Response) => {
        res.json({ up: true, name: appName, version: appVersion, environment: process.env.NODE_ENV });
    }

    static handleVerification = async (req: Express.Request, res: Express.Response) => {
        let VERIFY_TOKEN = "JSCONF2019";
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];
        if (mode && token) {
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                console.log('WEBHOOK_VERIFIED');
                res.status(200).send(challenge);
            } else {
                res.sendStatus(403);
            }
        }
    }

    static handleMessage = async (req: Express.Request, res: Express.Response) => {
        console.log("Request received", req.body);
        const body: IWebhookEvent = req.body;
        if (body.object === 'page') {
            body.entry.forEach(async (entry: IWebhookEventEntry) => {
                let firstMessage = entry.messaging[0];
                ReceiveMessageHandler.handle(firstMessage);
            });
            res.status(200).send('EVENT_RECEIVED');
        } else {
            res.sendStatus(404);
        }
    }
}