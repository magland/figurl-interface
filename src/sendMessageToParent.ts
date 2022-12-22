import { MessageToParent } from "./viewInterface/MessageToParentTypes";

const urlSearchParams = new URLSearchParams(window.location.search)
const queryParams = Object.fromEntries(urlSearchParams.entries())

const sendMessageToParent = (x: MessageToParent) => {
    if (!queryParams.parentOrigin) {
        console.warn('No parent origin. Using *')
    }
    if (!window.parent) {
        console.warn('No parent. Posting to self')
        window.postMessage(x, '*')
        return
    }
    const parentOrigin = queryParams.parentOrigin || '*'
    ;(window.parent as any).postMessage(x, parentOrigin)
}

export default sendMessageToParent