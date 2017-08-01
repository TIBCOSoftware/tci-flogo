import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/withLatestFrom";
import { EditorContext, InsertEvent } from "./types";
export { EditorContext, InsertEvent };
export declare class EditorService {
    private contextSrc;
    private insertSrc;
    private expressionSrc;
    private validationSrc;
    private dragOverSrc;
    context$: Observable<EditorContext>;
    insert$: Observable<InsertEvent>;
    dragOver$: Observable<{
        x: number;
        y: number;
    }>;
    validate$: Observable<any[]>;
    outputExpression$: Observable<string>;
    changeContext(expression: string): void;
    insertText(string: string, replaceTokenAtPosition?: {
        x: number;
        y: number;
    }): void;
    dragOver(position: {
        x: number;
        y: number;
    }): void;
    outputExpression(expression: string): void;
    validated(errors: any[]): void;
}
