import { ConnectionsFormBuilderFieldsBase } from "../fields.base/fields.base.component";
import { TranslateService } from "ng2-translate";
export declare class ConnectionsFormBuilderFieldsTextArea extends ConnectionsFormBuilderFieldsBase {
    translate: TranslateService;
    _info: any;
    _fieldObserver: any;
    _value: any;
    constructor(translate: TranslateService);
    onChangeField(event: any): void;
    ngOnInit(): void;
    getValidatedValue(value: string, toJSON: boolean, notify?: boolean): string;
}
