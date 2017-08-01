import { FieldModel } from "./field.model";
import { IFieldDefinition } from "../../../common/models/contrib";
export declare class FieldSchema extends FieldModel {
    controlType: string;
    type: string;
    constructor(fieldData: IFieldDefinition);
    controlValidation(): void;
}
