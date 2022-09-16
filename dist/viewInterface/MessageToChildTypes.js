import { isFigurlResponse } from "./FigurlRequestTypes";
import { isUserId } from "./kacheryTypes";
import { validateObject, isArrayOf, isEqualTo, isJSONObject, isNumber, isOneOf, isString, optional } from "@figurl/core-utils";
export const isTaskType = (x) => (['calculation', 'action'].includes(x));
export const isTaskJobStatus = (x) => (['waiting', 'started', 'error', 'finished'].includes(x));
export const isFigurlResponseMessage = (x) => {
    return validateObject(x, {
        type: isEqualTo('figurlResponse'),
        requestId: isString,
        response: isFigurlResponse
    });
};
export const isNewFeedMessagesMessage = (x) => {
    return validateObject(x, {
        type: isEqualTo('newFeedMessages'),
        feedId: isString,
        position: isNumber,
        messages: isArrayOf(isJSONObject)
    });
};
export const isTaskStatusUpdateMessage = (x) => {
    return validateObject(x, {
        type: isEqualTo('taskStatusUpdate'),
        taskJobId: isString,
        status: isTaskJobStatus,
        errorMessage: optional(isString),
        returnValue: optional(() => (true))
    });
};
export const isSetCurrentUserMessage = (x) => {
    return validateObject(x, {
        type: isEqualTo('setCurrentUser'),
        userId: optional(isUserId),
        googleIdToken: optional(isString)
    });
};
export const isFileDownloadProgressMessage = (x) => {
    return validateObject(x, {
        type: isEqualTo('fileDownloadProgress'),
        uri: isString,
        loaded: isNumber,
        total: isNumber
    });
};
export const isMessageToFrontendMessage = (x) => {
    return validateObject(x, {
        type: isEqualTo('messageToFrontend'),
        message: () => (true)
    });
};
export const isMessageToChild = (x) => {
    return isOneOf([
        isFigurlResponseMessage,
        isNewFeedMessagesMessage,
        isTaskStatusUpdateMessage,
        isSetCurrentUserMessage,
        isFileDownloadProgressMessage,
        isMessageToFrontendMessage
    ])(x);
};
//# sourceMappingURL=MessageToChildTypes.js.map