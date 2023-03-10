import { useEffect, useMemo, useState } from "react"
import sendRequestToParent from "./sendRequestToParent"
import { GetFileDataRequest, GetFileDataUrlRequest, isGetFileDataResponse, isGetFileDataUrlResponse, isStoreFileResponse, isStoreGithubFileResponse, StoreFileRequest, StoreGithubFileRequest } from "./viewInterface/FigurlRequestTypes"

const getFileData = async (uri: string, onProgress: (a: {loaded: number, total: number}) => void, o: {startByte?: number, endByte?: number, responseType?: string}={}) => {
    const request: GetFileDataRequest = {
        type: 'getFileData',
        uri
    }
    if (o.responseType !== undefined) {
        request.responseType = o.responseType
    }
    if (o.startByte !== undefined) {
        request.startByte = o.startByte
        request.endByte = o.endByte
    }
    progressListeners[uri] = ({loaded, total}) => {
        onProgress({loaded, total})
    }
    const response = await sendRequestToParent(request)
    if (!isGetFileDataResponse(response)) throw Error('Invalid response to getFigureData')
    if (response.errorMessage) {
        throw Error(`Error getting file data for ${uri}: ${response.errorMessage}`)
    }
    return response.fileData
}

export const getFileDataUrl = async (uri: string): Promise<string> => {
    const request: GetFileDataUrlRequest = {
        type: 'getFileDataUrl',
        uri
    }
    const response = await sendRequestToParent(request)
    if (!isGetFileDataUrlResponse(response)) throw Error('Invalid response to getFigureUrlData')
    if ((!response.fileDataUrl) || (response.errorMessage)) {
        throw Error(`Error getting file data for ${uri}: ${response.errorMessage}`)
    }
    return response.fileDataUrl
}

export const storeFileData = async (fileData: string, o: {}={}): Promise<string> => {
    const request: StoreFileRequest = {
        type: 'storeFile',
        fileData
    }
    const response = await sendRequestToParent(request)
    if (!isStoreFileResponse(response)) throw Error('Invalid response to storeFile')
    if (response.error) {
        throw Error(`Error storing file data: ${response.error}`)
    }
    if (response.uri === undefined) {
        throw Error('Unexpected response.uri is undefined')
    }
    return response.uri
}

export const storeGithubFileData = async (o: {fileData: string, uri: string}): Promise<void> => {
    const request: StoreGithubFileRequest = {
        type: 'storeGithubFile',
        fileData: o.fileData,
        uri: o.uri
    }
    const response = await sendRequestToParent(request)
    if (!isStoreGithubFileResponse(response)) throw Error('Invalid response to storeFile')
    if (response.error) {
        throw Error(`Error storing file data: ${response.error}`)
    }
}

const progressListeners: {[uri: string]: (a: {loaded: number, total: number}) => void} = {}

export const handleFileDownloadProgress: (a: {uri: string, loaded: number, total: number}) => void = ({uri, loaded, total}) => {
    const x = progressListeners[uri]
    if (x) {
        x({loaded, total})
    }
}

export type Progress = {
    onProgress: (callback: (a: {loaded: number, total: number}) => void) => void
}

export const useFileData = (uri: string, o: {startByte?: number, endByte?: number}={}) => {
    const [fileData, setFileData] = useState<any | undefined>(undefined)
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const {progress, reportProgress} = useMemo(() => {
        let _callback: (a: {loaded: number, total: number}) => void = ({loaded, total}) => {}
        const reportProgress = (a: {loaded: number, total: number}) => {
            _callback(a)
        }
        const progress: Progress = {
            onProgress: (callback: (a: {loaded: number, total: number}) => void) => {
                _callback = callback
            }
        }
        return {progress, reportProgress}
    }, [])
    useEffect(() => {
        setErrorMessage(undefined)
        setFileData(undefined)
        getFileData(uri, reportProgress, {startByte: o.startByte, endByte: o.endByte}).then(data => {
            setFileData(data)
        }).catch(err => {
            setErrorMessage(err.message)
        })
    }, [uri, reportProgress, o.startByte, o.endByte])
    return {fileData, progress, errorMessage}
}

export default getFileData