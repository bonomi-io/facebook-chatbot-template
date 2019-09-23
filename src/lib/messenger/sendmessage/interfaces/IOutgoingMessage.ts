import { Attachment } from "./IAttachment";
import { IRecipient } from "../../general/Components";
import { IQuickReply } from "./IQuickReply";

//https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types
export type MessagingType = "RESPONSE" | "UPDATE" | "MESSAGE_TAG";

//https://developers.facebook.com/docs/messenger-platform/send-messages/message-tags
export type MessagingTag = 
    "BUSINESS_PRODUCTIVITY" |
    "COMMUNITY_ALERT" |
    "CONFIRMED_EVENT_REMINDER" |
    "NON_PROMOTIONAL_SUBSCRIPTION" |
    "PAIRING_UPDATE" |
    "APPLICATION_UPDATE" |
    "ACCOUNT_UPDATE" |
    "PAYMENT_UPDATE" |
    "PERSONAL_FINANCE_UPDATE" |
    "SHIPPING_UPDATE" |
    "RESERVATION_UPDATE" |
    "ISSUE_RESOLUTION" |
    "APPOINTMENT_UPDATE" |
    "GAME_EVENT" |
    "TRANSPORTATION_UPDATE" |
    "FEATURE_FUNCTIONALITY_UPDATE" |
    "TICKET_UPDATE";

//https://developers.facebook.com/docs/messenger-platform/reference/send-api/#payload
export type SenderAction = "typing_on" | "typing_off" | "mark_seen";
export type NotificationType = "REGULAR" | "SILENT_PUSH" | "NO_PUSH";

export interface IOutgoingMessage {
    messaging_type: MessagingType,
    tag?: MessagingTag,
    recipient: IRecipient,
    message?: IMessageContent,
    sender_action?: SenderAction,
    notification_type?: NotificationType
}

export interface IMessageContent {
    text?: string,
    attachment?: Attachment,
    quick_replies?: IQuickReply[],
    metadata?: string
} 
