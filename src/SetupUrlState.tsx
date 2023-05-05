import { FunctionComponent, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import sendRequestToParent from './sendRequestToParent';
import UrlStateContext, { getInitialUrlState, UrlState } from './UrlStateContext';
import { isSetUrlStateResponse, SetUrlStateRequest } from './viewInterface/FigurlRequestTypes';
import { JSONStringifyDeterministic } from './viewInterface/kacheryTypes';

type Props = {
}

class ReportUrlStateChangeManager {
    #lastReportedState = {} as UrlState
    #changeHandlers: ((state: UrlState) => void)[] = []
    constructor() {
    }
    reportUrlStateChange(state: UrlState) {
        if (JSONStringifyDeterministic(state) === JSONStringifyDeterministic(this.#lastReportedState)) return
        this.#lastReportedState = state
        this.#changeHandlers.forEach(handler => handler(state))
    }
    onUrlStateChange(handler: (state: UrlState) => void) {
        this.#changeHandlers.push(handler)
        const cancel = () => {
            this.#changeHandlers = this.#changeHandlers.filter(h => (h !== handler))
        }
        return cancel
    }
}
const reportUrlStateChangeManager = new ReportUrlStateChangeManager()

export const handleReportUrlStateChange = (state: UrlState) => {
    // this state is coming from the parent window (for example when the user clicks the back button)
    reportUrlStateChangeManager.reportUrlStateChange(state)
}

const SetupUrlState: FunctionComponent<PropsWithChildren<Props>> = (props) => {
    const [urlState, setUrlState] = useState<UrlState>(getInitialUrlState) // important that this component is defined AFTER initialization
    const handleSetUrlState = useCallback((state: {[key: string]: any}) => {
        ;(async () => {
            const request: SetUrlStateRequest = {
                type: 'setUrlState',
                state
            }
            const response = await sendRequestToParent(request)
            if (!isSetUrlStateResponse(response)) throw Error('Invalid response to setUrlState')
            setUrlState(state)
        })()
    }, [])
    const value = useMemo(() => ({urlState, setUrlState: handleSetUrlState}), [urlState, handleSetUrlState])

    useEffect(() => {
        const cancel = reportUrlStateChangeManager.onUrlStateChange((state: UrlState) => {
            // this update is coming from the parent window, so we don't want to send a request to the parent
            // we just want to update it locally
            setUrlState(state)
        })
        return cancel
    }, [])

    return (
        <UrlStateContext.Provider value={value}>
            {props.children}
        </UrlStateContext.Provider>
    )
}

export default SetupUrlState