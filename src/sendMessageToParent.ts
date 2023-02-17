import { MessageToParent } from "./viewInterface/MessageToParentTypes";

const urlSearchParams = new URLSearchParams(window.location.search)
const queryParams = Object.fromEntries(urlSearchParams.entries())

const sendMessageToParent = (x: MessageToParent, {parentOrigin}: {parentOrigin: string}) => {
    const parentOrOpenerWindow = queryParams.useOpener === '1' ? window.opener : window.parent
    // if no parent, this will post to itself
    parentOrOpenerWindow.postMessage(x, parentOrigin)
}

export default sendMessageToParent