declare const useFeedReducer: <State, Action>(a: {
    feedId?: string;
    feedUri?: string;
}, reducer: (s: State, a: Action) => State, initialState: State, opts: {
    actionField: boolean;
}) => {
    state: State;
    feed: import("./feedManager").Feed | undefined;
};
export default useFeedReducer;
