import { ConnectionsFormBuilderFieldsBase } from "../fields.base/fields.base.component";
import { TranslateService } from "ng2-translate";
export declare class ConnectionsFormBuilderFieldsObject extends ConnectionsFormBuilderFieldsBase {
    translate: TranslateService;
    _info: any;
    _fieldObserver: any;
    _value: string;
    constructor(translate: TranslateService);
    ngOnInit(): void;
}
