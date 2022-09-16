import { TaskJobStatus, TaskStatusUpdateMessage, TaskType } from "./viewInterface/MessageToChildTypes";
export declare class Task<ReturnType> {
    #private;
    constructor(a: {
        taskJobId: string;
        status: TaskJobStatus;
        errorMessage?: string;
        returnValue?: ReturnType | undefined;
    });
    onStatusChanged(cb: () => void): void;
    get taskJobId(): string;
    get status(): TaskJobStatus;
    get errorMessage(): string | undefined;
    get result(): ReturnType | undefined;
    _handleStatusChange(status: TaskJobStatus, o: {
        errorMessage?: string;
        returnValue?: any;
    }): void;
}
declare const initiateTask: <ReturnType_1>(args: {
    taskName: string | undefined;
    taskInput: {
        [key: string]: any;
    };
    taskType: TaskType;
    onStatusChanged: () => void;
}) => Promise<Task<ReturnType_1> | undefined>;
export declare const handleTaskStatusUpdate: (msg: TaskStatusUpdateMessage) => void;
export declare const getAllTasks: () => {
    [key: string]: Task<any>;
};
export default initiateTask;
