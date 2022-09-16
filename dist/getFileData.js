var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useMemo, useState } from "react";
import sendRequestToParent from "./sendRequestToParent";
import { isGetFileDataResponse, isGetFileDataUrlResponse, isStoreFileResponse } from "./viewInterface/FigurlRequestTypes";
const getFileData = (uri, onProgress) => __awaiter(void 0, void 0, void 0, function* () {
    const request = {
        type: 'getFileData',
        uri
    };
    progressListeners[uri] = ({ loaded, total }) => {
        onProgress({ loaded, total });
    };
    const response = yield sendRequestToParent(request);
    if (!isGetFileDataResponse(response))
        throw Error('Invalid response to getFigureData');
    return response.fileData;
});
export const getFileDataUrl = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    const request = {
        type: 'getFileDataUrl',
        uri
    };
    const response = yield sendRequestToParent(request);
    if (!isGetFileDataUrlResponse(response))
        throw Error('Invalid response to getFigureUrlData');
    return response.fileDataUrl;
});
export const storeFileData = (fileData) => __awaiter(void 0, void 0, void 0, function* () {
    const request = {
        type: 'storeFile',
        fileData
    };
    const response = yield sendRequestToParent(request);
    if (!isStoreFileResponse(response))
        throw Error('Invalid response to storeFile');
    if (response.uri === undefined)
        throw Error('Unexpected response.uri is undefined');
    return response.uri;
});
const progressListeners = {};
export const handleFileDownloadProgress = ({ uri, loaded, total }) => {
    const x = progressListeners[uri];
    if (x) {
        x({ loaded, total });
    }
};
export const useFileData = (uri) => {
    const [fileData, setFileData] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { progress, reportProgress } = useMemo(() => {
        let _callback = ({ loaded, total }) => { };
        const reportProgress = (a) => {
            _callback(a);
        };
        const progress = {
            onProgress: (callback) => {
                _callback = callback;
            }
        };
        return { progress, reportProgress };
    }, []);
    useEffect(() => {
        setErrorMessage(undefined);
        setFileData(undefined);
        getFileData(uri, reportProgress).then(data => {
            setFileData(data);
        }).catch(err => {
            setErrorMessage(err.message);
        });
    }, [uri, reportProgress]);
    return { fileData, progress, errorMessage };
};
export default getFileData;
//# sourceMappingURL=getFileData.js.map