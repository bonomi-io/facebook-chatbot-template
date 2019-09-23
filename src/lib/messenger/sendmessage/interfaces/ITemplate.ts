import { Button, IUrlButton } from "./IButton";

export interface ITemplate {
    template_type: "button" | "generic"
}

export interface IButtonTemplate extends ITemplate {
    template_type: "button",
    text: string,
    buttons: Button[]
}

export interface IGenericTemplate extends ITemplate {
    template_type: "generic",
    elements: IGenericTemplateElement[]
}

export interface IGenericTemplateElement {
    title: string,
    subtitle?: string,
    image_url?: string,
    default_action?: IUrlButton,
    buttons?: Button[]
}