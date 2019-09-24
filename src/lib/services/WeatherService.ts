import fetch, { RequestInit } from 'node-fetch';
import MyLogger from '../logger/logging';

const logger = new MyLogger(__filename);

const apiKey = process.env.ACCUWEATHER_TOKEN;
const locationId: number = 187409;
const accuweatherUrl = 'http://dataservice.accuweather.com/';
const currentConditionsEndpoint = 'currentconditions/v1/';
const TwelveHoursForecastEndpoint = '/forecasts/v1/hourly/12hour/';

export interface IWeatherInfo {
    shortText: string;
    longText: string;
    url: string;
}

export interface ICurrentCondition {
    WeatherText: string;
    Temperature: {
        Metric: {
            Value: number;
        };
    };
    Wind: {
        Direction: {
            Degrees: number;
            Localized: string;
        };
        Speed: {
            Metric: {
                Value: number;
                Unit: string;
            };
        };
    };
    CloudCover: number;
    HasPrecipitation: boolean;
    PrecipitationType: string;
    MobileLink: string;
}

export interface IForecastCondition {
    Temperature: {
        Value: number;
        Unit: string;
    };
    Wind: {
        Direction: {
            Degrees: number;
            Localized: string;
        };
        Speed: {
            Value: number;
            Unit: string;
        };
    };
    PrecipitationProbability: number;
}

export interface IForecastData {
    temperatureMin: number;
    temperatureMax: number;
    precipitationProbability: number;
}

export class WeatherService {
    public getWeatherData = async (endpoint: string): Promise<{}> => {
        logger.info(`Getting '${endpoint}' weather for location '${locationId}.`);

        const url = `${accuweatherUrl}${endpoint}${locationId}?apikey=${apiKey}&language=en&details=true&metric=true`;

        const config: RequestInit = {
            method: 'GET',
            headers: {
                'Accept-Encoding': 'gzip',
                'Content-Type': 'application/json',
            },
        };
        const result = await fetch(url, config);
        const ret = await result.json();

        logger.info(`Weather returned successfully.`);
        return ret;
    };

    public getCurrentConditions = async (): Promise<ICurrentCondition> => {
        return ((await this.getWeatherData(currentConditionsEndpoint)) as ICurrentCondition[])[0];
    };

    public get12HoursForecast = async (): Promise<IForecastCondition[]> => {
        return (await this.getWeatherData(TwelveHoursForecastEndpoint)) as IForecastCondition[];
    };
}
