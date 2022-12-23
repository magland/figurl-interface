import React, { useCallback, useContext, useEffect } from "react"
import sendRequestToParent, { waitForInitialization } from "./sendRequestToParent"
import { isSetUrlStateResponse, SetUrlStateRequest } from "./viewInterface/FigurlRequestTypes"

export type UrlState = {[key: string]: any}

const urlSearchParams = new URLSearchParams(window.location.search)
const queryParams = Object.fromEntries(urlSearchParams.entries())
const urlStateFromQueryString = JSON.parse(queryParams.s || '{}') // important that this is computed only once (for purpose of reference)
let urlStateFromInitialization: any | undefined = undefined
waitForInitialization().then(initializationData => {
    urlStateFromInitialization = JSON.parse(initializationData.s || '{}') // important to only do this once
})
export const getInitialUrlState = () => {
    return urlStateFromInitialization ? urlStateFromInitialization : urlStateFromQueryString
}

const UrlStateContext = React.createContext<{
    urlState?: UrlState,
    setUrlState?: (s: UrlState) => void
}>({})

const dummySetUrlState = (s: UrlState) => {}

export const useUrlState = () => {
    const c = useContext(UrlStateContext)
    const {urlState, setUrlState} = c

    const updateUrlState = useCallback((s: {[key: string]: any}) => {
        const newUrlState = {...(urlState || getInitialUrlState())}
        let somethingChanged = false
        for (let k in s) {
            const newVal = s[k]
            const oldVal = (urlState || (getInitialUrlState()))[k]
            if (newVal !== oldVal) {
                newUrlState[k] = newVal
                somethingChanged = true
            }
        }
        if (somethingChanged) {
            setUrlState && setUrlState(newUrlState)
        }
    }, [urlState, setUrlState])

    return {
        urlState: urlState || getInitialUrlState(),
        setUrlState: setUrlState || dummySetUrlState,
        updateUrlState,
        initialUrlState: getInitialUrlState()
    }
}

export default UrlStateContext