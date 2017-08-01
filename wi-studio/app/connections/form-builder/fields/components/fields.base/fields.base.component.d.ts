import { TranslateService } from "ng2-translate";
import { Subject } from "../../../../../../common/rxjs-extensions";
export declare class ConnectionsFormBuilderFieldsBase {
    _info: any;
    _hasError: boolean;
    _errorMessage: string;
    _fieldObserver: any;
    originalInfo: any;
    translate: TranslateService;
    subject: Subject<any>;
    constructor(translate: TranslateService);
    onChangeField(event: any): void;
    _getMessage(message: string, properties: any): {} & {
        message: string;
    } & {
        payload: any;
    };
    publishNextChange(): void;
    isReadOnly(): boolean;
    onValidate(event: any): void;
    _validate(value: string): boolean;
    onFocus(event: any): void;
    onKeyUp(event: any): void;
    onBlur(event: any): void;
}
