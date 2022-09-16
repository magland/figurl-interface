var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useCallback, useContext, useEffect } from "react";
import sendRequestToParent from "./sendRequestToParent";
import { isSetUrlStateResponse } from "./viewInterface/FigurlRequestTypes";
const urlSearchParams = new URLSearchParams(window.location.search);
const queryParams = Object.fromEntries(urlSearchParams.entries());
export const initialUrlState = JSON.parse(queryParams.s || '{}');
const UrlStateContext = React.createContext({});
const dummySetUrlState = (s) => { };
export const useUrlState = () => {
    const c = useContext(UrlStateContext);
    const { urlState, setUrlState } = c;
    const updateUrlState = useCallback((s) => {
        const newUrlState = Object.assign({}, (urlState || initialUrlState));
        let somethingChanged = false;
        for (let k in s) {
            const newVal = s[k];
            const oldVal = (urlState || (initialUrlState))[k];
            if (newVal !== oldVal) {
                newUrlState[k] = newVal;
                somethingChanged = true;
            }
        }
        if (somethingChanged) {
            setUrlState && setUrlState(newUrlState);
        }
    }, [urlState, setUrlState]);
    useEffect(() => {
        ;
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const request = {
                type: 'setUrlState',
                state: urlState || {}
            };
            const response = yield sendRequestToParent(request);
            if (!isSetUrlStateResponse(response))
                throw Error('Invalid response to setUrlState');
        }))();
    }, [urlState]);
    return {
        urlState: urlState || initialUrlState,
        setUrlState: setUrlState || dummySetUrlState,
        updateUrlState,
        initialUrlState
    };
};
export default UrlStateContext;
//# sourceMappingURL=UrlStateContext.js.map