import { ChatBlocks } from "./ChatBlocks";
import { ChatContext } from "./ChatContext";
import { MainMenu } from "./MainMenu";
import { JokesModul } from "./Jokes";
import { WeatherModul } from "./Weather";

export class ChatRouter {
    static redirect(destination: ChatBlocks, context: ChatContext) {
        const sender = context.sender;
        switch (destination) {
            case ChatBlocks.MAINMENU: MainMenu.menu(context); break;
            case ChatBlocks.RANDOMJOKE: JokesModul.randomJoke(context); break;
            case ChatBlocks.DONTUNDERSTAND: {
                sender.text("Sorry I don't understand");
                break;
            }
            case ChatBlocks.WEATHER: WeatherModul.currentWeather(context); break;
        }
    }
}