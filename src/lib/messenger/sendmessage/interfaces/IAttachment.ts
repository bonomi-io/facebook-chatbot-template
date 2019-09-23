import { IButtonTemplate, IGenericTemplate } from "./ITemplate";

export type Attachment = IImageAttachment | ITemplateAttachment;

export interface IImageAttachment {
    type: "image",
    payload: {
        url: string, 
        is_reusable: boolean
    }
}

export interface ITemplateAttachment {
    type: "template",
    payload: IButtonTemplate | IGenericTemplate
}