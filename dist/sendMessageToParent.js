const urlSearchParams = new URLSearchParams(window.location.search);
const queryParams = Object.fromEntries(urlSearchParams.entries());
const sendMessageToParent = (x) => {
    if (!queryParams.parentOrigin) {
        console.warn('No parent origin. Posting message to self.');
        window.postMessage(x, '*');
        return;
    }
    ;
    window.top.postMessage(x, queryParams.parentOrigin);
};
export default sendMessageToParent;
//# sourceMappingURL=sendMessageToParent.js.map