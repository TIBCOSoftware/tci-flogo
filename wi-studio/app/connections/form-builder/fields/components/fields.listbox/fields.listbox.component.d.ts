import { ConnectionsFormBuilderFieldsBase } from "../fields.base/fields.base.component";
import { TranslateService } from "ng2-translate";
export declare class ConnectionsFormBuilderFieldsListBox extends ConnectionsFormBuilderFieldsBase {
    translate: TranslateService;
    _info: any;
    _fieldObserver: any;
    options: any[];
    constructor(translate: TranslateService);
    ngOnInit(): void;
    onChangeField(option: string): void;
}
