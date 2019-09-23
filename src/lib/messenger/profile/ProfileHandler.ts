import { IProfile } from "./Profile";
import * as request from "request-promise-native";

const token = process.env.FACEBOOK_TOKEN;

export class ProfileHandler {

    public static async getProfile(psid: string): Promise<IProfile> {
        console.log(`Getting profile of ${psid}...`);
        var options = {
            uri: `https://graph.facebook.com/${psid}`,
            qs: {
                "access_token": token,
                "fields": "first_name,last_name,profile_pic,locale,timezone,gender"
            },
        };

        return await request.get(options)
            .then((result: string) => {
                console.log(`Profile retrieved ${result}`);
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