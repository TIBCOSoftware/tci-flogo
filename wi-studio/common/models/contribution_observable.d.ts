import { Observable } from "rxjs/Observable";
export declare type OBS_FN<T> = (...args) => Observable<T | T[]> | T;
export declare type OBS_HOOK<T> = (result: T) => void;
export interface ContributionObservableHook<T> {
    hook(validationResult: T): any;
}
export declare class ContributionObservable {
    static eval<T>(service: any, obsFunction: OBS_FN<T>, obshook: ContributionObservableHook<T>, ...args: any[]): Observable<T>;
}
