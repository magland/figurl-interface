import { useCallback, useEffect, useMemo, useState } from "react";
import initiateTask from "./initiateTask";
import { JSONStringifyDeterministic } from "./viewInterface/kacheryTypes";
const useTask = (taskName, taskInput, taskType) => {
    const [task, setTask] = useState(undefined);
    const [, setUpdateCode] = useState(0);
    const incrementUpdateCode = useCallback(() => { setUpdateCode(c => (c + 1)); }, []);
    const taskInputString = JSONStringifyDeterministic(taskInput);
    useEffect(() => {
        if (!taskName)
            return;
        let valid = true;
        const taskInput2 = JSON.parse(taskInputString);
        const onStatusChanged = () => {
            if (!valid)
                return;
            incrementUpdateCode();
        };
        initiateTask({
            taskName,
            taskInput: taskInput2,
            taskType,
            onStatusChanged
        }).then(t => {
            setTask(t);
        });
        return () => {
            valid = false;
        };
    }, [taskName, taskInputString, taskType, incrementUpdateCode]);
    const taskStatus = task ? task.status : undefined;
    const returnValue = useMemo(() => {
        if (!task)
            return undefined;
        return taskStatus === 'finished' ? task.result : undefined;
    }, [task, taskStatus]);
    return useMemo(() => ({
        returnValue,
        task
    }), [returnValue, task]);
};
export default useTask;
//# sourceMappingURL=useTask.js.map