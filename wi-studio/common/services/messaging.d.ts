/// <reference types="core-js" />
import { Observable } from "../../common/rxjs-extensions";
import "../../common/rxjs-extensions";
export declare type HANDLER_FUNCTION<T> = (data: T) => void;
export interface IMessaging {
    Subjects: any;
    getObservable<T>(name: string): Observable<T>;
    emit<T>(name: string, data: T): any;
    on<T>(name: string, handler: HANDLER_FUNCTION<T>): void;
    off<T>(name: string, handler: HANDLER_FUNCTION<T>): void;
    dispose(): any;
}
export declare let hasOwnProp: {
    (v: string): boolean;
    (v: PropertyKey): boolean;
};
export declare class AppMessaging implements IMessaging {
    subjects: any;
    static fromSubjects(subjects: any): AppMessaging;
    constructor(subjects?: any);
    readonly Subjects: any;
    getObservable<T>(name: string): Observable<T>;
    createName(name: string): string;
    emit<T>(name: string, data: T): void;
    on<T>(name: string, handler: HANDLER_FUNCTION<T>): void;
    off<T>(name: string, handler: HANDLER_FUNCTION<T>): void;
    dispose(name?: string): void;
}
