import { ChatBlocks } from "./ChatBlocks";
import { ChatContext } from "./ChatContext";
import { MainMenu } from "./MainMenu";
import { JokesModul } from "./Jokes";

export class ChatRouter {
    static redirect(destination: ChatBlocks, context: ChatContext) {
        switch (destination) {
            case ChatBlocks.MAINMENU: MainMenu.menu(context); break;
            case ChatBlocks.RANDOMJOKE: JokesModul.randomJoke(context); break;
            case ChatBlocks.DONTUNDERSTAND: {
                const sender = context.sender;
                sender.text("Sorry I don't understand");
            }
        }
    }
}