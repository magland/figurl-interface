import { TaskType } from "./viewInterface/MessageToChildTypes";
declare const runTaskAsync: <ReturnType_1>(taskName: string, taskInput: {
    [key: string]: any;
}, taskType: TaskType) => Promise<ReturnType_1>;
export default runTaskAsync;
