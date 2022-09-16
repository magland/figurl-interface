var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from "react";
import feedManager from "./feedManager";
import { sleepMsec } from "./util/sleepMsec";
import { messageCount, unscaledDurationMsec } from "./viewInterface/kacheryTypes";
export const parseFeedUri = (feedUri) => {
    const a = feedUri.split('/');
    const feedId = a[2];
    return { feedId };
};
const useFeed = (args) => {
    let { feedId, feedUri } = args;
    if (feedUri) {
        if (feedId) {
            throw Error('useFeed: Cannot specify both feedUri and feedId');
        }
        const { feedId: fid } = parseFeedUri(feedUri);
        feedId = fid;
    }
    const [messages, setMessages] = useState(undefined);
    const [feed, setFeed] = useState(undefined);
    useEffect(() => {
        setMessages(undefined);
        setFeed(undefined);
        if (!feedId)
            return;
        let valid = true;
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const feed = feedManager.loadFeed(feedId);
            setFeed(feed);
            let internalPosition = 0;
            while (valid) {
                const messages = yield feed.waitForMessages({ position: internalPosition, maxNumMessages: messageCount(0), waitMsec: unscaledDurationMsec(10000) });
                if (!valid)
                    return;
                if (messages.length > 0) {
                    const localMessages = feed.getLocalMessages();
                    setMessages(localMessages);
                    internalPosition = localMessages.length;
                }
                else {
                    yield sleepMsec(unscaledDurationMsec(100));
                }
            }
        }))();
        return () => {
            valid = false;
        };
    }, [feedId]);
    return { messages, feed };
};
export default useFeed;
//# sourceMappingURL=useFeed.js.map