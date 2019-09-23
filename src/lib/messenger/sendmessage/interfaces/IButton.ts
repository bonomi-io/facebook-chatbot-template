export type Button = IUrlButton | IPostBackButton | ICallButton;

export type WebviewHeight = "compact" | "tall" | "full";

export interface IUrlButton {
    type: "web_url",
    title: string,
    url: string,
    webview_height_ratio?: WebviewHeight,
    messenger_extensions?: boolean,  
    fallback_url?: string
}

export interface IPostBackButton {
    type: "postback",
    title: string,
    payload: string
}

export interface ICallButton {
    type: "phone_number",
    title: string,
    payload: string
}

export class ButtonHelper {
    public static urlButton(title: string, url: string, webview_height_ratio: WebviewHeight = "tall", messenger_extensions = true) : IUrlButton {
        return {
            type: "web_url",
            title,
            url,
            webview_height_ratio,
            messenger_extensions
        }
    }
    public static postbackButton(title: string, payload: string) : IPostBackButton {
        return {
            type: "postback",
            title,
            payload
        }
    }
}
