import { TaskJobStatus, TaskType } from "./MessageToChildTypes";
import { JSONObject } from "@figurl/core-utils";
export declare type GetFigureDataRequest = {
    type: 'getFigureData';
};
export declare const isGetFigureDataRequest: (x: any) => x is GetFigureDataRequest;
export declare type GetFigureDataResponse = {
    type: 'getFigureData';
    figureData: any;
};
export declare const isGetFigureDataResponse: (x: any) => x is GetFigureDataResponse;
export declare type GetFileDataRequest = {
    type: 'getFileData';
    uri: string;
};
export declare const isGetFileDataRequest: (x: any) => x is GetFileDataRequest;
export declare type GetFileDataResponse = {
    type: 'getFileData';
    fileData: any;
};
export declare const isGetFileDataResponse: (x: any) => x is GetFileDataResponse;
export declare type GetFileDataUrlRequest = {
    type: 'getFileDataUrl';
    uri: string;
};
export declare const isGetFileDataUrlRequest: (x: any) => x is GetFileDataUrlRequest;
export declare type GetFileDataUrlResponse = {
    type: 'getFileDataUrl';
    fileDataUrl: string;
};
export declare const isGetFileDataUrlResponse: (x: any) => x is GetFileDataUrlResponse;
export declare type GetMutableRequest = {
    type: 'getMutable';
    key: string;
};
export declare const isGetMutableRequest: (x: any) => x is GetMutableRequest;
export declare type GetMutableResponse = {
    type: 'getMutable';
    value: string | null;
};
export declare const isGetMutableResponse: (x: any) => x is GetMutableResponse;
export declare type InitiateTaskRequest = {
    type: 'initiateTask';
    taskName: string;
    taskInput: {
        [key: string]: any;
    };
    taskType: TaskType;
};
export declare const isInitiateTaskRequest: (x: any) => x is InitiateTaskRequest;
export declare type InitiateTaskResponse = {
    type: 'initiateTask';
    taskJobId: string;
    status: TaskJobStatus;
    errorMessage?: string;
    returnValue?: any;
    returnValueUrl?: string;
};
export declare const isInitiateTaskResponse: (x: any) => x is InitiateTaskResponse;
export declare type SubscribeToFeedRequest = {
    type: 'subscribeToFeed';
    feedId: string;
};
export declare const isSubscribeToFeedRequest: (x: any) => x is SubscribeToFeedRequest;
export declare type SubscribeToFeedResponse = {
    type: 'subscribeToFeed';
    messages: JSONObject[];
};
export declare const isSubscribeToFeedResponse: (x: any) => x is SubscribeToFeedResponse;
export declare type StoreFileRequest = {
    type: 'storeFile';
    fileData: string;
};
export declare const isStoreFileRequest: (x: any) => x is StoreFileRequest;
export declare type StoreFileResponse = {
    type: 'storeFile';
    uri?: string;
};
export declare const isStoreFileResponse: (x: any) => x is StoreFileResponse;
export declare type SetUrlStateRequest = {
    type: 'setUrlState';
    state: {
        [key: string]: any;
    };
};
export declare const isSetUrlStateRequest: (x: any) => x is SetUrlStateRequest;
export declare type SetUrlStateResponse = {
    type: 'setUrlState';
};
export declare const isSetUrlStateResponse: (x: any) => x is SetUrlStateResponse;
export declare type FigurlRequest = GetFigureDataRequest | GetFileDataRequest | GetFileDataUrlRequest | GetMutableRequest | InitiateTaskRequest | SubscribeToFeedRequest | StoreFileRequest | SetUrlStateRequest;
export declare const isFigurlRequest: (x: any) => x is FigurlRequest;
export declare type FigurlResponse = GetFigureDataResponse | GetFileDataResponse | GetFileDataUrlResponse | GetMutableResponse | InitiateTaskResponse | SubscribeToFeedResponse | StoreFileResponse | SetUrlStateResponse;
export declare const isFigurlResponse: (x: any) => x is FigurlResponse;
