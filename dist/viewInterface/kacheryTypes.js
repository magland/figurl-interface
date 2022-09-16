import crypto from 'crypto';
import { validateObject, isArrayOf, isBoolean, isJSONObject, isNumber, isObject, isObjectOf, isString, optional } from '@figurl/core-utils';
// This is a hack because there is no npm:process-browserify for package.json
const process = window.process || {
    cwd: () => ('')
};
const assert = (x) => {
    if (!x)
        throw Error('Assertion error');
};
// objectToMap and mapToObject
export const objectToMap = (obj) => {
    return new Map(Object.keys(obj).map(k => {
        return [k, obj[k]];
    }));
};
export const mapToObject = (m) => {
    const ret = {};
    m.forEach((v, k) => {
        ret[k.toString()] = v;
    });
    return ret;
};
export const isDaemonVersion = (x) => {
    if (!isString(x))
        return false;
    return (/^[0-9a-zA-z. -]{4,40}?$/.test(x));
};
export const isPort = (x) => {
    if (!isNumber(x))
        return false;
    return x > 0 && x < 65536; // port numbers must be in 16-bit positive range
};
export const portToNumber = (x) => {
    return x;
};
export const toPort = (x) => {
    if (!isPort(x))
        throw Error(`Not a valid port: ${x}`);
    return x;
};
export const isHostName = (x) => {
    // can we be even more precise here? e.g. restrict number of elements?
    if (!isString(x))
        return false;
    let result = true;
    x.split(".").forEach((element) => {
        if (element.length === 0)
            result = false;
        if (!/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(element))
            result = false;
    });
    // we cannot short-circuit by returning false from the anonymous function in the forEach loop.
    // Doing so returns false *from that function*, then ignores the result (since nothing is checking
    // the result of the anonymous function) and moves on to check the next chunk.
    return result;
};
export const hostName = (x) => {
    if (!isHostName(x))
        throw Error(`Not a valid host name: ${x}`);
    return x;
};
export const isUrlString = (x) => {
    if (!isString(x))
        return false;
    if ((x.startsWith('http://') || (x.startsWith('https://')))) {
        if (x.length > 10000)
            return false;
        return true;
    }
    else {
        return false;
    }
};
export const urlString = (x) => {
    if (!isUrlString(x))
        throw Error(`Not a valid url string: ${x}`);
    return x;
};
export const isNodeLabel = (x) => {
    if (!isString(x))
        return false;
    if (x.length > 20)
        return false;
    let result = true;
    x.split(".").forEach((element) => {
        if (element.length === 0)
            result = false;
        if (!/^[a-zA-Z0-9@]([a-zA-Z0-9@-]*[a-zA-Z0-9@])?$/.test(element))
            result = false;
    });
    return result;
};
export const nodeLabel = (x) => {
    if (!isNodeLabel(x))
        throw Error(`Not a valid node label: ${x}`);
    return x;
};
export const isAddress = (x) => {
    if (!validateObject(x, {
        hostName: optional(isHostName),
        port: optional(isPort),
        url: optional(isUrlString)
    })) {
        return false;
    }
    if ((x.hostName) && (x.port)) {
        return x.url ? false : true;
    }
    else if (x.url) {
        return ((x.hostName) || (x.port)) ? false : true;
    }
    else {
        return false;
    }
};
export const isTimestamp = (x) => {
    if (!isNumber(x))
        return false;
    if (x < 0)
        return false; // For our purposes, timestamps should never be negative
    if (!Number.isInteger(x))
        return false; // our timestamps should be whole numbers
    return true;
};
export const nowTimestamp = () => {
    const ret = Number(new Date()) - 0;
    return ret;
};
export const zeroTimestamp = () => {
    return 0;
};
export const elapsedSince = (timestamp) => {
    return nowTimestamp() - timestamp;
};
export const isPublicKey = (x) => {
    if (!isString(x))
        return false;
    return checkKeyblockHeader(x, 'PUBLIC');
};
export const isPrivateKey = (x) => {
    if (!isString(x))
        return false;
    return checkKeyblockHeader(x, 'PRIVATE');
};
const checkKeyblockHeader = (key, type) => {
    // note we need to double-escape the backslashes here.
    const pattern = new RegExp(`-----BEGIN ${type} KEY-----[\\s\\S]*-----END ${type} KEY-----\n*$`);
    return (pattern.test(key));
};
export const isKeyPair = (x) => {
    return validateObject(x, {
        publicKey: isPublicKey,
        privateKey: isPrivateKey
    });
};
export const isHexadecimal = (x, length) => {
    const basePattern = '[0-9a-fA-F]';
    let pattern = `^${basePattern}*$`;
    if (length !== undefined) {
        assert(Number.isInteger(length));
        assert(length > 0);
        pattern = `^${basePattern}{${length}}$`;
    }
    const regex = new RegExp(pattern);
    return (regex.test(x));
};
export const isPublicKeyHex = (x) => {
    if (!isString(x))
        return false;
    return isHexadecimal(x, 64);
};
export const isPrivateKeyHex = (x) => {
    if (!isString(x))
        return false;
    return isHexadecimal(x, 64);
};
export const isSha1Hash = (x) => {
    if (!isString(x))
        return false;
    return isHexadecimal(x, 40); // Sha1 should be 40 hex characters
};
export const isTaskId = (x) => {
    if (!isString(x))
        return false;
    if (x.length > 40)
        return false;
    return true;
};
export const toTaskId = (x) => {
    if (!isTaskId(x)) {
        throw Error(`Not a valid task ID: ${x}`);
    }
    return x;
};
export const isTaskStatus = (x) => {
    if (!isString(x))
        return false;
    return ['waiting', 'pending', 'queued', 'running', 'finished', 'error'].includes(x);
};
export const isTaskFunctionType = (x) => {
    if (!isString(x))
        return false;
    return ['pure-calculation', 'query', 'action'].includes(x);
};
export const isSignature = (x) => {
    if (!isString(x))
        return false;
    return isHexadecimal(x, 128);
};
export const isNodeId = (x) => {
    if (!isString(x))
        return false;
    return isHexadecimal(x, 64);
};
export const isFeedId = (x) => {
    if (!isString(x))
        return false;
    return isHexadecimal(x, 64);
};
export const isSubfeedHash = (x) => {
    if (!isString(x))
        return false;
    return (/^[0-9a-fA-F]{40}?$/.test(x));
};
export const subfeedHash = (x) => {
    if (isSubfeedHash(x))
        return x;
    else
        throw Error(`Invalid subfeed hash: ${x}`);
};
export const isChannelName = (x) => {
    if (!isString(x))
        return false;
    if (x.length > 40)
        return false;
    if (x.length < 3)
        return false;
    let result = true;
    x.split(".").forEach((element) => {
        if (element.length === 0)
            result = false;
        if (!/^[a-zA-Z0-9_-]([a-zA-Z0-9_-]*[a-zA-Z0-9_-])?$/.test(element))
            result = false;
    });
    return result;
};
export const channelName = (x) => {
    if (!isChannelName(x))
        throw Error(`Invalid channel name: ${x}`);
    return x;
};
export const isTaskFunctionId = (x) => {
    if (!isString(x))
        return false;
    if (x.length > 400)
        return false;
    let result = true;
    x.split(".").forEach((element) => {
        if (element.length === 0)
            result = false;
        if (!/^[a-zA-Z0-9@_-]([a-zA-Z0-9@_-]*[a-zA-Z0-9@_-])?$/.test(element))
            result = false;
    });
    return result;
};
export const isPubsubChannelName = (x) => {
    if (!isString(x))
        return false;
    if (x.length > 40)
        return false;
    return true;
};
export const pubsubChannelName = (x) => {
    if (!isPubsubChannelName(x))
        throw Error(`Invalid pubsub channel name: ${x}`);
    return x;
};
export const isUserId = (x) => {
    if (!isString(x))
        return false;
    if (x.length > 80)
        return false;
    return true;
};
export const userId = (x) => {
    if (!isUserId(x))
        throw Error(`Invalid user ID: ${x}`);
    return x;
};
export const isTaskKwargs = (x) => {
    if (!isJSONObject(x))
        return false;
    return true;
};
export const taskKwargs = (x) => {
    if (!isTaskKwargs(x))
        throw Error('Invalid task kwargs');
    return x;
};
export const isErrorMessage = (x) => {
    return (isString(x)) && (x.length < 1000);
};
export const errorMessage = (x) => {
    if (isErrorMessage(x))
        return x;
    else {
        throw Error('Invalid error message: messages cannot exceed 1000 characters.');
    }
};
export const isFileKey = (x) => {
    return validateObject(x, {
        sha1: isSha1Hash,
        manifestSha1: optional(isSha1Hash),
        chunkOf: optional({
            fileKey: isFileKey,
            startByte: isByteCount,
            endByte: isByteCount
        })
    });
};
export const isFileKeyHash = (x) => {
    return isSha1Hash(x) ? true : false;
};
export const fileKeyHash = (fileKey) => {
    return sha1OfObject(fileKey);
};
export const isFindLiveFeedResult = (x) => {
    return validateObject(x, {
        nodeId: isNodeId
    });
};
export const isFindFileResult = (x) => {
    if (!validateObject(x, {
        nodeId: isNodeId,
        fileKey: isFileKey,
        fileSize: isByteCount
    }))
        return false;
    return (x.fileSize >= 0);
};
export const isRequestId = (x) => {
    if (!isString(x))
        return false;
    return (/^[A-Za-z]{10}$/.test(x));
};
export const isChannelLabel = (x) => {
    if (!isString(x))
        return false;
    return (/^[0-9a-zA-Z_\-.]{4,160}?$/.test(x));
};
export const channelLabel = (x) => {
    if (!isChannelLabel(x)) {
        throw Error(`Invalid channel label: ${x}`);
    }
    return x;
};
export const isFeedName = (x) => {
    if (!isString(x))
        return false;
    return ((x.length > 0) && (x.length <= 100));
};
export const feedName = (x) => {
    if (isFeedName(x))
        return x;
    else
        throw Error(`Invalid feed name: ${x}`);
};
export const feedSubfeedId = (feedId, subfeedHash, channelName) => {
    return (feedId.toString() + ':' + subfeedHash.toString() + ':' + channelName.toString());
};
export const isFeedSubfeedId = (x) => {
    if (!isString(x))
        return false;
    const parts = x.split(':');
    return (parts.length === 2) &&
        (isFeedId(parts[0])) &&
        (isSubfeedHash(parts[1]));
};
;
export const isSubfeedMessage = (x) => {
    return isObject(x);
};
export const isSubfeedMessageMetaData = (x) => {
    return isObject(x);
};
export const isSignedSubfeedMessage = (x) => {
    if (!validateObject(x, {
        body: {
            previousSignature: optional(isSignature),
            messageNumber: isNumber,
            message: isObject,
            timestamp: isTimestamp,
            metaData: optional(isSubfeedMessageMetaData)
        },
        signature: isSignature
    }))
        return false;
    return true;
};
;
export const isSubmittedSubfeedMessage = (x) => {
    return ((isJSONObject(x)) && (JSON.stringify(x).length < 10000));
};
export const submittedSubfeedMessageToSubfeedMessage = (x) => {
    return x;
};
export const isSubfeedWatchName = (x) => {
    if (!isString(x))
        return false;
    return x.length > 0;
};
export const isSubfeedPosition = (x) => {
    if (!isNumber(x))
        return false;
    return (x >= 0);
};
export const subfeedPositionToNumber = (x) => {
    return x;
};
export const subfeedPosition = (x) => {
    return x;
};
export const isMessageCount = (x) => {
    if (!isNumber(x))
        return false;
    return (x >= 0);
};
export const messageCountToNumber = (x) => {
    return x;
};
export const messageCount = (x) => {
    return x;
};
export const isSubfeedWatch = (x) => {
    return validateObject(x, {
        feedId: isFeedId,
        subfeedHash: isSubfeedHash,
        position: isSubfeedPosition,
        channelName: isString
    });
};
export const isSubfeedWatches = (x) => {
    return isObjectOf(isSubfeedWatchName, isSubfeedWatch)(x);
};
export const toSubfeedWatchesRAM = (x) => {
    return objectToMap(x);
};
export const toSubfeedWatches = (x) => {
    return mapToObject(x);
};
export const urlPath = (x) => {
    return x;
};
export const isBuffer = (x) => {
    return ((x !== null) && (x instanceof Buffer));
};
export const isDurationMsec = (x) => {
    if (!isNumber(x))
        return false;
    if (x < 0)
        return false;
    return true;
};
export const durationMsecToNumber = (x) => {
    return x;
};
export const scaledDurationMsec = (n) => {
    if (process.env.KACHERY_TEST_SPEEDUP_FACTOR) {
        n /= Number(process.env.KACHERY_TEST_SPEEDUP_FACTOR);
    }
    return n;
};
export const unscaledDurationMsec = (n) => {
    return n;
};
export const addDurations = (a, b) => {
    return (a + b);
};
export const minDuration = (a, b) => {
    return Math.min(a, b);
};
export const maxDuration = (a, b) => {
    return Math.max(a, b);
};
export const scaleDurationBy = (a, factor) => {
    return a * factor;
};
export const durationGreaterThan = (a, b) => {
    return a > b;
};
export const exampleDurationMsec = scaledDurationMsec(3000);
export const isByteCount = (x) => {
    if (!isNumber(x))
        return false;
    if (x < 0)
        return false;
    return true;
};
export const byteCountToNumber = (x) => {
    return x;
};
export const byteCount = (n) => {
    return n;
};
export const addByteCount = (n1, n2) => {
    return byteCount(byteCountToNumber(n1) + byteCountToNumber(n2));
};
export const exampleByteCount = byteCount(4000);
export const localFilePath = (p) => {
    return p;
};
export const isFileManifestChunk = (x) => {
    return validateObject(x, {
        start: isByteCount,
        end: isByteCount,
        sha1: isSha1Hash
    });
};
export const isFileManifest = (x) => {
    return validateObject(x, {
        size: isByteCount,
        sha1: isSha1Hash,
        chunks: isArrayOf(isFileManifestChunk)
    });
};
export const isChannelConfigUrl = (x) => {
    if (!isString(x))
        return false;
    if ((x.startsWith('http://') || (x.startsWith('https://')))) {
        if (x.length > 500)
            return false;
        return true;
    }
    else {
        return false;
    }
};
export const channelConfigUrl = (x) => {
    if (!isChannelConfigUrl(x))
        throw Error(`Not a valid channel config url string: ${x}`);
    return x;
};
export const pathifyHash = (x) => {
    return `${x[0]}${x[1]}/${x[2]}${x[3]}/${x[4]}${x[5]}/${x}`;
};
export const sha1OfObject = (x) => {
    return sha1OfString(JSONStringifyDeterministic(x));
};
export const sha1OfString = (x) => {
    const sha1sum = crypto.createHash('sha1');
    sha1sum.update(x);
    return sha1sum.digest('hex');
};
// Thanks: https://stackoverflow.com/questions/16167581/sort-object-properties-and-json-stringify
export const JSONStringifyDeterministic = (obj, space = undefined) => {
    var allKeys = [];
    JSON.stringify(obj, function (key, value) { allKeys.push(key); return value; });
    allKeys.sort();
    return JSON.stringify(obj, allKeys, space);
};
export const publicKeyHexToFeedId = (publicKeyHex) => {
    return publicKeyHex;
};
export const nodeIdToPublicKeyHex = (nodeId) => {
    return nodeId.toString();
};
export const feedIdToPublicKeyHex = (feedId) => {
    return feedId;
};
export const publicKeyHexToNodeId = (x) => {
    return x;
};
export const isUserConfig = (x) => {
    return validateObject(x, {
        admin: optional(isBoolean)
    }, {
        allowAdditionalFields: true
    });
};
//# sourceMappingURL=kacheryTypes.js.map