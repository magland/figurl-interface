import { DurationMsec } from "../viewInterface/kacheryTypes";
export declare const sleepMsec: (msec: DurationMsec, continueFunction?: (() => boolean) | undefined) => Promise<void>;
export declare const sleepMsecNum: (msec: number, continueFunction?: (() => boolean) | undefined) => Promise<void>;
