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
var _UserInfoManager_listeners, _UserInfoManager_userInfo;
import { useEffect, useState } from "react";
import { randomAlphaString } from "@figurl/core-utils";
class UserInfoManager {
    constructor() {
        _UserInfoManager_listeners.set(this, {});
        _UserInfoManager_userInfo.set(this, {});
    }
    setUserInfo(info) {
        __classPrivateFieldSet(this, _UserInfoManager_userInfo, Object.assign({}, info), "f");
        for (let id in __classPrivateFieldGet(this, _UserInfoManager_listeners, "f")) {
            __classPrivateFieldGet(this, _UserInfoManager_listeners, "f")[id]();
        }
    }
    get userInfo() {
        return __classPrivateFieldGet(this, _UserInfoManager_userInfo, "f");
    }
    onChange(cb) {
        const listenerId = randomAlphaString(10);
        __classPrivateFieldGet(this, _UserInfoManager_listeners, "f")[listenerId] = cb;
        const cancel = () => {
            if (listenerId in __classPrivateFieldGet(this, _UserInfoManager_listeners, "f")) {
                delete __classPrivateFieldGet(this, _UserInfoManager_listeners, "f")[listenerId];
            }
        };
        return cancel;
    }
}
_UserInfoManager_listeners = new WeakMap(), _UserInfoManager_userInfo = new WeakMap();
const userInfoManager = new UserInfoManager();
export const handleSetCurrentUser = (userInfo) => {
    userInfoManager.setUserInfo(userInfo);
};
const useSignedIn = () => {
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        setUserInfo(userInfoManager.userInfo);
        const cancel = userInfoManager.onChange(() => {
            setUserInfo(userInfoManager.userInfo);
        });
        return cancel;
    }, []);
    return userInfo;
};
export default useSignedIn;
//# sourceMappingURL=useSignedIn.js.map