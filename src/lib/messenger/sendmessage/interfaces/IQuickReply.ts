//https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies
export interface IQuickReply {
    content_type:"text",
    title: string,
    payload: string,
    image_url?: string
}