import { FieldModel } from "./field.model";
import { IFieldDefinition } from "../../../common/models/contrib";
export declare class FieldListBox extends FieldModel {
    controlType: string;
    options: {
        key: string;
        value: string;
    }[];
    constructor(fieldData: IFieldDefinition);
    controlValidation(): void;
}
