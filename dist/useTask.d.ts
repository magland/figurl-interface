import { Task } from "./initiateTask";
import { TaskType } from "./viewInterface/MessageToChildTypes";
declare const useTask: <ReturnType_1>(taskName: string | undefined, taskInput: {
    [key: string]: any;
}, taskType: TaskType) => {
    returnValue?: ReturnType_1 | undefined;
    task?: Task<ReturnType_1> | undefined;
};
export default useTask;
