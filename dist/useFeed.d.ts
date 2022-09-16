import { Feed } from "./feedManager";
import { JSONObject } from "@figurl/core-utils";
export declare const parseFeedUri: (feedUri: string) => {
    feedId: string;
};
declare const useFeed: (args: {
    feedId?: string;
    feedUri?: string;
}) => {
    messages: JSONObject[] | undefined;
    feed: Feed | undefined;
};
export default useFeed;
