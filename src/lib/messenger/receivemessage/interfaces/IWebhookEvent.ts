import { IIncomingMessage } from "./IIncomingMessage";

export interface IWebhookEvent {
    object: "page",
    entry: IWebhookEventEntry[];
}

export interface IWebhookEventEntry {
    id: string,
    time: number,
    messaging: IIncomingMessage[];
}