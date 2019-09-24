import { SendMessageHandler } from "../sendmessage/SendMessageHandler";
import { IIncomingMessage } from "./interfaces/IIncomingMessage";
import { ProfileHandler } from "../profile/ProfileHandler";
import { IProfile } from "../profile/Profile";
import { ChatContext } from "../chatmodules/ChatContext";
import { ChatBlocks } from "../chatmodules/ChatBlocks";
import { ChatRouter } from "../chatmodules/ChatRouter";
import { WitAiService } from "../../services/WitAiService";
import IWitAiResult from "../../services/IWitAiResult";
import MyLogger from "../../logger/logging";

const logger = new MyLogger(__filename);

export class ReceiveMessageHandler {

    static handle = async (message: IIncomingMessage) => {
        console.log("Received message", message);
        const senderPsid = message.sender.id;
        const context: ChatContext = await ReceiveMessageHandler.createContext(senderPsid);

        if (message.message && message.message.quick_reply) {
            await ReceiveMessageHandler.handlePostback(context, message.message.quick_reply.payload); //Only allow quick reply as postback
        } else if (message.message) {
            await ReceiveMessageHandler.handleMessage(context, message.message.text);
        } else if (message.postback) {
            await ReceiveMessageHandler.handlePostback(context, message.postback.payload);
        } else if (message.referral) {
            await ReceiveMessageHandler.handleReferral(context, message.referral);
        }
    }

    static handleMessage = async (context: ChatContext, message: string) => {
        const entities: IWitAiResult | null = await WitAiService.getEntities(message);
        logger.info(JSON.stringify(entities!!));
        if (entities && entities.entities.intent && entities.entities.intent[0].value === 'joke') {
            ChatRouter.redirect(ChatBlocks.RANDOMJOKE, context);
        } else if (entities && entities.entities.intent && entities.entities.intent[0].value === 'weather') {
            ChatRouter.redirect(ChatBlocks.WEATHER, context);
        } else {
            ChatRouter.redirect(ChatBlocks.DONTUNDERSTAND, context);
        }
    }

    static handlePostback = async (context: ChatContext, payload: string) => {
        const block = ChatBlocks[payload as keyof typeof ChatBlocks];
        if (block) {
            ChatRouter.redirect(block, context);
        } else {
            const sender = context.sender;
            await sender.text(`Unrecognized postback ${payload}.`);
        }
    }

    static handleReferral = async (context: ChatContext, referral: {}) => {

    }

    static handleQuickReply = async (context: ChatContext) => {

    }

    static createContext = async (senderPsid: string): Promise<ChatContext> => {
        const profile: IProfile = await ProfileHandler.getProfile(senderPsid);
        return {
            senderPsid,
            profile,
            sender: new SendMessageHandler(senderPsid)
        }
    }
}