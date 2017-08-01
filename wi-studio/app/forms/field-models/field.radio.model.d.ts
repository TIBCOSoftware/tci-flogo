import { FieldModel } from "./field.model";
import { IFieldDefinition } from "../../../common/models/contrib";
export interface FieldRadioOption {
    label: string;
    value: boolean;
    checked: boolean;
}
export declare class FieldRadio extends FieldModel {
    controlType: string;
    type: "boolean";
    options: FieldRadioOption[];
    constructor(fieldData: IFieldDefinition);
    setChecked(): void;
    value: any;
}
