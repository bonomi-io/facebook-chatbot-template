import { ChatContext } from "./ChatContext";
import { ChatBlocks } from "./ChatBlocks";
import { IQuickReply } from "../sendmessage/interfaces/IQuickReply";

export class MainMenu {
    static menu = async (context: ChatContext) => {
        const sender = context.sender;
        await sender.text(`How can I help you?`);

        const items: IQuickReply[] = [];
        items.push({
            content_type: "text",
            title: "Menu1",
            payload: ChatBlocks[ChatBlocks.MAINMENU]
        });
        items.push({
            content_type: "text",
            title: "Menu2",
            payload: ChatBlocks[ChatBlocks.MAINMENU]
        });
        items.push({
            content_type: "text",
            title: "Menu3",
            payload: ChatBlocks[ChatBlocks.MAINMENU]
        });

        await sender.quickReplies("Please choose: ", items);
    }
}