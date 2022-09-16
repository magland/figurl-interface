import { useMemo, useRef } from 'react';
import useFeed, { parseFeedUri } from './useFeed';
import { JSONStringifyDeterministic } from './viewInterface/kacheryTypes';
const useFeedReducer = (a, reducer, initialState, opts) => {
    let { feedId, feedUri } = a;
    if (feedUri) {
        // note: this is duplicated code with useFeed
        if (feedId) {
            throw Error('useFeed: Cannot specify both feedUri and feedId');
        }
        const { feedId: fid } = parseFeedUri(feedUri);
        feedId = fid;
    }
    const { messages: feedMessages, feed } = useFeed({ feedId });
    const actions = useMemo(() => {
        if (!feedMessages)
            return undefined;
        if (opts.actionField) {
            return feedMessages.map((m) => m.action).filter((a) => (a !== undefined));
        }
        else
            return feedMessages;
    }, [feedMessages, opts.actionField]);
    const lastComputedState = useRef(undefined);
    const initialStateString = JSONStringifyDeterministic(initialState);
    const state = useMemo(() => {
        var _a;
        let s;
        let ii = 0;
        if (lastComputedState.current !== undefined) {
            ii = lastComputedState.current.numActions;
            s = lastComputedState.current.state;
        }
        else {
            s = JSON.parse(initialStateString);
        }
        while (ii < ((_a = (actions || [])) === null || _a === void 0 ? void 0 : _a.length)) {
            s = reducer(s, (actions || [])[ii]);
            ii++;
        }
        lastComputedState.current = {
            numActions: (actions || []).length,
            state: s
        };
        return s;
    }, [actions, initialStateString, reducer]);
    return { state, feed };
};
export default useFeedReducer;
//# sourceMappingURL=useFeedReducer.js.map