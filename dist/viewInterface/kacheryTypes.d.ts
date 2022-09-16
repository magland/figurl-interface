/// <reference types="node" />
import { JSONObject, JSONValue } from '@figurl/core-utils';
export declare const objectToMap: <KeyType_1 extends String, ValueType>(obj: {
    [key: string]: any;
}) => Map<KeyType_1, ValueType>;
export declare const mapToObject: <KeyType_1 extends String, ValueType>(m: Map<KeyType_1, ValueType>) => {
    [key: string]: any;
};
export interface ProtocolVersion extends String {
    __protocolVersion__: never;
}
export interface DaemonVersion extends String {
    __daemonVersion__: never;
}
export declare const isDaemonVersion: (x: any) => x is DaemonVersion;
export interface Port extends Number {
    __port__: never;
}
export declare const isPort: (x: any) => x is Port;
export declare const portToNumber: (x: Port) => number;
export declare const toPort: (x: number) => Port;
export interface HostName extends String {
    __hostName__: never;
}
export declare const isHostName: (x: any) => x is HostName;
export declare const hostName: (x: string) => HostName;
export interface UrlString extends String {
    __urlString__: never;
}
export declare const isUrlString: (x: any) => x is UrlString;
export declare const urlString: (x: string) => UrlString;
export interface NodeLabel extends String {
    __nodeLabel__: never;
}
export declare const isNodeLabel: (x: any) => x is NodeLabel;
export declare const nodeLabel: (x: string) => NodeLabel;
export interface Address {
    hostName?: HostName;
    port?: Port;
    url?: UrlString;
}
export declare const isAddress: (x: any) => x is Address;
export interface Timestamp extends Number {
    __timestamp__: never;
}
export declare const isTimestamp: (x: any) => x is Timestamp;
export declare const nowTimestamp: () => Timestamp;
export declare const zeroTimestamp: () => Timestamp;
export declare const elapsedSince: (timestamp: Timestamp) => number;
export interface PublicKey extends String {
    __publicKey__: never;
}
export declare const isPublicKey: (x: any) => x is PublicKey;
export interface PrivateKey extends String {
    __privateKey__: never;
}
export declare const isPrivateKey: (x: any) => x is PrivateKey;
export interface KeyPair {
    publicKey: PublicKey;
    privateKey: PrivateKey;
}
export declare const isKeyPair: (x: any) => x is KeyPair;
export declare const isHexadecimal: (x: string, length?: number) => boolean;
export interface PublicKeyHex extends String {
    __publicKeyHex__: never;
}
export declare const isPublicKeyHex: (x: any) => x is PublicKeyHex;
export interface PrivateKeyHex extends String {
    __privateKeyHex__: never;
}
export declare const isPrivateKeyHex: (x: any) => x is PrivateKeyHex;
export interface Sha1Hash extends String {
    __sha1Hash__: never;
}
export declare const isSha1Hash: (x: any) => x is Sha1Hash;
export interface TaskId extends String {
    __taskId__: never;
}
export declare const isTaskId: (x: any) => x is TaskId;
export declare const toTaskId: (x: String) => TaskId;
export declare type TaskStatus = 'waiting' | 'pending' | 'queued' | 'running' | 'finished' | 'error';
export declare const isTaskStatus: (x: any) => x is TaskStatus;
export declare type TaskFunctionType = 'pure-calculation' | 'query' | 'action';
export declare const isTaskFunctionType: (x: any) => boolean;
export interface Signature extends String {
    __signature__: never;
}
export declare const isSignature: (x: any) => x is Signature;
export interface NodeId extends String {
    __nodeId__: never;
}
export declare const isNodeId: (x: any) => x is NodeId;
export interface FeedId extends String {
    __feedId__: never;
}
export declare const isFeedId: (x: any) => x is FeedId;
export interface SubfeedHash extends String {
    __subfeedHash__: never;
}
export declare const isSubfeedHash: (x: any) => x is SubfeedHash;
export declare const subfeedHash: (x: Sha1Hash) => SubfeedHash;
export interface ChannelName extends String {
    __channelName__: never;
}
export declare const isChannelName: (x: any) => x is ChannelName;
export declare const channelName: (x: string) => ChannelName;
export interface TaskFunctionId extends String {
    __taskFunctionId__: never;
}
export declare const isTaskFunctionId: (x: any) => x is TaskFunctionId;
export interface PubsubChannelName extends String {
    __pubsubChannelName__: never;
}
export declare const isPubsubChannelName: (x: any) => x is PubsubChannelName;
export declare const pubsubChannelName: (x: string) => PubsubChannelName;
export interface UserId extends String {
    __userId__: never;
}
export declare const isUserId: (x: any) => x is UserId;
export declare const userId: (x: string) => UserId;
export interface TaskKwargs {
    __taskFunctionKwargs__: never;
}
export declare const isTaskKwargs: (x: any) => x is TaskKwargs;
export declare const taskKwargs: (x: any) => TaskKwargs;
export interface ErrorMessage extends String {
    __errorMessage__: never;
}
export declare const isErrorMessage: (x: any) => x is ErrorMessage;
export declare const errorMessage: (x: string) => ErrorMessage;
export interface FileKey {
    sha1: Sha1Hash;
    manifestSha1?: Sha1Hash;
    chunkOf?: {
        fileKey: FileKey;
        startByte: ByteCount;
        endByte: ByteCount;
    };
}
export declare const isFileKey: (x: any) => x is FileKey;
export interface FileKeyHash extends String {
    __fileKeyHash__: never;
}
export declare const isFileKeyHash: (x: any) => x is FileKeyHash;
export declare const fileKeyHash: (fileKey: FileKey) => FileKeyHash;
export interface FindLiveFeedResult {
    nodeId: NodeId;
}
export declare const isFindLiveFeedResult: (x: any) => x is FindLiveFeedResult;
export interface FindFileResult {
    nodeId: NodeId;
    fileKey: FileKey;
    fileSize: ByteCount;
}
export declare const isFindFileResult: (x: any) => x is FindFileResult;
export interface RequestId extends String {
    __requestId__: never;
}
export declare const isRequestId: (x: any) => x is RequestId;
export interface ChannelLabel extends String {
    __channelLabel__: never;
}
export declare const isChannelLabel: (x: any) => x is ChannelLabel;
export declare const channelLabel: (x: string) => string & ChannelLabel;
export interface FeedName extends String {
    __feedName__: never;
}
export declare const isFeedName: (x: any) => x is FeedName;
export declare const feedName: (x: string) => FeedName;
export interface FeedSubfeedId extends String {
    __feedSubfeedId__: never;
}
export declare const feedSubfeedId: (feedId: FeedId, subfeedHash: SubfeedHash, channelName: ChannelName | '*local*') => FeedSubfeedId;
export declare const isFeedSubfeedId: (x: any) => x is FeedSubfeedId;
export interface SubfeedMessage extends JSONObject {
    __subfeedMessage__: never;
}
export declare const isSubfeedMessage: (x: any) => x is SubfeedMessage;
export declare type SubfeedMessageMetaData = Object;
export declare const isSubfeedMessageMetaData: (x: any) => x is Object;
export interface SignedSubfeedMessage {
    body: {
        previousSignature?: Signature;
        messageNumber: number;
        message: SubfeedMessage;
        timestamp: Timestamp;
        metaData?: SubfeedMessageMetaData;
    };
    signature: Signature;
}
export declare const isSignedSubfeedMessage: (x: any) => x is SignedSubfeedMessage;
export interface SubmittedSubfeedMessage extends JSONObject {
    __submittedSubfeedMessage__: never;
}
export declare const isSubmittedSubfeedMessage: (x: any) => x is SubmittedSubfeedMessage;
export declare const submittedSubfeedMessageToSubfeedMessage: (x: SubmittedSubfeedMessage) => SubfeedMessage;
export interface SubfeedWatchName extends String {
    __subfeedWatchName__: never;
}
export declare const isSubfeedWatchName: (x: any) => boolean;
export interface SubfeedPosition extends Number {
    __subfeedPosition__: never;
}
export declare const isSubfeedPosition: (x: any) => boolean;
export declare const subfeedPositionToNumber: (x: SubfeedPosition) => number;
export declare const subfeedPosition: (x: number) => SubfeedPosition;
export interface MessageCount extends Number {
    __messageCount__: never;
}
export declare const isMessageCount: (x: any) => boolean;
export declare const messageCountToNumber: (x: MessageCount) => number;
export declare const messageCount: (x: number) => MessageCount;
export interface SubfeedWatch {
    feedId: FeedId;
    subfeedHash: SubfeedHash;
    position: SubfeedPosition;
    channelName: ChannelName;
}
export declare const isSubfeedWatch: (x: any) => x is SubfeedWatch;
export declare type SubfeedWatches = {
    [key: string]: SubfeedWatch;
};
export declare const isSubfeedWatches: (x: any) => x is SubfeedWatches;
export declare type SubfeedWatchesRAM = Map<SubfeedWatchName, SubfeedWatch>;
export declare const toSubfeedWatchesRAM: (x: SubfeedWatches) => Map<SubfeedWatchName, SubfeedWatch>;
export declare const toSubfeedWatches: (x: SubfeedWatchesRAM) => {
    [key: string]: any;
};
export interface UrlPath extends String {
    __urlPath__: never;
}
export declare const urlPath: (x: string) => UrlPath;
export declare const isBuffer: (x: any) => x is Buffer;
export interface DurationMsec extends Number {
    __durationMsec__: never;
}
export declare const isDurationMsec: (x: any) => x is DurationMsec;
export declare const durationMsecToNumber: (x: DurationMsec) => number;
export declare const scaledDurationMsec: (n: number) => DurationMsec;
export declare const unscaledDurationMsec: (n: number) => DurationMsec;
export declare const addDurations: (a: DurationMsec, b: DurationMsec) => DurationMsec;
export declare const minDuration: (a: DurationMsec, b: DurationMsec) => DurationMsec;
export declare const maxDuration: (a: DurationMsec, b: DurationMsec) => DurationMsec;
export declare const scaleDurationBy: (a: DurationMsec, factor: number) => DurationMsec;
export declare const durationGreaterThan: (a: DurationMsec, b: DurationMsec) => boolean;
export declare const exampleDurationMsec: DurationMsec;
export interface ByteCount extends Number {
    __byteCount__: never;
}
export declare const isByteCount: (x: any) => x is ByteCount;
export declare const byteCountToNumber: (x: ByteCount) => number;
export declare const byteCount: (n: number) => ByteCount;
export declare const addByteCount: (n1: ByteCount, n2: ByteCount) => ByteCount;
export declare const exampleByteCount: ByteCount;
export interface LocalFilePath extends String {
    __localFilePath__: never;
}
export declare const localFilePath: (p: string) => LocalFilePath;
export interface FileManifestChunk {
    start: ByteCount;
    end: ByteCount;
    sha1: Sha1Hash;
}
export declare const isFileManifestChunk: (x: any) => x is FileManifestChunk;
export interface FileManifest {
    size: ByteCount;
    sha1: Sha1Hash;
    chunks: FileManifestChunk[];
}
export declare const isFileManifest: (x: any) => x is FileManifest;
export interface ChannelConfigUrl extends String {
    __channelConfigUrl__: never;
}
export declare const isChannelConfigUrl: (x: any) => x is ChannelConfigUrl;
export declare const channelConfigUrl: (x: string) => ChannelConfigUrl;
export declare const pathifyHash: (x: Sha1Hash | FeedId | SubfeedHash) => string;
export declare const sha1OfObject: (x: JSONObject) => Sha1Hash;
export declare const sha1OfString: (x: string) => Sha1Hash;
export declare const JSONStringifyDeterministic: (obj: any, space?: string | number | undefined) => string;
export declare const publicKeyHexToFeedId: (publicKeyHex: PublicKeyHex) => FeedId;
export declare const nodeIdToPublicKeyHex: (nodeId: NodeId) => PublicKeyHex;
export declare const feedIdToPublicKeyHex: (feedId: FeedId) => PublicKeyHex;
export declare const publicKeyHexToNodeId: (x: PublicKeyHex) => NodeId;
export declare type MutableRecord = {
    key: JSONValue;
    value: JSONValue;
};
export declare type UserConfig = {
    admin?: boolean;
};
export declare const isUserConfig: (x: any) => x is UserConfig;
