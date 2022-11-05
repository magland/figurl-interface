import { isTaskJobStatus, isTaskType, TaskJobStatus, TaskType } from "./MessageToChildTypes"
import { validateObject, isArrayOf, isBoolean, isEqualTo, isJSONObject, isNull, isOneOf, isString, JSONObject, optional } from "@figurl/core-utils"

// getFigureData

export type GetFigureDataRequest = {
    type: 'getFigureData'
}

export const isGetFigureDataRequest = (x: any): x is GetFigureDataRequest => {
    return validateObject(x, {
        type: isEqualTo('getFigureData')
    })
}

export type GetFigureDataResponse = {
    type: 'getFigureData'
    figureData: any
}

export const isGetFigureDataResponse = (x: any): x is GetFigureDataResponse => {
    return validateObject(x, {
        type: isEqualTo('getFigureData'),
        figureData: () => (true)
    })
}

// getFileData

export type GetFileDataRequest = {
    type: 'getFileData'
    uri: string
    responseType?: string // 'text', 'json', 'json-deserialized': default is 'json-deserialized'
}

export const isGetFileDataRequest = (x: any): x is GetFileDataRequest => {
    return validateObject(x, {
        type: isEqualTo('getFileData'),
        uri: optional(isString),
        responseType: optional(isString)
    })
}

export type GetFileDataResponse = {
    type: 'getFileData'
    fileData?: any
    errorMessage?: string
}

export const isGetFileDataResponse = (x: any): x is GetFileDataResponse => {
    return validateObject(x, {
        type: isEqualTo('getFileData'),
        fileData: optional(() => (true)),
        errorMessage: optional(isString)
    })
}

// getFileDataUrl

export type GetFileDataUrlRequest = {
    type: 'getFileDataUrl'
    uri: string
}

export const isGetFileDataUrlRequest = (x: any): x is GetFileDataUrlRequest => {
    return validateObject(x, {
        type: isEqualTo('getFileDataUrl'),
        uri: optional(isString)
    })
}

export type GetFileDataUrlResponse = {
    type: 'getFileDataUrl'
    fileDataUrl?: string
    errorMessage?: string
}

export const isGetFileDataUrlResponse = (x: any): x is GetFileDataUrlResponse => {
    return validateObject(x, {
        type: isEqualTo('getFileDataUrl'),
        fileDataUrl: optional(isString),
        errorMessage: optional(isString)
    })
}

// getMutable

export type GetMutableRequest = {
    type: 'getMutable'
    key: string
}

export const isGetMutableRequest = (x: any): x is GetMutableRequest => {
    return validateObject(x, {
        type: isEqualTo('getMutable'),
        key: isString
    })
}

export type GetMutableResponse = {
    type: 'getMutable'
    value: string | null
}

export const isGetMutableResponse = (x: any): x is GetMutableResponse => {
    return validateObject(x, {
        type: isEqualTo('getMutable'),
        value: isOneOf([isNull, isString])
    })
}

// initiateTask

export type InitiateTaskRequest = {
    type: 'initiateTask'
    taskName: string
    taskInput: {[key: string]: any}
    taskType: TaskType
}

export const isInitiateTaskRequest = (x: any): x is InitiateTaskRequest => {
    return validateObject(x, {
        type: isEqualTo('initiateTask'),
        taskName: isString,
        taskInput: () => (true),
        taskType: isTaskType
    })
}

export type InitiateTaskResponse = {
    type: 'initiateTask'
    taskJobId: string
    status: TaskJobStatus
    errorMessage?: string // for status=error
    returnValue?: any // for status=finished
    returnValueUrl?: string // even before status=finished (optional for backward compatibility)
}

export const isInitiateTaskResponse = (x: any): x is InitiateTaskResponse => {
    return validateObject(x, {
        type: isEqualTo('initiateTask'),
        taskJobId: isString,
        status: isTaskJobStatus,
        errorMessage: optional(isString),
        returnValue: optional(() => (true)),
        returnValueUrl: optional(isString)
    })
}

// subscribeToFeed

export type SubscribeToFeedRequest = {
    type: 'subscribeToFeed'
    feedId: string
}

export const isSubscribeToFeedRequest = (x: any): x is SubscribeToFeedRequest => {
    return validateObject(x, {
        type: isEqualTo('subscribeToFeed'),
        feedId: isString
    })
}

export type SubscribeToFeedResponse = {
    type: 'subscribeToFeed'
    messages: JSONObject[]
}

export const isSubscribeToFeedResponse = (x: any): x is SubscribeToFeedResponse => {
    return validateObject(x, {
        type: isEqualTo('subscribeToFeed'),
        messages: isArrayOf(isJSONObject)
    })
}

// storeFile

export type StoreFileRequest = {
    type: 'storeFile'
    fileData: string
    jotId?: string
}

export const isStoreFileRequest = (x: any): x is StoreFileRequest => {
    return validateObject(x, {
        type: isEqualTo('storeFile'),
        fileData: isString,
        jotId: optional(isString)
    })
}

export type StoreFileResponse = {
    type: 'storeFile'
    uri?: string
    error?: string
}

export const isStoreFileResponse = (x: any): x is StoreFileResponse => {
    return validateObject(x, {
        type: isEqualTo('storeFile'),
        uri: optional(isString),
        error: optional(isString)
    })
}

// storeGithubFile

export type StoreGithubFileRequest = {
    type: 'storeGithubFile'
    fileData: string
    uri: string
}

export const isStoreGithubFileRequest = (x: any): x is StoreGithubFileRequest => {
    return validateObject(x, {
        type: isEqualTo('storeGithubFile'),
        fileData: isString,
        uri: isString
    })
}

export type StoreGithubFileResponse = {
    type: 'storeGithubFile'
    success: boolean
    error?: string
}

export const isStoreGithubFileResponse = (x: any): x is StoreGithubFileResponse => {
    return validateObject(x, {
        type: isEqualTo('storeGithubFile'),
        success: isBoolean,
        error: optional(isString)
    })
}

// setUrlState

export type SetUrlStateRequest = {
    type: 'setUrlState'
    state: {[key: string]: any}
}

export const isSetUrlStateRequest = (x: any): x is SetUrlStateRequest => {
    return validateObject(x, {
        type: isEqualTo('setUrlState'),
        state: isJSONObject
    })
}

export type SetUrlStateResponse = {
    type: 'setUrlState'
}

export const isSetUrlStateResponse = (x: any): x is SetUrlStateResponse => {
    return validateObject(x, {
        type: isEqualTo('setUrlState')
    })
}

//////////////////////////////////////////////////////////////

export type FigurlRequest =
    GetFigureDataRequest |
    GetFileDataRequest |
    GetFileDataUrlRequest |
    GetMutableRequest |
    InitiateTaskRequest |
    SubscribeToFeedRequest |
    StoreFileRequest |
    StoreGithubFileRequest |
    SetUrlStateRequest

export const isFigurlRequest = (x: any): x is FigurlRequest => {
    return isOneOf([
        isGetFigureDataRequest,
        isGetFileDataRequest,
        isGetFileDataUrlRequest,
        isGetMutableRequest,
        isInitiateTaskRequest,
        isSubscribeToFeedRequest,
        isStoreFileRequest,
        isStoreGithubFileRequest,
        isSetUrlStateRequest
    ])(x)
}

export type FigurlResponse =
    GetFigureDataResponse |
    GetFileDataResponse |
    GetFileDataUrlResponse |
    GetMutableResponse |
    InitiateTaskResponse |
    SubscribeToFeedResponse |
    StoreFileResponse |
    StoreGithubFileResponse |
    SetUrlStateResponse

export const isFigurlResponse = (x: any): x is FigurlResponse => {
    return isOneOf([
        isGetFigureDataResponse,
        isGetFileDataResponse,
        isGetFileDataUrlResponse,
        isGetMutableResponse,
        isInitiateTaskResponse,
        isSubscribeToFeedResponse,
        isStoreFileResponse,
        isStoreGithubFileResponse,
        isSetUrlStateResponse
    ])(x)
}