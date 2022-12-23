import { MessageToParent } from "./viewInterface/MessageToParentTypes";

const sendMessageToParent = (x: MessageToParent, {parentOrigin}: {parentOrigin: string}) => {
    if (!window.parent) {
        console.warn('No parent. Posting to self')
        window.postMessage(x, '*')
        return
    }
    ;(window.parent as any).postMessage(x, parentOrigin)
}

export default sendMessageToParent