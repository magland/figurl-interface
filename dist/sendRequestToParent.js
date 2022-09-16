var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sendMessageToParent from "./sendMessageToParent";
import { randomAlphaString } from "@figurl/core-utils";
const urlSearchParams = new URLSearchParams(window.location.search);
const queryParams = Object.fromEntries(urlSearchParams.entries());
const pendingRequests = {};
export const handleFigurlResponse = (msg) => {
    const requestId = msg.requestId;
    const response = msg.response;
    if (requestId in pendingRequests) {
        pendingRequests[requestId].onResponse(response);
        delete pendingRequests[requestId];
    }
};
export const figureId = queryParams.figureId || 'undefined';
const sendRequestToParent = (request) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const requestId = randomAlphaString(10);
        pendingRequests[requestId] = {
            onResponse: (response) => {
                resolve(response);
            },
            onError: (err) => {
                reject(err);
            }
        };
        const msg = {
            type: 'figurlRequest',
            figureId,
            requestId,
            request
        };
        sendMessageToParent(msg);
    });
});
export default sendRequestToParent;
//# sourceMappingURL=sendRequestToParent.js.map