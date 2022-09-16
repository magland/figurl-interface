import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import UrlStateContext, { initialUrlState } from './UrlStateContext';
const SetupUrlState = (props) => {
    const [urlState, setUrlState] = useState(initialUrlState);
    const value = useMemo(() => ({ urlState, setUrlState }), [urlState, setUrlState]);
    return (_jsx(UrlStateContext.Provider, Object.assign({ value: value }, { children: props.children })));
};
export default SetupUrlState;
//# sourceMappingURL=SetupUrlState.js.map