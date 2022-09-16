var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Feed_localMessages, _Feed_internalListeners, _FeedManager_feeds;
import sendRequestToParent from "./sendRequestToParent";
import { isSubscribeToFeedResponse } from "./viewInterface/FigurlRequestTypes";
import { randomAlphaString } from "@figurl/core-utils";
export class Feed {
    constructor(feedId) {
        this.feedId = feedId;
        _Feed_localMessages.set(this, []);
        _Feed_internalListeners.set(this, {});
        const req = {
            type: 'subscribeToFeed',
            feedId
        };
        sendRequestToParent(req).then(resp => {
            if (!isSubscribeToFeedResponse(resp)) {
                throw Error('Invalid response to subscribeToFeed');
            }
            this._handleNewMessages(0, resp.messages);
        });
    }
    waitForMessages(a) {
        return __awaiter(this, void 0, void 0, function* () {
            const { position, waitMsec } = a;
            if (__classPrivateFieldGet(this, _Feed_localMessages, "f").length > position) {
                return __classPrivateFieldGet(this, _Feed_localMessages, "f").slice(position);
            }
            return new Promise((resolve, reject) => {
                let ret = [];
                let finalized = false;
                const listenerId = randomAlphaString(10);
                const finalize = () => {
                    if (finalized)
                        return;
                    finalized = true;
                    delete __classPrivateFieldGet(this, _Feed_internalListeners, "f")[listenerId];
                    resolve(ret);
                };
                __classPrivateFieldGet(this, _Feed_internalListeners, "f")[listenerId] = () => {
                    ret = __classPrivateFieldGet(this, _Feed_localMessages, "f").slice(position);
                    finalize();
                };
                setTimeout(() => {
                    if (!finalized)
                        finalize();
                }, Number(waitMsec));
            });
        });
    }
    getLocalMessages() {
        return [...__classPrivateFieldGet(this, _Feed_localMessages, "f")]; // important to return a copy here
    }
    _handleNewMessages(position, messages) {
        const messages2 = messages.slice(position - __classPrivateFieldGet(this, _Feed_localMessages, "f").length);
        if (messages2.length === 0)
            return;
        for (let msg of messages2) {
            __classPrivateFieldGet(this, _Feed_localMessages, "f").push(msg);
        }
        for (let listenerId in __classPrivateFieldGet(this, _Feed_internalListeners, "f")) {
            __classPrivateFieldGet(this, _Feed_internalListeners, "f")[listenerId]();
        }
    }
}
_Feed_localMessages = new WeakMap(), _Feed_internalListeners = new WeakMap();
class FeedManager {
    constructor() {
        _FeedManager_feeds.set(this, {});
    }
    loadFeed(feedId) {
        if (feedId in __classPrivateFieldGet(this, _FeedManager_feeds, "f"))
            return __classPrivateFieldGet(this, _FeedManager_feeds, "f")[feedId];
        const sf = new Feed(feedId);
        __classPrivateFieldGet(this, _FeedManager_feeds, "f")[feedId] = sf;
        return sf;
    }
    _handleNewFeedMessages(feedId, position, messages) {
        if (feedId in __classPrivateFieldGet(this, _FeedManager_feeds, "f")) {
            __classPrivateFieldGet(this, _FeedManager_feeds, "f")[feedId]._handleNewMessages(position, messages);
        }
    }
}
_FeedManager_feeds = new WeakMap();
const feedManager = new FeedManager();
export const handleNewFeedMessages = (msg) => {
    feedManager._handleNewFeedMessages(msg.feedId, msg.position, msg.messages);
};
export default feedManager;
//# sourceMappingURL=feedManager.js.map