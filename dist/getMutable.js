var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sendRequestToParent from "./sendRequestToParent";
import { isGetMutableResponse } from "./viewInterface/FigurlRequestTypes";
const getMutable = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const request = {
        type: 'getMutable',
        key
    };
    const response = yield sendRequestToParent(request);
    if (!isGetMutableResponse(response))
        throw Error('Invalid response to getMutable');
    return response.value;
});
export default getMutable;
//# sourceMappingURL=getMutable.js.map