import { IRecipient } from "../../general/Components";

export interface IReferral {
    ref: string;
    source: "SHORTLINK" | "ADS";
    type: "OPEN_THREAD";
}

export interface IPostBack {
    title: string;
    payload: string;
}

export interface IIncomingMessage {
    recipient: IRecipient;
    sender: IRecipient;
    timestamp: number;
    message?: {
        text: string;
        quick_reply?: {
            payload: string;
        }
    };
    referral?: IReferral;
    postback?: IPostBack;
}