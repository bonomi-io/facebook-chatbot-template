import * as request from "request-promise-native";
import { ButtonHelper, Button } from "./interfaces/IButton";
import { OutgoingMessageHelper } from "./MessageHelper";
import { IOutgoingMessage } from "./interfaces/IOutgoingMessage";
import { IQuickReply } from "./interfaces/IQuickReply";
import MyLogger from "../../logger/logging";

const token = process.env.FACEBOOK_TOKEN;
const logger = new MyLogger(__filename);

export class SendMessageHandler {
    psid: string;

    constructor(psid: string) {
        this.psid = psid;
    }

    private timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async postbackButton(text: string, title: string, payload: string) {
        const button: Button = ButtonHelper.postbackButton(title, payload);
        const message = OutgoingMessageHelper.buttons(text, this.psid, button);
        await this.sendMessage(message);
    }

    public async urlButton(text: string, title: string, url: string) {
        const button: Button = ButtonHelper.urlButton(title, url);
        const message = OutgoingMessageHelper.buttons(text, this.psid, button);
        await this.sendMessage(message);
    }

    public async markSeen() {
        const message = OutgoingMessageHelper.markSeen(this.psid);
        await this.sendMessage(message);
    }

    public async typing(duration: number = 300) {
        const changeOn = OutgoingMessageHelper.typing(this.psid, true);
        await this.sendMessage(changeOn);
        await this.timeout(duration);
    }

    public async text(text: string) {
        const message = OutgoingMessageHelper.text(text, this.psid);
        await this.sendMessage(message);
    }

    public async quickReplies(title: string, quickReplies: IQuickReply[]) {
        const message = OutgoingMessageHelper.quickReplies(this.psid, title, quickReplies);
        await this.sendMessage(message);
    }

    public async sendMessage(message: IOutgoingMessage) {
        logger.info("Sending message");
        console.log(message);
        var options = {
            uri: "https://graph.facebook.com/v3.3/me/messages",
            qs: { "access_token": token },
            json: message
        };

        await request.post(options)
            .then(() => {
                logger.info('Message was sent.');
            })
            .catch((err: Error) => {
                console.error("Unable to send message:" + err);
            });
    }

}