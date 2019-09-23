import { MessagingType, IOutgoingMessage } from "./interfaces/IOutgoingMessage";
import { Button } from "./interfaces/IButton";
import { IQuickReply } from "./interfaces/IQuickReply";

export class OutgoingMessageHelper {
    
    public static text(message: string, recipientId: string, messagingType: MessagingType = "RESPONSE") : IOutgoingMessage {
        return {
            messaging_type: messagingType,
            recipient: {
                id: recipientId
            },
            message: {
                text: message
            }
        };
    }

    public static typing(recipientId: string, on: boolean = true, messagingType: MessagingType = "RESPONSE") : IOutgoingMessage {
        return {
            messaging_type: messagingType,
            recipient: {
                id: recipientId 
            },
            sender_action: on ? "typing_on" : "typing_off"
        }
    }

    public static markSeen(recipientId: string, messagingType: MessagingType = "RESPONSE") : IOutgoingMessage {
        return {
            messaging_type: messagingType,
            recipient: {
                id: recipientId 
            },
            sender_action: "mark_seen"
        }
    }
    
    public static image(recipientId: string, url: string, messagingType: MessagingType = "RESPONSE") : IOutgoingMessage {
        return {
            messaging_type: messagingType,
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "image",
                    payload: {
                        url,
                        is_reusable: true
                    }
                }
            }
        }
    }

    public static buttons(message: string, recipientId: string, button1: Button, button2: Button | null = null, button3: Button | null = null, messagingType: MessagingType = "RESPONSE") : IOutgoingMessage {
        const buttons: Button[] = [button1];
        if (button2) buttons.push(button2);
        if (button3) buttons.push(button3);
        return {
            messaging_type: messagingType,
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "button",
                        buttons,
                        text: message
                    }
                }
            }
        }
    }

    public static quickReplies(recipientId: string, title: string, quickReplies: IQuickReply[], messagingType: MessagingType = "RESPONSE") : IOutgoingMessage {
        return {
            messaging_type: messagingType,
            recipient: {
                id: recipientId
            },
            message: {
                text: title,
                quick_replies: quickReplies
            }
        }
    }    
}