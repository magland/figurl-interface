declare const useCalculationTask: <ReturnType_1>(taskName: string | undefined, taskInput: {
    [key: string]: any;
}) => {
    returnValue?: ReturnType_1 | undefined;
    task?: import("./initiateTask").Task<ReturnType_1> | undefined;
};
export default useCalculationTask;
