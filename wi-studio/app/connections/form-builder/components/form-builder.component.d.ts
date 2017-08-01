import { ReplaySubject } from "../../../../common/rxjs-extensions";
export declare class ConnectorsFormBuilderComponent {
    fields: any;
    _fieldObserver: ReplaySubject<any>;
    _fieldsErrors: string[];
    _hasChanges: boolean;
    _attributes: any;
    constructor();
    _setFieldsObservers(): void;
    getControlByType(type: string): any;
}
