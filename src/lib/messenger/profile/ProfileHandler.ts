import { IProfile } from "./Profile";
import * as request from "request-promise-native";
import MyLogger from "../../logger/logging";

const token = process.env.FACEBOOK_TOKEN;
const logger = new MyLogger(__filename);

export class ProfileHandler {

    public static async getProfile(psid: string): Promise<IProfile> {
        logger.info(`Getting profile of ${psid}...`);
        var options = {
            uri: `https://graph.facebook.com/${psid}`,
            qs: {
                "access_token": token,
                "fields": "first_name,last_name,profile_pic,locale,timezone,gender"
            },
        };

        return await request.get(options)
            .then((result: string) => {
                logger.info(`Profile retrieved ${result}`);
                return JSON.parse(result) as IProfile;
            })
            .catch((err: Error) => {
                console.error("Unable to get profile:" + err);
                return {
                    first_name: "Unknown",
                    last_name: "Unknown"
                } as IProfile;
            });
    }

}