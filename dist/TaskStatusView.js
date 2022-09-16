import { jsxs as _jsxs } from "react/jsx-runtime";
const TaskStatusView = ({ label, task }) => {
    if (!task)
        return (_jsxs("div", { children: ["Waiting for task: ", label] }));
    if ((task.status === 'waiting') || (task.status === 'started') || (task.status === 'finished')) {
        return _jsxs("div", { children: [label ? label + ': ' : '', task.status] });
    }
    else if (task.status === 'error') {
        return _jsxs("div", { children: ["Error running ", label, ": ", task.errorMessage] });
    }
    else {
        return _jsxs("div", { children: [label, ": Unexpected status: ", task.status] });
    }
};
export default TaskStatusView;
//# sourceMappingURL=TaskStatusView.js.map