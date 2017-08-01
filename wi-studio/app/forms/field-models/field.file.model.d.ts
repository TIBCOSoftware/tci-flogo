import { FieldModel } from "./field.model";
import { IFieldDefinition } from "../../../common/models/contrib";
export declare class FieldFile extends FieldModel {
    controlType: string;
    type: string;
    value: {
        filename: string;
        content: string;
    };
    constructor(fieldData: IFieldDefinition);
    controlValidation(): void;
}
