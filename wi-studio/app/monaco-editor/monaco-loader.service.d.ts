import { OpaqueToken } from "@angular/core";
export declare const SRC_PATH: OpaqueToken;
export declare class MonacoLoaderService {
    private srcPath;
    private _loaded;
    private _loadPromise;
    private _globalsBackup;
    private _amdLoader;
    constructor(srcPath: any);
    readonly monacoLoaded: boolean;
    load(): Promise<void>;
    restoreGlobals(): void;
    waitForMonaco(): Promise<void>;
}
