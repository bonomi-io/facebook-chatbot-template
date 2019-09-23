import { ChatContext } from "./ChatContext";
import { JokesService } from "../../services/JokesService";

export class JokesModul {
    static randomJoke = async (context: ChatContext) => {
        const sender = context.sender;
        const joke = JokesService.getRandomJoke();
        await sender.text(joke.title);
        await sender.text(joke.body);
    }
}