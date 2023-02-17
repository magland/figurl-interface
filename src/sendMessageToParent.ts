import { MessageToParent } from "./viewInterface/MessageToParentTypes";

const sendMessageToParent = (x: MessageToParent, {parentOrigin}: {parentOrigin: string}) => {
    const parentOrOpenerWindow = window.parent || window.opener
    if (!parentOrOpenerWindow) {
        console.warn('No parent or opener. Posting to self')
        window.postMessage(x, '*')
        return
    }
    parentOrOpenerWindow.postMessage(x, parentOrigin)
}

export default sendMessageToParent