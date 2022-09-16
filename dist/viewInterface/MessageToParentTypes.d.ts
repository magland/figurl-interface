import { FigurlRequest } from "./FigurlRequestTypes";
export declare type FigurlRequestMessage = {
    type: 'figurlRequest';
    figureId: string;
    requestId: string;
    request: FigurlRequest;
};
export declare const isFigurlRequestMessage: (x: any) => x is FigurlRequestMessage;
export declare type MessageToBackendMessage = {
    type: 'messageToBackend';
    figureId: string;
    message: any;
};
export declare const isMessageToBackendMessage: (x: any) => x is MessageToBackendMessage;
export declare type MessageToParent = FigurlRequestMessage | MessageToBackendMessage;
export declare const isMessageToParent: (x: any) => x is MessageToParent;
