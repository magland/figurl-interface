import { isFigurlRequest } from "./FigurlRequestTypes";
import { validateObject, isEqualTo, isOneOf, isString } from "@figurl/core-utils";
export const isFigurlRequestMessage = (x) => {
    return validateObject(x, {
        type: isEqualTo('figurlRequest'),
        figureId: isString,
        requestId: isString,
        request: isFigurlRequest
    });
};
export const isMessageToBackendMessage = (x) => {
    return validateObject(x, {
        type: isEqualTo('messageToBackend'),
        figureId: isString,
        message: () => (true)
    });
};
export const isMessageToParent = (x) => {
    return isOneOf([
        isFigurlRequestMessage,
        isMessageToBackendMessage
    ])(x);
};
//# sourceMappingURL=MessageToParentTypes.js.map