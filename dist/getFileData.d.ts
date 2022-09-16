declare const getFileData: (uri: string, onProgress: (a: {
    loaded: number;
    total: number;
}) => void) => Promise<any>;
export declare const getFileDataUrl: (uri: string) => Promise<string>;
export declare const storeFileData: (fileData: string) => Promise<string>;
export declare const handleFileDownloadProgress: (a: {
    uri: string;
    loaded: number;
    total: number;
}) => void;
export declare type Progress = {
    onProgress: (callback: (a: {
        loaded: number;
        total: number;
    }) => void) => void;
};
export declare const useFileData: (uri: string) => {
    fileData: any;
    progress: Progress;
    errorMessage: string | undefined;
};
export default getFileData;
