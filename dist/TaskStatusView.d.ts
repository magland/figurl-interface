import { FunctionComponent } from "react";
import { Task } from './initiateTask';
declare type Props = {
    label: string;
    task: Task<any> | undefined;
};
declare const TaskStatusView: FunctionComponent<Props>;
export default TaskStatusView;
