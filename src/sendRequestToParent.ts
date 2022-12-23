import { FigurlRequest, FigurlResponse } from "./viewInterface/FigurlRequestTypes";
import { FigurlResponseMessage } from "./viewInterface/MessageToChildTypes";
import { FigurlRequestMessage } from "./viewInterface/MessageToParentTypes";
import sendMessageToParent from "./sendMessageToParent";
import { randomAlphaString } from "@figurl/core-utils";
import { resolve } from "path";

const urlSearchParams = new URLSearchParams(window.location.search)
const queryParams = Object.fromEntries(urlSearchParams.entries())

const pendingRequests: {[key: string]: {
    onResponse: (response: FigurlResponse) => void
    onError: (err: any) => void
}} = {}

export const handleFigurlResponse = (msg: FigurlResponseMessage) => {
    const requestId = msg.requestId
    const response = msg.response
    if (requestId in pendingRequests) {
        pendingRequests[requestId].onResponse(response)
        delete pendingRequests[requestId]
    }
}

let initalizationData: {parentOrigin: string, figureId: string, s: string} | undefined = undefined
const _initializationCallbacks: (() => void)[] = []
window.addEventListener('message', e => {
    if (initalizationData) return
    const msg = e.data
    if (msg.type === 'initializeFigure') {
        initalizationData = {parentOrigin: msg.parentOrigin, figureId: msg.figureId, s: msg.s}
        _initializationCallbacks.forEach(cb => {cb()})
    }
})

const onInitialized = (callback: () => void) => {
    if (initalizationData) {
        callback()
    }
    else {
        _initializationCallbacks.push(callback)
    }
}

export const waitForInitialization = async (): Promise<{parentOrigin: string, figureId: string, s: string}> => {
    return new Promise<{parentOrigin: string, figureId: string, s: string}>((resolve, reject) => {
        const figureId = queryParams.figureId
        const parentOrigin = queryParams.parentOrigin
        const s = queryParams.s || ''
        if ((figureId !== undefined) && (parentOrigin !== undefined)) {
            resolve({parentOrigin, figureId, s})
        }
        else {
            onInitialized(() => {
                if (!initalizationData) throw Error('unexpected')
                resolve({
                    parentOrigin: initalizationData.parentOrigin,
                    figureId: initalizationData.figureId,
                    s: initalizationData.s
                })
            })
        }
    })
}

const sendRequestToParent = async (request: FigurlRequest) => {
    const {figureId, parentOrigin} = await waitForInitialization()
    return new Promise((resolve, reject) => {
        const requestId = randomAlphaString(10)
        pendingRequests[requestId] = {
            onResponse: (response: FigurlResponse) => {
                resolve(response)
            },
            onError: (err: any) => {
                reject(err)
            }
        }
        const msg: FigurlRequestMessage = {
            type: 'figurlRequest',
            figureId,
            requestId,
            request
        }
        sendMessageToParent(msg, {parentOrigin})
    })
}

export default sendRequestToParent