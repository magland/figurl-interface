import { isTaskJobStatus, isTaskType } from "./MessageToChildTypes";
import { validateObject, isArrayOf, isEqualTo, isJSONObject, isNull, isOneOf, isString, optional } from "@figurl/core-utils";
export const isGetFigureDataRequest = (x) => {
    return validateObject(x, {
        type: isEqualTo('getFigureData')
    });
};
export const isGetFigureDataResponse = (x) => {
    return validateObject(x, {
        type: isEqualTo('getFigureData'),
        figureData: () => (true)
    });
};
export const isGetFileDataRequest = (x) => {
    return validateObject(x, {
        type: isEqualTo('getFileData'),
        uri: optional(isString)
    });
};
export const isGetFileDataResponse = (x) => {
    return validateObject(x, {
        type: isEqualTo('getFileData'),
        fileData: () => (true)
    });
};
export const isGetFileDataUrlRequest = (x) => {
    return validateObject(x, {
        type: isEqualTo('getFileDataUrl'),
        uri: optional(isString)
    });
};
export const isGetFileDataUrlResponse = (x) => {
    return validateObject(x, {
        type: isEqualTo('getFileDataUrl'),
        fileDataUrl: isString
    });
};
export const isGetMutableRequest = (x) => {
    return validateObject(x, {
        type: isEqualTo('getMutable'),
        key: isString
    });
};
export const isGetMutableResponse = (x) => {
    return validateObject(x, {
        type: isEqualTo('getMutable'),
        value: isOneOf([isNull, isString])
    });
};
export const isInitiateTaskRequest = (x) => {
    return validateObject(x, {
        type: isEqualTo('initiateTask'),
        taskName: isString,
        taskInput: () => (true),
        taskType: isTaskType
    });
};
export const isInitiateTaskResponse = (x) => {
    return validateObject(x, {
        type: isEqualTo('initiateTask'),
        taskJobId: isString,
        status: isTaskJobStatus,
        errorMessage: optional(isString),
        returnValue: optional(() => (true)),
        returnValueUrl: optional(isString)
    });
};
export const isSubscribeToFeedRequest = (x) => {
    return validateObject(x, {
        type: isEqualTo('subscribeToFeed'),
        feedId: isString
    });
};
export const isSubscribeToFeedResponse = (x) => {
    return validateObject(x, {
        type: isEqualTo('subscribeToFeed'),
        messages: isArrayOf(isJSONObject)
    });
};
export const isStoreFileRequest = (x) => {
    return validateObject(x, {
        type: isEqualTo('storeFile'),
        fileData: isString
    });
};
export const isStoreFileResponse = (x) => {
    return validateObject(x, {
        type: isEqualTo('storeFile'),
        uri: optional(isString)
    });
};
export const isSetUrlStateRequest = (x) => {
    return validateObject(x, {
        type: isEqualTo('setUrlState'),
        state: isJSONObject
    });
};
export const isSetUrlStateResponse = (x) => {
    return validateObject(x, {
        type: isEqualTo('setUrlState')
    });
};
export const isFigurlRequest = (x) => {
    return isOneOf([
        isGetFigureDataRequest,
        isGetFileDataRequest,
        isGetFileDataUrlRequest,
        isGetMutableRequest,
        isInitiateTaskRequest,
        isSubscribeToFeedRequest,
        isStoreFileRequest,
        isSetUrlStateRequest
    ])(x);
};
export const isFigurlResponse = (x) => {
    return isOneOf([
        isGetFigureDataResponse,
        isGetFileDataResponse,
        isGetFileDataUrlResponse,
        isGetMutableResponse,
        isInitiateTaskResponse,
        isSubscribeToFeedResponse,
        isStoreFileResponse,
        isSetUrlStateResponse
    ])(x);
};
//# sourceMappingURL=FigurlRequestTypes.js.map