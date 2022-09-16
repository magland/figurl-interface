import { FigurlRequest } from "./viewInterface/FigurlRequestTypes";
import { FigurlResponseMessage } from "./viewInterface/MessageToChildTypes";
export declare const handleFigurlResponse: (msg: FigurlResponseMessage) => void;
export declare const figureId: string;
declare const sendRequestToParent: (request: FigurlRequest) => Promise<unknown>;
export default sendRequestToParent;
