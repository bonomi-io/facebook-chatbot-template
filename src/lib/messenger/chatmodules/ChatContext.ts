import { SendMessageHandler } from "../sendmessage/SendMessageHandler";
import { IProfile } from "../profile/Profile";

export interface ChatContext {
    senderPsid: string;
    profile: IProfile;
    sender: SendMessageHandler
}