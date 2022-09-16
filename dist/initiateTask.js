var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Task_onStatusChangedCallbacks, _Task_taskJobId, _Task_status, _Task_errorMessage, _Task_result;
import sendRequestToParent from "./sendRequestToParent";
import { isInitiateTaskResponse } from "./viewInterface/FigurlRequestTypes";
const allTasks = {};
export class Task {
    constructor(a) {
        _Task_onStatusChangedCallbacks.set(this, []);
        _Task_taskJobId.set(this, void 0);
        _Task_status.set(this, void 0);
        _Task_errorMessage.set(this, undefined);
        _Task_result.set(this, undefined);
        __classPrivateFieldSet(this, _Task_taskJobId, a.taskJobId, "f");
        __classPrivateFieldSet(this, _Task_status, a.status, "f");
        __classPrivateFieldSet(this, _Task_errorMessage, a.errorMessage, "f");
        __classPrivateFieldSet(this, _Task_result, a.returnValue, "f");
    }
    onStatusChanged(cb) {
        __classPrivateFieldGet(this, _Task_onStatusChangedCallbacks, "f").push(cb);
    }
    get taskJobId() {
        return __classPrivateFieldGet(this, _Task_taskJobId, "f");
    }
    get status() {
        return __classPrivateFieldGet(this, _Task_status, "f");
    }
    get errorMessage() {
        return __classPrivateFieldGet(this, _Task_errorMessage, "f");
    }
    get result() {
        return __classPrivateFieldGet(this, _Task_result, "f");
    }
    _handleStatusChange(status, o) {
        if (status === __classPrivateFieldGet(this, _Task_status, "f"))
            return;
        __classPrivateFieldSet(this, _Task_status, status, "f");
        if (status === 'error') {
            __classPrivateFieldSet(this, _Task_errorMessage, o.errorMessage, "f");
        }
        if (status === 'finished') {
            __classPrivateFieldSet(this, _Task_result, o.returnValue, "f");
        }
        __classPrivateFieldGet(this, _Task_onStatusChangedCallbacks, "f").forEach(cb => { cb(); });
    }
}
_Task_onStatusChangedCallbacks = new WeakMap(), _Task_taskJobId = new WeakMap(), _Task_status = new WeakMap(), _Task_errorMessage = new WeakMap(), _Task_result = new WeakMap();
const initiateTask = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskName, taskInput, taskType, onStatusChanged } = args;
    if (!taskName)
        return undefined;
    const req = {
        type: 'initiateTask',
        taskName,
        taskInput,
        taskType
    };
    const resp = yield sendRequestToParent(req);
    if (!isInitiateTaskResponse(resp))
        throw Error('Unexpected response to initiateTask');
    const { taskJobId, status, errorMessage, returnValue } = resp;
    let t;
    if (taskJobId.toString() in allTasks) {
        t = allTasks[taskJobId.toString()];
    }
    else {
        t = new Task({ taskJobId, status, errorMessage, returnValue });
        allTasks[taskJobId.toString()] = t;
    }
    t.onStatusChanged(onStatusChanged);
    return t;
});
export const handleTaskStatusUpdate = (msg) => {
    const { taskJobId, status, errorMessage, returnValue } = msg;
    if (taskJobId.toString() in allTasks) {
        const task = allTasks[taskJobId.toString()];
        task._handleStatusChange(status, { errorMessage, returnValue });
    }
};
export const getAllTasks = () => {
    return allTasks;
};
export default initiateTask;
//# sourceMappingURL=initiateTask.js.map