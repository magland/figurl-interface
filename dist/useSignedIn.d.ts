import { UserId } from "./viewInterface/kacheryTypes";
declare type UserInfo = {
    userId?: UserId;
    googleIdToken?: string;
};
export declare const handleSetCurrentUser: (userInfo: UserInfo) => void;
declare const useSignedIn: () => UserInfo;
export default useSignedIn;
