import { Subject } from "rxjs/Subject";
export declare class SingleEmissionSubject extends Subject<void> {
    constructor();
    static create(): SingleEmissionSubject;
    emitAndComplete(): void;
}
