import sendMessageToParent from "./sendMessageToParent";
import { figureId } from "./sendRequestToParent";
export const sendMessageToBackend = (message) => {
    sendMessageToParent({
        type: 'messageToBackend',
        figureId,
        message
    });
};
const onMessageFromBackendCallbacks = [];
export const onMessageFromBackend = (callback) => {
    onMessageFromBackendCallbacks.push(callback);
};
export const handleMessageFromBackend = (message) => {
    for (let cb of onMessageFromBackendCallbacks) {
        cb(message);
    }
};
//# sourceMappingURL=customMessages.js.map