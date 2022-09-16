var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import initiateTask from "./initiateTask";
const runTaskAsync = (taskName, taskInput, taskType) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        let task = undefined;
        const check = () => {
            if (!task)
                return;
            if (task.status === 'finished') {
                const result = task.result;
                if (taskType === 'action') {
                    resolve(undefined); // sort of a type hack
                }
                else {
                    if (result)
                        resolve(result);
                    else {
                        if (taskType === 'calculation') {
                            reject(new Error('No result even though status is finished'));
                        }
                        else {
                            resolve(undefined);
                        }
                    }
                }
            }
            else if (task.status === 'error') {
                reject(task.errorMessage);
            }
        };
        initiateTask({
            taskName,
            taskInput,
            taskType,
            onStatusChanged: () => {
                check();
            }
        }).then(t => {
            if (!t) {
                reject('Unable to create get_timeseries_segment task');
                return;
            }
            task = t;
            check();
        });
    });
});
export default runTaskAsync;
//# sourceMappingURL=runTaskAsync.js.map