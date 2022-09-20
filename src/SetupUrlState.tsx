import { FunctionComponent, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import sendRequestToParent from './sendRequestToParent';
import UrlStateContext, { initialUrlState, UrlState } from './UrlStateContext';
import { isSetUrlStateResponse, SetUrlStateRequest } from './viewInterface/FigurlRequestTypes';

type Props = {
}

const SetupUrlState: FunctionComponent<PropsWithChildren<Props>> = (props) => {
    const [urlState, setUrlState] = useState<UrlState>(initialUrlState)
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
    return (
        <UrlStateContext.Provider value={value}>
            {props.children}
        </UrlStateContext.Provider>
    )
}

export default SetupUrlState