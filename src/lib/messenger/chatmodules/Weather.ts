import { ChatContext } from "./ChatContext";
import { WeatherService, ICurrentCondition } from "../../services/WeatherService";

export class WeatherModul {
    static currentWeather = async (context: ChatContext) => {
        const weatherSerice = new WeatherService();
        const weather: ICurrentCondition = await weatherSerice.getCurrentConditions();
        context.sender.text(weather.WeatherText);
    }
}