import { FigurlResponse } from "./FigurlRequestTypes";
import { UserId } from "./kacheryTypes";
import { JSONObject } from "@figurl/core-utils";
export declare type TaskType = 'calculation' | 'action';
export declare const isTaskType: (x: any) => x is TaskType;
export declare type TaskJobStatus = 'waiting' | 'started' | 'error' | 'finished';
export declare const isTaskJobStatus: (x: any) => x is TaskJobStatus;
export declare type FigurlResponseMessage = {
    type: 'figurlResponse';
    requestId: string;
    response: FigurlResponse;
};
export declare const isFigurlResponseMessage: (x: any) => x is FigurlResponseMessage;
export declare type NewFeedMessagesMessage = {
    type: 'newFeedMessages';
    feedId: string;
    position: number;
    messages: JSONObject[];
};
export declare const isNewFeedMessagesMessage: (x: any) => x is NewFeedMessagesMessage;
export declare type TaskStatusUpdateMessage = {
    type: 'taskStatusUpdate';
    taskJobId: string;
    status: TaskJobStatus;
    errorMessage?: string;
    returnValue?: any;
};
export declare const isTaskStatusUpdateMessage: (x: any) => x is TaskStatusUpdateMessage;
export declare type SetCurrentUserMessage = {
    type: 'setCurrentUser';
    userId?: UserId;
    googleIdToken?: string;
};
export declare const isSetCurrentUserMessage: (x: any) => x is SetCurrentUserMessage;
export declare type FileDownloadProgressMessage = {
    type: 'fileDownloadProgress';
    uri: string;
    loaded: number;
    total: number;
};
export declare const isFileDownloadProgressMessage: (x: any) => x is FileDownloadProgressMessage;
export declare type MessageToFrontendMessage = {
    type: 'messageToFrontend';
    message: any;
};
export declare const isMessageToFrontendMessage: (x: any) => x is MessageToFrontendMessage;
export declare type MessageToChild = FigurlResponseMessage | NewFeedMessagesMessage | TaskStatusUpdateMessage | SetCurrentUserMessage | FileDownloadProgressMessage | MessageToFrontendMessage;
export declare const isMessageToChild: (x: any) => x is MessageToChild;
