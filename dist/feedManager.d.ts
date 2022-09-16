import { DurationMsec, MessageCount } from "./viewInterface/kacheryTypes";
import { NewFeedMessagesMessage } from "./viewInterface/MessageToChildTypes";
import { JSONObject } from "@figurl/core-utils";
export declare class Feed {
    #private;
    feedId: string;
    constructor(feedId: string);
    waitForMessages(a: {
        position: number;
        maxNumMessages: MessageCount;
        waitMsec: DurationMsec;
    }): Promise<JSONObject[]>;
    getLocalMessages(): JSONObject[];
    _handleNewMessages(position: number, messages: JSONObject[]): void;
}
declare class FeedManager {
    #private;
    loadFeed(feedId: string): Feed;
    _handleNewFeedMessages(feedId: string, position: number, messages: JSONObject[]): void;
}
declare const feedManager: FeedManager;
export declare const handleNewFeedMessages: (msg: NewFeedMessagesMessage) => void;
export default feedManager;
